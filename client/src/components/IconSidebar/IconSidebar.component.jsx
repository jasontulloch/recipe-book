import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, OverlayTrigger, Popover } from 'react-bootstrap';
import SearchBox from '../SearchBox/SearchBox.component';
import AdvancedSearchBtn from '../AdvancedSearchBtn/AdvancedSearchBtn.component';
import AllChefsBtn from '../AllChefsBtn/AllChefsBtn.component';
import { GiBookmark, GiBookCover, GiCook } from 'react-icons/gi';
import { IoMdCreate, IoMdAdd, IoIosMore, IoMdSearch } from 'react-icons/io'
import { HiOutlineClipboardList } from 'react-icons/hi'

import {
  listMyRecipes,
  createRecipe,
} from '../../actions/recipeActions';
import {
  createCookbook,
  listMyCookbooks,
} from '../../actions/cookbookActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';
import { COOKBOOK_CREATE_RESET } from '../../constants/cookbookConstants';

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

  const cookbookCreate = useSelector(state => state.cookbookCreate)
  const {
    loading: loadingCookbookCreate,
    error: errorCookbookCreate,
    success: successCookbookCreate,
    cookbook: createdCookbook,
  } = cookbookCreate

  const cookbookMyList = useSelector(state => state.cookbookMyList)
  const { loading, error, cookbooks } = cookbookMyList

  useEffect(() => {
    dispatch({ type: RECIPE_CREATE_RESET })
    dispatch({ type: COOKBOOK_CREATE_RESET })

    if(successCreate) {
      dispatch(listMyRecipes())
    }

    if(successCookbookCreate || cookbooks) {
      dispatch(listMyCookbooks())
    }

  }, [
    dispatch,
    history,
    chefInfo,
    successCreate,
    createdRecipe,
    successCookbookCreate,
    createCookbook
  ])

  const createRecipeHandler = () => {
    dispatch(createRecipe())
  }

  const createCookbookHandler = () => {
    dispatch(createCookbook())
  }

  return (
    <div>
      {(chefInfo && isBrowser) ? (
          <div
            style={{
              height: '100%',
              width: '200px',
              position: 'fixed',
              top: '0',
              left: '0',
              paddingTop: '50px',
              backgroundColor: '#343a40',
            }}
          >
            <Nav className="ml-auto">
              <Nav.Link style={{paddingLeft: '5px', paddingRight: '5px', width: '100%', color: 'rgba(255,255,255,0.5)'}}>
                <div>
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={
                      <Popover id='popover-positioned-right' style={{ backgroundColor: '#343a40', fontSize: '.85rem' }}>
                        <Popover.Content>
                          <Route render={({ history }) => <SearchBox history={history} />} />
                          <LinkContainer to='/recipes/page/1' style={{paddingLeft: '5px', paddingRight: '5px', marginTop: '10px', width: '100%', paddingTop: '0px', color: 'rgba(255,255,255,0.5)' }}>
                            <Nav.Link>
                              <div className="sidebarIcon">
                                <span>Search All Recipes</span>
                              </div>
                            </Nav.Link>
                          </LinkContainer>
                          <LinkContainer to='/chefs/page/1' style={{paddingLeft: '5px', paddingRight: '5px', width: '100%', paddingTop: '0px', color: 'rgba(255,255,255,0.5)'}}>
                            <Nav.Link>
                              <div className="sidebarIcon">
                                <span>Find Chefs</span>
                              </div>
                            </Nav.Link>
                          </LinkContainer>
                          <LinkContainer to='/recipes/advanced-search' style={{paddingLeft: '5px', paddingRight: '5px', width: '100%',paddingTop: '0px', color: 'rgba(255,255,255,0.5)'}}>
                            <Nav.Link>
                              <div className="sidebarIcon">
                                <span>Advanced Search</span>
                              </div>
                            </Nav.Link>
                          </LinkContainer>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                      <div className="sidebarIcon">
                        <IoMdSearch style={{ fontSize: '1.25rem' }}/>
                        <span style={{paddingLeft: '15px'}}>Search</span>
                      </div>
                  </OverlayTrigger>
                </div>
              </Nav.Link>
              <LinkContainer
                to='/myrecipes'
                style={{
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  paddingTop: '0px',
                  color: 'rgba(255,255,255,0.5)',
                }}
                onClick={createRecipeHandler}
              >
                <Nav.Link>
                  <div className="sidebarIcon">
                    <IoMdCreate style={{ fontSize: '1.25rem' }}/>
                    <span style={{paddingLeft: '15px'}}>Create Recipe</span>
                  </div>
                </Nav.Link>
              </LinkContainer>
                <LinkContainer to='/savedrecipes' style={{paddingLeft: '5px', paddingRight: '5px', width: '100%', paddingTop: '0px', color: 'rgba(255,255,255,0.5)'}}>
                  <Nav.Link>
                    <div className="sidebarIcon">
                      <GiBookmark style={{ fontSize: '1.25rem' }}/>
                      <span style={{paddingLeft: '15px'}}>Liked Recipes</span>
                    </div>
                  </Nav.Link>
                </LinkContainer>
                <Nav.Link style={{paddingLeft: '5px', paddingRight: '5px', width: '100%', paddingTop: '0px', color: 'rgba(255,255,255,0.5)'}}>
                  <div>
                    <OverlayTrigger
                      trigger="click"
                      placement="right"
                      overlay={
                        <Popover id='popover-positioned-right' style={{ backgroundColor: '#343a40', fontSize: '.85rem' }}>
                          <Popover.Content>
                            <LinkContainer to='/mychefs/page/1' style={{paddingLeft: '5px', paddingRight: '5px', width: '100%', paddingTop: '0px', color: 'rgba(255,255,255,0.5)' }}>
                              <Nav.Link>
                                <div className="sidebarIcon">
                                  <span>Favorite Chefs</span>
                                </div>
                              </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/grocerylist' style={{paddingLeft: '5px', paddingRight: '5px', width: '100%',paddingTop: '0px', color: 'rgba(255,255,255,0.5)'}}>
                              <Nav.Link>
                                <div className="sidebarIcon">
                                  <span>Grocery List</span>
                                </div>
                              </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/myrecipes' style={{paddingLeft: '5px', paddingRight: '5px', width: '100%', paddingTop: '0px', color: 'rgba(255,255,255,0.5)'}}>
                              <Nav.Link>
                                <div className="sidebarIcon">
                                  <span>My Recipes</span>
                                </div>
                              </Nav.Link>
                            </LinkContainer>
                          </Popover.Content>
                        </Popover>
                      }
                    >
                        <div className="sidebarIcon">
                          <IoIosMore style={{ fontSize: '1.25rem' }}/>
                          <span style={{paddingLeft: '15px'}}>More</span>
                        </div>
                    </OverlayTrigger>
                  </div>
                </Nav.Link>
                <div style={{paddingLeft: '10px', paddingTop: '15px', color: 'rgba(255,255,255,0.5)'}}>
                  COOKBOOKS...
                </div>
                <LinkContainer
                  to='/mycookbooks'
                  style={{
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    paddingTop: '5px',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                  onClick={createCookbookHandler}
                >
                  <Nav.Link>
                    <div className="sidebarIcon">
                      <IoMdAdd style={{ fontSize: '1.25rem' }}/>
                      <span style={{paddingLeft: '15px'}}>Create Cookbook</span>
                    </div>
                  </Nav.Link>
                </LinkContainer>
                <div className='sidebarScroller'>
                  {(cookbooks === undefined || cookbooks.length == 0) ? (
                    <div></div>
                  ) : (
                    cookbooks.map(cookbook => (
                      <div className="sidebarIcon" style={{paddingTop: '5px'}}>
                        {cookbook.cookbook_name.length > 18 ? (
                          <div>{cookbook.cookbook_name.slice(0, 18) + (cookbook.cookbook_name.length > 18 ? "..." : "")}</div>
                        ) : (
                          <LinkContainer to={`/cookbooks/${cookbook._id}`} style={{paddingLeft: '0px', paddingBottom: '0px', paddingTop: '0px', color: 'rgba(255,255,255,0.5)'}}>
                            <Nav.Link>
                              <div className="sidebarIcon">{cookbook.cookbook_name}</div>
                            </Nav.Link>
                          </LinkContainer>
                        )}
                      </div>
                    ))
                  )}
                </div>
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
