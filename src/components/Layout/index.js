import React from 'react';
import NavBar from '../NavBar';
import { IoIosArrowDropup } from 'react-icons/io';
import { Link } from 'react-scroll';
import './index.css';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  return (
    <>
      <NavBar />

      {children}
      <Link
        to={location.pathname === '/' ? 'goldcard' : 'fav-title'}
        spy={true}
        offset={-300}
        duration={500}
        smooth={true}
      >
        <IoIosArrowDropup className='go-up-arrow' />
      </Link>
    </>
  );
}

export default Layout;
