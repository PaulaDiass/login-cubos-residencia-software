import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSessionStorage } from '../../../../utils/sessionStorage';

interface IProps {
  mobileProfile: boolean;
  setMobileProfile: Dispatch<SetStateAction<boolean>>;
}

function Header({ mobileProfile, setMobileProfile }: IProps) {
  const handleProfile = () => {
    setMobileProfile(!mobileProfile);
  };

  const navigate = useNavigate();

  const logout = () => {
    clearSessionStorage();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__logo"></div>
      <nav className="header__nav">
        <ul className="header__nav-menu">
          <li className="menu__item--active">
            <button>Início</button>
          </li>
          <li className="menu__item">Pull Requests</li>
          <li className="menu__item">Issues</li>
          <li className="menu__item">Marketplace</li>
          <li className="menu__item">Explore</li>
          <li className="menu__item--last">
            <button className="header__nav-logout" onClick={logout}>
              Sair
            </button>
          </li>
        </ul>
      </nav>

      <div className="header__search">
        <i className="bi bi-search"></i>
        <div>Pesquisar no Login</div>
      </div>

      <button className="header__menu-button" onClick={handleProfile}>
        <i className={mobileProfile ? 'bi bi-x-lg' : 'bi bi-list'}></i>
      </button>
    </header>
  );
}

export default Header;
