import Header from './components/Header';
import Profile from './components/Profile';
import Social from './components/Social';
import Repo from './components/Repos';
import SimpleBackdrop from '../../components/Backdrop';
import { useEffect, useState } from 'react';
import type { User, UserRepo } from './types';
import { getLocalItem } from '../../utils/sessionStorage';

const sorteDeHoje: string[] = [
  'Nunca diga nunca, pois os limites são como os medos: sempre são apenas ilusão.',
  'Sabe viver quem dedica um dia ao sonho e outro à realidade.',
  'Aquele que trabalha duro pode superar um gênio, mas, de nada adianta trabalhar duro se você não confia em você mesmo.',
  'Nós não desistimos.',
  'Sempre podemos ser medianos e fazer o que é normal. Não estou nessa para fazer o que é normal.',
  'Cada sonho que você deixa pra trás, é um pedaço do seu futuro que deixa de existir.',
];

function Home() {
  const user = getLocalItem('user');

  const [userData, setUserData] = useState<User>();
  const [starred, setStarred] = useState<[]>([]);
  const [repos, setRepos] = useState<UserRepo[]>();
  const [mobileProfile, setMobileProfile] = useState(false);
  let [sorte, setSorte] = useState<string>();

  const [isLoading, setIsloading] = useState(false);

  const getUserData = async () => {
    //dados do usuário
    setIsloading(true);
    await fetch(`https://api.github.com/users/${user}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUserData(data);
      });

    //favoritos
    await fetch(`https://api.github.com/users/${user}/starred?per_page=100`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setStarred(data);
      });

    //repositórios
    await fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const slicedArray: UserRepo[] = data.slice(0, 4);
        setRepos(slicedArray);
      });
    setIsloading(false);
  };

  useEffect(() => {
    getUserData();
    setSorte(sorteDeHoje[Math.floor(Math.random() * sorteDeHoje.length)]);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Header
        mobileProfile={mobileProfile}
        setMobileProfile={setMobileProfile}
      />
      {isLoading === false && userData ? (
        <div className="home">
          <Profile userData={userData} mobileProfile={mobileProfile} />
          <div className="home__main">
            <div className="home__welcome">
              <h1 className="home__welcome-title">
                Bem-vindo(a), {userData.name}
              </h1>
              <div className="home__welcome-todaysluck">
                <span style={{ fontWeight: 'bold' }}>Sorte de hoje:</span>
                <span> {sorte}</span>
              </div>
              <div className="home__welcome-infos">
                <div className="infos__item">
                  <h4>Repositórios</h4>
                  <div>
                    <i className="bi bi-journal-bookmark-fill"></i>
                    <span> {userData.public_repos}</span>
                  </div>
                </div>
                <div className="infos__item">
                  <h4>Favoritos</h4>
                  <div>
                    <i className="bi bi-star-fill"></i>
                    <span> {starred.length}</span>
                  </div>
                </div>
                <div className="infos__item">
                  <h4>Seguidores</h4>
                  <div>
                    <i className="bi bi-people-fill"></i>
                    <span> {userData.followers}</span>
                  </div>
                </div>
                <div className="infos__item">
                  <h4>Seguindo</h4>
                  <div>
                    <i className="bi bi-binoculars-fill"></i>
                    <span> {userData.following}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="home__menu">
              <h2 className="home__menu-title">O que você deseja fazer?</h2>
              <ul className="menu__list">
                <li className="menu__item menu__item--first">
                  Criar Repositório
                </li>
                <li className="menu__item">Importar Repositório</li>
                <li className="menu__item">Novo Gist</li>
                <li className="menu__item">Nova Organização</li>
                <li className="menu__item">Novo Projeto</li>
              </ul>
            </div>
            <div className="home__repos">
              <h2 className="home__repos-title">Meus últimos repositórios:</h2>
              <div className="repos__list">
                {repos
                  ? repos.map((repo) => {
                      return (
                        <Repo
                          key={repo.id}
                          id={repo.id}
                          full_name={repo.full_name}
                          description={repo.description}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <Social
            followers={userData.followers}
            following={userData.following}
          />
        </div>
      ) : (
        <SimpleBackdrop />
      )}
    </div>
  );
}

export default Home;
