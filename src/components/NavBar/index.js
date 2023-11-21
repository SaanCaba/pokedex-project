import React, { useEffect, useState } from 'react';
import './index.css';
import Pokeball from '../../assets/pokeball.png';
import { useNavigate, useLocation } from 'react-router-dom';
function NavBar() {
  const [currentRoute, setCurrentRoute] = useState('');
  const location = useLocation();
  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, []);
  const navigate = useNavigate();

  const handleGoPage = (name) => {
    navigate(name);
    setCurrentRoute(name);
  };
  return (
    <nav className='navbar'>
      <ul className='ul-container'>
        <li onClick={() => handleGoPage('/')}>
          <img className='pokeball-logo' src={Pokeball} alt='pokemon-logo' />
        </li>
        <div className='sections-container'>
          <li
            className={currentRoute === '/' ? 'active-route' : 'inactive-route'}
          >
            <span onClick={() => handleGoPage('/')} className='li-section'>
              Pokédex
            </span>
            <hr
              className={
                currentRoute === '/'
                  ? 'sections-line-active'
                  : 'sections-line-inactive'
              }
            />
          </li>
          <li
            className={
              currentRoute === '/favorites' ? 'active-route' : 'inactive-route'
            }
          >
            <span
              onClick={() => handleGoPage('/favorites')}
              className='li-section'
            >
              Favorites
            </span>
            <hr
              className={
                currentRoute === '/favorites'
                  ? 'sections-line-active'
                  : 'sections-line-inactive'
              }
            />
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
