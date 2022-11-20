
import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

import Login from '../Login/login';
import {Link} from 'react-router-dom';

const Navbar = () => {

  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/Input' activeStyle>
            Input
          </NavLink>
          <NavLink to='/Todos' activeStyle>
            Jobs
          </NavLink>
          <NavLink to='/Update' activeStyle>
            Update
          </NavLink>
          <NavLink to='/About' activeStyle>
            About
          </NavLink>
        </NavMenu>
      </Nav>

      <footer>
        <a href='http://localhost:3000/'>Logout</a>
      </footer>
    </>
  );
};
  
export default Navbar;