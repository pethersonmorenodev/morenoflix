import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/img/Logo.png';
import './Menu.css';
import Button from '../Button';

const Menu = () => {
  const location = useLocation();
  let newTo = '/cadastro/video';
  let newEntity = 'Novo vídeo';
  if (location.pathname === '/cadastro/video') {
    newTo = '/cadastro/categoria';
    newEntity = 'Nova categoria';
  }
  return (
    <nav className="Menu">
      <Link to="/">
        <img className="Logo" src={Logo} alt="MorenoFlix logo" />
      </Link>
      <Button as={Link} className="ButtonLink" to={newTo} dark>
        {newEntity}
      </Button>
    </nav>
  );
};

export default Menu;
