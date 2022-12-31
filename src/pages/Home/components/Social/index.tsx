import { useEffect, useState } from 'react';
import { getLocalItem } from '../../../../utils/sessionStorage';

type Followers = {
  html_url: string;
  avatar_url: string;
  login: string;
};

type Props = {
  followers: number;
  following: number;
};

function Social({ followers, following }: Props) {
  const user = getLocalItem('user');
  const [userFollowers, setUserFollowers] = useState<Followers[]>([]);
  const [userFollowing, setUserFollowing] = useState<Followers[]>([]);

  const getUserFollowers = async () => {
    await fetch(`https://api.github.com/users/${user}/followers?per_page=100`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const slicedArray: Followers[] = data.slice(0, 6);
        setUserFollowers(slicedArray);
      });
  };

  const getUserFollowing = async () => {
    await fetch(`https://api.github.com/users/${user}/following?per_page=100`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const slicedArray: Followers[] = data.slice(0, 6);
        setUserFollowing(slicedArray);
      });
  };

  useEffect(() => {
    getUserFollowers();
    getUserFollowing();
    // eslint-disable-next-line
  }, []);

  //colocar a quantidade de seguidores e seguindo//

  return (
    <div className="social">
      <div className="social__section">
        <h2 className="social__title">
          Followers <span>({followers})</span>
        </h2>
        <div className="social__cards">
          {userFollowers
            ? userFollowers.map((item) => {
                return (
                  <a
                    className="card"
                    href={item.html_url}
                    key={item.login}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={item.avatar_url} alt="avatar" />
                    <p className="card__name">{item.login}</p>
                  </a>
                );
              })
            : null}
        </div>
        <h4 className="social__seeall">Ver todos</h4>
      </div>
      <div className="social__section">
        <h2 className="social__title">
          Following <span>({following})</span>
        </h2>
        <div className="social__cards">
          {userFollowing
            ? userFollowing.map((item) => {
                return (
                  <a
                    className="card"
                    href={item.html_url}
                    key={item.login}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={item.avatar_url} alt="avatar" />
                    <p className="card__name">{item.login}</p>
                  </a>
                );
              })
            : null}
        </div>
        <h4 className="social__seeall">Ver todos</h4>
      </div>
    </div>
  );
}

export default Social;
