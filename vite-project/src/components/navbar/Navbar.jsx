import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setIsOpen(false);
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header>
      <div
        className={`menu ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          {isLoggedIn ? (
            <li><Link to="#" onClick={handleLogout}>Sair</Link></li>
          ) : (
            <li><Link to="/login" onClick={toggleMenu}>Entrar</Link></li>
          )}
          <li><Link to="/import-csv" onClick={toggleMenu}>Doadores</Link></li>
          <li><Link to="/donate" onClick={toggleMenu}>Doações</Link></li>
          <li><Link to="/" onClick={toggleMenu}>Quem Somos?</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
