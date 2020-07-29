import React from 'react';
import Logo from '../../assets/img/Logo.png';
import './Menu.css';
import Button from '../Button';
import { Link } from 'react-router-dom';

const Menu = ()=>{
  return (
    <nav className="Menu">
      <Link to="/">
        <img className="Logo" src={Logo} alt="MorenoFlix logo" />
      </Link>
      <Button as={Link} className="ButtonLink" to="/cadastro/video">
        Novo vídeo
      </Button>
    </nav>
  );
};

export default Menu;