import React from "react";

import BannerIcon from "../../assets/banner-icon.svg";

const Banner = () => {
  return (
    <div className='banner'>
      <img src={BannerIcon} alt='' />
      <div className='banner__text'>
        <p>
          <span>Siga </span>
          amigos e outros devs do seu interesse usando o botão seguir
        </p>
        <p>
          <span>Conheça </span>
          novos devs e repositórios através da aba explorar
        </p>
        <p>
          <span>Compartilhe </span>
          ideias e soluções em um só lugar
        </p>
      </div>
    </div>
  );
};

export default Banner;
