import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from '../SearchBox/SearchBox.component';
import AdvancedSearchBtn from '../AdvancedSearchBtn/AdvancedSearchBtn.component';
import AllChefsBtn from '../AllChefsBtn/AllChefsBtn.component';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { GiBookmark, GiBookCover, GiCook } from 'react-icons/gi';
import { IoMdCreate } from 'react-icons/io'
import { HiOutlineClipboardList } from 'react-icons/hi'

import {
  listMyRecipes,
  createRecipe,
} from '../../actions/recipeActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';

import { isBrowser } from 'react-device-detect';

import './IconSidebar.styles.scss';

const IconSidebar = ({ history }) => {
  const dispatch = useDispatch()

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const recipeCreate = useSelector(state => state.recipeCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    recipe: createdRecipe,
  } = recipeCreate

  useEffect(() => {
    dispatch({ type: RECIPE_CREATE_RESET })

    if(successCreate) {
      dispatch(listMyRecipes())
    }
  }, [
    dispatch,
    history,
    chefInfo,
    successCreate,
    createdRecipe
  ])

  const createRecipeHandler = () => {
    dispatch(createRecipe())
  }

  return (
    <div>
      {(chefInfo && isBrowser) ? (
          <div
            style={{
              height: '100%',
              width: '30px',
              position: 'fixed',
              top: '0',
              left: '0',
              paddingTop: '100px',
              backgroundColor: '#343a40',
            }}
          >
            <Nav className="ml-auto">
              <OverlayTrigger
                placement='right'
                overlay={
                  <Tooltip id={'tooltip-right'}>
                    Create New Recipe
                  </Tooltip>
                }
              >
                <LinkContainer
                  to='/myrecipes'
                  style={{paddingLeft: '5px',
                    paddingRight: '5px',
                    color: 'rgba(255,255,255,0.5)' }}
                  onClick={createRecipeHandler}
                >
                  <Nav.Link>
                    <IoMdCreate className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
                  </Nav.Link>
                </LinkContainer>
              </OverlayTrigger>
              <OverlayTrigger
                placement='right'
                overlay={
                  <Tooltip id={'tooltip-right'}>
                    Chefs I Love
                  </Tooltip>
                }
              >
                <LinkContainer to='/mychefs/page/1' style={{paddingLeft: '5px', paddingRight: '5px' ,color: 'rgba(255,255,255,0.5)' }}>
                  <Nav.Link>
                    <GiCook className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
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
                    <GiBookmark className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
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
                    <GiBookCover className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
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
                    <HiOutlineClipboardList className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
                  </Nav.Link>
                </LinkContainer>
              </OverlayTrigger>
            </Nav>
          </div>
      ) : (chefInfo) ? (
        <div
          style={{
            height: '100%',
            width: '30px',
            position: 'fixed',
            top: '0',
            left: '0',
            paddingTop: '100px',
            backgroundColor: '#343a40',
          }}
        >
          <Nav className="ml-auto">
            <LinkContainer
              to='/myrecipes'
              style={{paddingLeft: '5px',
                paddingRight: '5px',
                color: 'rgba(255,255,255,0.5)' }}
              onClick={createRecipeHandler}
            >
              <Nav.Link>
                <IoMdCreate className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/mychefs/page/1' style={{paddingLeft: '5px', paddingRight: '5px' ,color: 'rgba(255,255,255,0.5)' }}>
              <Nav.Link>
                <GiCook className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/savedrecipes' style={{paddingLeft: '5px', paddingRight: '5px', color: 'rgba(255,255,255,0.5)'}}>
              <Nav.Link>
                <GiBookmark className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/myrecipes' style={{paddingLeft: '5px', paddingRight: '5px', color: 'rgba(255,255,255,0.5)'}}>
              <Nav.Link>
                <GiBookCover className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/grocerylist' style={{paddingLeft: '5px', paddingRight: '5px', color: 'rgba(255,255,255,0.5)'}}>
              <Nav.Link>
                <HiOutlineClipboardList className="sidebarIcon" style={{ fontSize: '1.25rem' }}/>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </div>
      ) : (
        <div
          style={{
            height: '100%',
            width: '30px',
            position: 'fixed',
            top: '0',
            left: '0',
            paddingTop: '100px',
            backgroundColor: '#343a40',
          }}>
        </div>
      )}
    </div>

  )
};

export default IconSidebar;
