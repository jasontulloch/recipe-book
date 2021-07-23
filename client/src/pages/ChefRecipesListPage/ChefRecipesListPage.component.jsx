import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyRecipes,
  createRecipe,
  deleteRecipe,
} from '../../actions/recipeActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';
import { IoLocationOutline } from 'react-icons/io5'
import { IoMdCreate } from 'react-icons/io'
import { BiInfoCircle } from 'react-icons/bi'
import { GiBookmark, GiRank3, GiFoodTruck } from 'react-icons/gi'
import { MdTimer, MdFormatListNumbered, MdLocalGroceryStore, MdDelete, MdPublish } from 'react-icons/md'

import { isMobile } from 'react-device-detect';

import './ChefRecipesListPage.styles.css';

const ChefRecipesListPage = ({ match , history }) => {

  const dispatch = useDispatch()

  const recipeMyList = useSelector(state => state.recipeMyList)
  const { loading, myRecipes } = recipeMyList

  const recipeCreate = useSelector(state => state.recipeCreate)
  const {
    success: successCreate,
    recipe: createdRecipe,
  } = recipeCreate

  const recipeDelete = useSelector(state => state.recipeDelete)
  const {
    success: successDelete,
  } = recipeDelete

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    dispatch({ type: RECIPE_CREATE_RESET })

    if(isMobile) {
      history.push('/myfoods', { myRecipesListPageMobileState: true })
    }

    if(!chefInfo) {
      history.push('/login')
    }

    if(successCreate) {
      history.push(`/myrecipes/${createdRecipe._id}/edit`)
    } else {
      dispatch(listMyRecipes())
    }
  }, [
    dispatch,
    history,
    chefInfo,
    successCreate,
    successDelete,
    createdRecipe,
    isMobile
  ])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure? You can not undo this action.')) {
      dispatch(deleteRecipe(id))
    }
  }

  const createRecipeHandler = () => {
    dispatch(createRecipe())
  }

  return (
      <div style={{paddingLeft: '220px', paddingRight: '10px'}}>
          <Row>
            <Col xs={12} style={{ textAlign: 'center', paddingBottom: '15px', paddingLeft: '0px' }}>
              <Button
                style={{margin: '5px', padding: '15px', width: '100%', backgroundColor: '#343a40' }}
                onClick={createRecipeHandler}
                variant='outline-success'
              >
                <i className='fas fa-plus'> Create a Recipe</i>
              </Button>
            </Col>
            <Table hover responsive borderless className='table-sm'>
              <thead style={{borderBottom: 'solid 1px #dedede'}}>
                <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                  <th style={{paddingRight: '0px', width: '115px'}}><GiBookmark style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px', width: '115px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center', paddingRight: '0px', width: '10px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><IoLocationOutline style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdTimer style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiFoodTruck style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiRank3 style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdFormatListNumbered style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdLocalGroceryStore style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdPublish style={{width: '20px', height: '20px'}}/></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(myRecipes === undefined || myRecipes.length === 0) ? (
                  <div></div>
                ) : (
                  myRecipes.map(recipe => (
                    <tr key={recipe.id}>
                      <td className="align-middle" style={{paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px'}}>
                        <Card style={{border: 'none', maxWidth: '100px'}}>
                          <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '77px', width: '100px'}} />
                        </Card>
                      </td>
                      <td className="align-middle" style={{maxWidth: '200px', paddingLeft: '5px'}}>
                        <Link
                          to={`/recipe/${recipe._id}`}
                          style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                        >
                          {recipe.recipe_name.length > 60 ? (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                              {recipe.recipe_name.slice(0, 60) + (recipe.recipe_name.length > 60 ? "..." : "")}
                            </div>
                          ) : (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                              {recipe.recipe_name}
                            </div>
                          )}
                        </Link>

                        <Link to={`/chefs/${recipe.chef}/page/1`}>
                          {chefInfo.username > 15 ? (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {chefInfo.username.slice(0, 15) + (chefInfo.username > 15 ? "..." : "")}
                            </div>
                          ) : (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {chefInfo.username}
                            </div>
                          )}
                        </Link>
                      </td>
                      <td className="align-middle" style={{padding: '0px'}}>
                        {recipe.isPublished === false && (
                          <OverlayTrigger
                            placement='bottom'
                            overlay={
                              <Tooltip id={'tooltip-bottom'}>
                                You need to publish the recipe to view it!
                              </Tooltip>
                            }
                          >
                            <span><BiInfoCircle /></span>
                          </OverlayTrigger>
                        )}
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>{recipe.country < 1 ? 'n/a' : recipe.country}</td>
                      <td className="align-middle" style={{textAlign: 'center', width: '35px'}}>{recipe.cook_time}</td>
                      <td className="align-middle" style={{width: '225px'}}>
                        {(recipe.isVegan === true && (
                          <ClickableBadgeBooleans isVegan={recipe.isVegan} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isVegetarian === true && (
                          <ClickableBadgeBooleans isVegetarian={recipe.isVegetarian} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isGlutenFree === true && (
                          <ClickableBadgeBooleans isGlutenFree={recipe.isGlutenFree} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isKetogenic === true && (
                          <ClickableBadgeBooleans isKetogenic={recipe.isKetogenic} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isPescatarian === true && (
                          <ClickableBadgeBooleans isPescatarian={recipe.isPescatarian} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isDairy === true && (
                          <ClickableBadgeBooleans isDairy={recipe.isDairy} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isEgg === true && (
                          <ClickableBadgeBooleans isEgg={recipe.isEgg} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isNuts === true && (
                          <ClickableBadgeBooleans isNuts={recipe.isNuts} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isShellfish === true && (
                          <ClickableBadgeBooleans isShellfish={recipe.isShellfish} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isSoy === true && (
                          <ClickableBadgeBooleans isSoy={recipe.isSoy} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isWheat === true && (
                          <ClickableBadgeBooleans isWheat={recipe.isWheat} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isAppetizer === true && (
                          <ClickableBadgeBooleans isAppetizer={recipe.isAppetizer} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isBreakfastBrunch === true && (
                          <ClickableBadgeBooleans isBreakfastBrunch={recipe.isBreakfastBrunch} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isDessert === true && (
                          <ClickableBadgeBooleans isDessert={recipe.isDessert} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isDrink === true && (
                          <ClickableBadgeBooleans isDrink={recipe.isDrink} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isMainDish === true && (
                          <ClickableBadgeBooleans isMainDish={recipe.isMainDish} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isSideSauce === true && (
                          <ClickableBadgeBooleans isSideSauce={recipe.isSideSauce} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                        {(recipe.isSnack === true && (
                          <ClickableBadgeBooleans isSnack={recipe.isSnack} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                        ))}
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>{recipe.netVotes}</td>
                      <td className="align-middle" style={{textAlign: 'center', width: '80px'}}>
                        {recipe.steps.length} Steps
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '120px'}}>
                        {recipe.ingredients.length} Ingredients
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>
                        {recipe.isPublished === true ? (
                          <i className='fas fa-check'></i>
                        ): (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px', padding: '0px'}}>
                        <LinkContainer to={`/myrecipes/${recipe._id}/edit`} style={{paddingLeft: '5px', paddingRight: '5px'}}>
                          <Button variant='light' className='btn-sm' style={{width: '30px', height: '30px'}}>
                            <IoMdCreate style={{width: '20px', height: '20px'}}/>
                          </Button>
                        </LinkContainer>
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px', padding: '0px 5px 0px 5px'}}>
                        <Button
                          variant='light'
                          className='btn-sm'
                          style={{width: '30px', height: '30px'}}
                          onClick={() => deleteHandler(recipe._id)}
                        >
                          <MdDelete style={{width: '20px', height: '20px'}}/>
                        </Button>
                      </td>
                    </tr>
                  ))
                )
              }
              </tbody>
            </Table>
          </Row>
      </div>
  )
}

export default ChefRecipesListPage;
