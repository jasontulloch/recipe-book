import React from "react";
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

const Header = () => {
  const dispatch = useDispatch()

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect style={{padding: '11px 6px 11px 6px'}}>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>RecipeBook</Navbar.Brand>
          </LinkContainer>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Route render={({ history }) => <AdvancedSearchBtn history={history} />} />
            <Route render={({ history }) => <AllChefsBtn history={history} />} />
            {chefInfo ? (
              <Nav className="ml-auto">
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Chefs I Love
                    </Tooltip>
                  }
                >
                  <LinkContainer to='/mychefs'>
                    <Nav.Link>
                      <GiCook style={{ fontSize: '1.25rem' }}/>
                    </Nav.Link>
                  </LinkContainer>
                </OverlayTrigger>
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Saved Recipes
                    </Tooltip>
                  }
                >
                  <LinkContainer to='/savedrecipes'>
                    <Nav.Link>
                      <GiBookmark style={{ fontSize: '1.25rem' }}/>
                    </Nav.Link>
                  </LinkContainer>
                </OverlayTrigger>
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      My Recipes
                    </Tooltip>
                  }
                >
                  <LinkContainer to='/myrecipes'>
                    <Nav.Link>
                      <GiBookCover style={{ fontSize: '1.25rem' }}/>
                    </Nav.Link>
                  </LinkContainer>
                </OverlayTrigger>
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Grocery List
                    </Tooltip>
                  }
                >
                  <LinkContainer to='/grocerylist'>
                    <Nav.Link>
                      <HiOutlineClipboardList style={{ fontSize: '1.25rem' }}/>
                    </Nav.Link>
                  </LinkContainer>
                </OverlayTrigger>
                <NavDropdown title={chefInfo.username} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
};

export default Header;
