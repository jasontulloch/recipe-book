import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import SearchBox from '../SearchBox/SearchBox.component';
import PopoverStickOnHover from '../PopoverStickOnHover/PopoverStickOnHover.component';
import IconBarMobile from './IconBarMobile.component';
import { GiBookmark, GiBookCover, GiCook } from 'react-icons/gi';
import { IoMdCreate, IoMdAdd, IoIosMore, IoMdSearch } from 'react-icons/io'
import { HiOutlineClipboardList } from 'react-icons/hi'

import {
  listMyRecipes,
  createRecipe,
} from '../../actions/recipeActions';
import {
  createCookbook,
  listMyCookbooks
} from '../../actions/cookbookActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';
import { COOKBOOK_CREATE_RESET } from '../../constants/cookbookConstants';

import { isBrowser } from 'react-device-detect';

import './IconBar.styles.css';

const IconBar = ({ history }) => {
  const dispatch = useDispatch()

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const recipeCreate = useSelector(state => state.recipeCreate)
  const {
    success: successCreate,
    recipe: createdRecipe,
  } = recipeCreate

  const cookbookCreate = useSelector(state => state.cookbookCreate)
  const {
    success: successCookbookCreate,
  } = cookbookCreate

  const cookbookMyList = useSelector(state => state.cookbookMyList)
  const { cookbooks } = cookbookMyList

  useEffect(() => {
    dispatch({ type: RECIPE_CREATE_RESET })
    dispatch({ type: COOKBOOK_CREATE_RESET })
    dispatch(listMyCookbooks())

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
                  <PopoverStickOnHover
                    component={
                      <div style={{ backgroundColor: '#343a40', fontSize: '.85rem', width: '175px', textAlign: 'center' }}>
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
                        <LinkContainer to='/advanced-search' style={{paddingLeft: '5px', paddingRight: '5px', width: '100%',paddingTop: '0px', color: 'rgba(255,255,255,0.5)'}}>
                          <Nav.Link>
                            <div className="sidebarIcon">
                              <span>Advanced Search</span>
                            </div>
                          </Nav.Link>
                        </LinkContainer>
                      </div>
                    }
                    placement="right"
                    onMouseEnter={() => { }}
                    delay={200}
                  >
                    <div className="sidebarIcon">
                      <IoMdSearch style={{ fontSize: '1.25rem' }}/>
                      <span style={{paddingLeft: '15px'}}>Search</span>
                    </div>
                  </PopoverStickOnHover>
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
                    <PopoverStickOnHover
                      component={
                        <div style={{ backgroundColor: '#343a40', fontSize: '.85rem', width: '175px', textAlign: 'center' }}>
                          <LinkContainer to='/mychefs/page/1' style={{paddingLeft: '5px', paddingRight: '5px', width: '100%', paddingTop: '5px', color: 'rgba(255,255,255,0.5)' }}>
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
                        </div>
                      }
                      placement="right"
                      onMouseEnter={() => { }}
                      delay={200}
                    >
                      <div className="sidebarIcon">
                        <IoIosMore style={{ fontSize: '1.25rem' }}/>
                        <span style={{paddingLeft: '15px'}}>More</span>
                      </div>
                    </PopoverStickOnHover>                    
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
                        {cookbook.cookbook_name.length > 17 ? (
                          <LinkContainer to={`/cookbooks/${cookbook._id}`} style={{paddingLeft: '0px', paddingBottom: '0px', paddingTop: '0px', color: 'rgba(255,255,255,0.5)'}}>
                            <Nav.Link>
                              <div className="sidebarIcon">{cookbook.cookbook_name.slice(0, 17) + (cookbook.cookbook_name.length > 17 ? "..." : "")}</div>
                            </Nav.Link>
                          </LinkContainer>
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
        <IconBarMobile />
      ) : (
        <div>

        </div>
      )}
    </div>

  )
};

export default IconBar;
