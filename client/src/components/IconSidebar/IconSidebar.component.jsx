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

import './IconSidebar.styles.scss';

const IconSidebar = () => {
  const dispatch = useDispatch()

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      {chefInfo && (
          <div
            style={{
              height: '100%',
              width: '30px',
              position: 'fixed',
              top: '0',
              left: '0',
              paddingTop: '75px',
              backgroundColor: '#343a40',
            }}>

                <Nav className="ml-auto">
                  <OverlayTrigger
                    placement='right'
                    overlay={
                      <Tooltip id={'tooltip-right'}>
                        Chefs I Love
                      </Tooltip>
                    }
                  >
                    <LinkContainer to='/mychefs' className="sidebarIcon" style={{paddingLeft: '5px', paddingRight: '5px' ,color: 'rgba(255,255,255,0.5)' }}>
                      <Nav.Link>
                        <GiCook style={{ fontSize: '1.25rem' }}/>
                      </Nav.Link>
                    </LinkContainer>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement='right'
                    overlay={
                      <Tooltip id={'tooltip-right'}>
                        Saved Recipes
                      </Tooltip>
                    }
                  >
                    <LinkContainer to='/savedrecipes' style={{paddingLeft: '5px', paddingRight: '5px', color: 'rgba(255,255,255,0.5)'}}>
                      <Nav.Link>
                        <GiBookmark style={{ fontSize: '1.25rem' }}/>
                      </Nav.Link>
                    </LinkContainer>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement='right'
                    overlay={
                      <Tooltip id={'tooltip-right'}>
                        My Recipes
                      </Tooltip>
                    }
                  >
                    <LinkContainer to='/myrecipes' style={{paddingLeft: '5px', paddingRight: '5px', color: 'rgba(255,255,255,0.5)'}}>
                      <Nav.Link>
                        <GiBookCover style={{ fontSize: '1.25rem' }}/>
                      </Nav.Link>
                    </LinkContainer>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement='right'
                    overlay={
                      <Tooltip id={'tooltip-right'}>
                        Grocery List
                      </Tooltip>
                    }
                  >
                    <LinkContainer to='/grocerylist' style={{paddingLeft: '5px', paddingRight: '5px', color: 'rgba(255,255,255,0.5)'}}>
                      <Nav.Link>
                        <HiOutlineClipboardList style={{ fontSize: '1.25rem' }}/>
                      </Nav.Link>
                    </LinkContainer>
                  </OverlayTrigger>
                </Nav>

          </div>
      )}
    </div>

  )
};

export default IconSidebar;
