import React from "react";
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../../actions/chefActions';
import SearchBox from '../SearchBox/SearchBox.component';
import AdvancedSearchBtn from '../AdvancedSearchBtn/AdvancedSearchBtn.component';

const Header = () => {
  const dispatch = useDispatch()

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>RecipeBook</Navbar.Brand>
          </LinkContainer>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Route render={({ history }) => <AdvancedSearchBtn history={history} />} />
          <Nav className="ml-auto">
          {chefInfo ? (
            <NavDropdown title={chefInfo.username} id='username'>
              <LinkContainer to='/myrecipes'>
                <NavDropdown.Item>My Recipes</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/savedrecipes'>
                <NavDropdown.Item>Saved Recipes</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link>
                <i className='fas fa-user'></i>
                Sign In
              </Nav.Link>
            </LinkContainer>
          )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
};

export default Header;
