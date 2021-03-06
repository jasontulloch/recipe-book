import React, { useState } from "react";
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../../actions/chefActions';
import SearchBox from '../SearchBox/SearchBox.component';
import AdvancedSearchBtn from '../AdvancedSearchBtn/AdvancedSearchBtn.component';
import AllChefsBtn from '../AllChefsBtn/AllChefsBtn.component';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { GiBookmark, GiBookCover, GiCook } from 'react-icons/gi';
import { HiOutlineClipboardList } from 'react-icons/hi'

import './Header.styles.scss';

const Header = () => {
  const dispatch = useDispatch()

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const logoutHandler = () => {
    dispatch(logout())
    setExpanded(false)
  }

  // Close hamburger on click
  const [expanded, setExpanded] = useState(false)

  return (
    <header>
      <Navbar bg="dark" variant="dark" fixed="top" style={{padding: '11px 11px 6px', height: '40px'}}>
            <LinkContainer to='/'>
              <Navbar.Brand onClick={() => setExpanded(false)}>RecipeBook</Navbar.Brand>
            </LinkContainer>

          {chefInfo ? (
              <Nav className="ml-auto">
                <NavDropdown className="headerProfileDropdownMobile" title={chefInfo.username} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item onClick={() => setExpanded(false)}>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <LinkContainer to='/login'>
                  <Nav.Link onClick={() => setExpanded(false)}>
                    <i className='fas fa-user'></i>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
      </Navbar>
    </header>
  )
};

export default Header;
