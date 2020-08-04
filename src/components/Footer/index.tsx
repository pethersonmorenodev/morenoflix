import React from 'react';
import Logo from '../../assets/img/Logo.png';
import { FooterBase } from './styles';

function Footer() {
  return (
    <FooterBase>
      <a href="/">
        <img src={Logo} alt="Logo" />
      </a>
      <p>
        Site feito na <a href="https://www.alura.com.br/">#ImersãoReact</a> da{' '}
        <a className="alura" href="https://www.alura.com.br/">
          Alura
        </a>
      </p>
    </FooterBase>
  );
}

export default Footer;
