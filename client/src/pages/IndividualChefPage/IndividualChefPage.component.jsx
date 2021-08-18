import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Row,
  Col,
  Image,
  Button,
  Form,
  Badge,
  Table,
  Card,
  OverlayTrigger, 
  Tooltip 
} from 'react-bootstrap';
import {
  getChefPublicDetails,
} from '../../actions/chefPublicActions';
import {
  followChef,
  unfollowChef,
  getChefDetails
} from '../../actions/chefActions';
import {
  saveRecipe,
  unsaveRecipe,
} from '../../actions/recipeActions';
import { BiInfoCircle } from 'react-icons/bi'
import { IoLocationOutline } from 'react-icons/io5'
import { IoMdCreate, IoIosMore } from 'react-icons/io'
import { GiBookmark, GiRank3, GiFoodTruck } from 'react-icons/gi'
import { MdTimer, MdFormatListNumbered, MdLocalGroceryStore, MdDelete } from 'react-icons/md'
import { RiBookReadLine } from 'react-icons/ri';
import { CHEF_FOLLOW_RESET } from '../../constants/chefConstants';
import { CHEF_UNFOLLOW_RESET } from '../../constants/chefConstants';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import Message from '../../components/Message/Message.component';
import PaginateIndividualChef from '../../components/PaginateIndividualChef/PaginateIndividualChef.component';
import ClickableBadge from '../../components/ClickableBadge/ClickableBadge.component';
import PopoverStickOnHover from '../../components/PopoverStickOnHover/PopoverStickOnHover.component';

import 'react-multi-carousel/lib/styles.css';
import { isBrowser } from 'react-device-detect';

import './IndividualChefPage.styles.css';

const IndividualChefPage = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1
  const chefId = match.params.id

  const [save, setSave] = useState('')
  const [unsave, setUnsave] = useState('')

  // Keep for now, need to figure out how to prevent refresh
  const [followed, setFollowed] = useState('')
  const [unfollowed, setUnfollowed] = useState('')

  const [viewChefRecipes, setViewChefRecipes] = useState(true)
  const [viewChefCookbooks, setViewChefCookbooks] = useState(false)

  const veganRecipesHandler = (e) => { history.push('/recipes', { isVegan: true, isVegetarian: '', isGlutenFree: '', isKetogenic: '', isPescatarian: '' }) }
  const vegetarianRecipesHandler = (e) => { history.push('/recipes', { isVegan: '', isVegetarian: true, isGlutenFree: '', isKetogenic: '', isPescatarian: '' }) }
  const glutenFreeRecipesHandler = (e) => { history.push('/recipes', { isVegan: '', isVegetarian: '', isGlutenFree: true, isKetogenic: '', isPescatarian: '' }) }
  const ketogenicRecipesHandler = (e) => { history.push('/recipes', { isVegan: '', isVegetarian: '', isGlutenFree: '', isKetogenic: true, isPescatarian: '' }) }
  const pescatarianRecipesHandler = (e) => { history.push('/recipes', { isVegan: '', isVegetarian: '', isGlutenFree: '', isKetogenic: '', isPescatarian: true }) }
  const dairyRecipesHandler = (e) => { history.push('/recipes', { isDairy: true, isEgg: '', isNuts: '', isShellfish: '', isSoy: '', isWheat: '' }) }
  const eggRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: true, isNuts: '', isShellfish: '', isSoy: '', isWheat: '' }) }
  const nutsRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: '', isNuts: true, isShellfish: '', isSoy: '', isWheat: '' }) }
  const shellfishRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: '', isNuts: '', isShellfish: true, isSoy: '', isWheat: '' }) }
  const soyRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: '', isNuts: '', isShellfish: '', isSoy: true, isWheat: '' }) }
  const wheatRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: '', isNuts: '', isShellfish: '', isSoy: '', isWheat: true }) }
  const breakfastBrunchRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: true, isMainDish: '', isSideSauce: '', isDessert: '', isSnack: '', isAppetizer: '', isDrink: '' }) }
  const mainDishRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: true, isSideSauce: '', isDessert: '', isSnack: '', isAppetizer: '', isDrink: '' }) }
  const sideSauceRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: true, isDessert: '', isSnack: '', isAppetizer: '', isDrink: '' }) }
  const dessertRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: '', isDessert: true, isSnack: '', isAppetizer: '', isDrink: '' }) }
  const snackRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: '', isDessert: '', isSnack: true, isAppetizer: '', isDrink: '' }) }
  const appetizerRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: '', isDessert: '', isSnack: '', isAppetizer: true, isDrink: '' }) }
  const drinkRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: '', isDessert: '', isSnack: '', isAppetizer: '', isDrink: true }) }
  const countryRecipesHandler = (e) => { history.push('/recipes', { countryName: e.target.textContent }) }

  const browserHistory = useHistory();
  const dispatch = useDispatch()

  // Pulling in logged in chefs info to save recipes and if you are on your own page you will get a message
  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const chefPublicDetails = useSelector(state => state.chefPublicDetails)
  const {
    loading,
    chef,
    recipes,
    pages,
    page
  } = chefPublicDetails

  const chefDetails = useSelector(state => state.chefDetails)
  const {
    success: successChefPrivate,
    chef: chefChefPrivate
  } = chefDetails

  const chefFollow = useSelector(state => state.chefFollow)
  const {
    success: successChefFollow
  } = chefFollow

  const chefUnfollow = useSelector(state => state.chefUnfollow)
  const {
    success: successChefUnfollow
  } = chefUnfollow

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  // needed to get the chef details on page initialization
  const [initializeChefProfile, setInitializeChefProfile] = useState(true)

  useEffect(() => {
    if (initializeChefProfile === true) {
      setInitializeChefProfile(false)
      dispatch(getChefDetails('profile'))
      dispatch(getChefPublicDetails(chefId, pageNumber))
    }
    if(successChefFollow) {
      //setFollowed('')
      dispatch({ type: CHEF_FOLLOW_RESET })
      dispatch(getChefDetails('profile'))
    }
    if(successChefUnfollow) {
      //setUnfollowed('')
      dispatch({ type: CHEF_UNFOLLOW_RESET })
      dispatch(getChefDetails('profile'))
    }
    //dispatch(getChefPublicDetails(chefId, pageNumber))
  }, [
    dispatch,
    match,
    successChefFollow,
    successChefUnfollow,
    chefChefPrivate,
    successChefPrivate,
    initialLoader,
    initializeChefProfile,
    pageNumber,
    chefId,
  ])

  const followHandler = (e) => {
    e.preventDefault()
    dispatch(followChef(match.params.id, {
      chef
    }))
  }

  const unfollowHandler = (e) => {
    e.preventDefault()
    dispatch(unfollowChef(match.params.id, {
      chef
    }))
  }

const viewChefCookbooksHandler = () => {
  setViewChefRecipes(false)
  setViewChefCookbooks(true)
}

const viewChefRecipesHandler = () => {
  setViewChefRecipes(true)
  setViewChefCookbooks(false)
}

  const Diets = []
  if (chef.isVegan === true) {
    Diets.push('Vegan')
  }
  if (chef.isVegetarian === true) {
    Diets.push('Vegetarian')
  }
  if (chef.isGlutenFree === true) {
    Diets.push('Gluten Free')
  }
  if (chef.isKetogenic === true) {
    Diets.push('Ketogenic')
  }
  if (chef.isPescatarian === true) {
    Diets.push('Pescatarian')
  }

  const Allergins = []
  if (chef.isDairy === true) {
    Allergins.push('Dairy')
  }
  if (chef.isEgg === true) {
    Allergins.push('Egg')
  }
  if (chef.isNuts === true) {
    Allergins.push('Nuts')
  }
  if (chef.isShellfish === true) {
    Allergins.push('Shellfish')
  }
  if (chef.isSoy === true) {
    Allergins.push('Soy')
  }
  if (chef.isWheat === true) {
    Allergins.push('Wheat')
  }

  const [recipeId, setRecipeId] = useState('')
  const saveHandler = (e) => {
    e.preventDefault()
    dispatch(saveRecipe(recipeId, {
       save
    }))
  }

  const unsaveHandler = (e) => {
    e.preventDefault()
    dispatch(unsaveRecipe(recipeId, {
      unsave
    }))
  }

  return (
    <div className="individualChefPageMobile" style={{paddingLeft: '220px'}}>
        <div>
        {(chefInfo && chef && (chef.id === chefInfo._id)) ? (
          <Col xs={12} style={{textAlign:'center'}}>
            <Message variant='warning'>
              <Form.Text className='muted'>
                Looks like you found your public profile! Want to make a change?
                <Link to='/profile' style={{ paddingLeft: '5px' }}>
                  Edit you profile
                </Link>
                .
              </Form.Text>
            </Message>
          </Col>
        ) : (chefInfo == null) ? (
          <Col xs={12} style={{textAlign:'center'}}>
            <Message variant='warning'>
              <Form.Text className='muted'>
                <Link to='/login' style={{ paddingRight: '5px' }}>
                  Sign in
                </Link>
                to follow a chef
              </Form.Text>
            </Message>
          </Col>
        ) : (
          <div></div>
        )}
        {chef && (chef.isVisible === true) && (
        <div>
          <Row>
            <Col xs={12} md={7}>
              {chefInfo && chefChefPrivate && chefChefPrivate.following && chefChefPrivate.following.some(function(chefId){ return chefId.chef === chef._id}) ? (
                <Form onSubmit={unfollowHandler}>
                  <Form.Group as={Row} style={{marginBottom: '0px'}} className='justify-content-center'>
                    <Form.Label>
                      <h3 style={{ marginLeft: '10px', marginRight: '10px', fontSize: '1.5rem' }}>{chef.username}</h3>
                    </Form.Label>
                    {chefInfo && (
                      <Button
                        variant='link'
                        style={{ padding: 0, height: '25px'}}
                        type='submit'
                        onClick={(e) => setFollowed('')}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <Badge pill variant='primary' style={{marginLeft: '5px'}}>Unfollow</Badge>
                      </Button>
                    )}
                  </Form.Group>
                </Form>
              ) : (
                <Form onSubmit={followHandler}>
                  <Form.Group as={Row} style={{marginBottom: '0px'}} className='justify-content-center'>
                    <Form.Label className="individualChefPageNameMobile">
                      <h3 style={{ marginLeft: '10px', marginRight: '10px', fontSize: '1.25rem' }}>{chef.username}</h3>
                    </Form.Label>
                    {chefInfo && (
                      <Button
                        variant='link'
                        style={{ padding: 0, height: '25px'}}
                        type='submit'
                        onClick={(e) => setFollowed('')}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <Badge pill variant='primary' style={{marginLeft: '0px'}}>Follow</Badge>
                      </Button>
                    )}
                  </Form.Group>
                </Form>
              )}
              <h6 style={{textAlign: 'center'}}>
                {Diets.length > 0 && Diets.map((diet) => (
                  <ClickableBadge diet={diet} style={{marginRight: '5px', marginTop: '5px'}}>{diet}</ClickableBadge>
                ))}
              </h6>
              <h6 style={{paddingBottom: '10px', borderBottom: 'dotted 3px', textAlign: 'center'}}>
                {Allergins.length > 0 && Allergins.map((allergin) => (
                  <ClickableBadge allergin={allergin} style={{marginRight: '5px', marginTop: '5px'}}></ClickableBadge>
                ))}
              </h6>
              <p>{chef.bio}</p>
            </Col>
            <Col xs={12} md={5} style={{ textAlign:'center'}}>
              <Image
                style={{width: '300px', height: '300px'}}
                src={chef.chefPicture}
                rounded
              />
            </Col>
          </Row>
          {(isBrowser) ? (
            <Table responsive borderless className='table-sm' style={{marginTop: '15px'}}>
              <thead style={{borderBottom: 'solid 1px #dedede'}}>
                <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                  <th style={{paddingRight: '0px', width: '115px', paddingBottom: '5px'}}><GiBookmark style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', }}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center', paddingRight: '0px', width: '10px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><IoLocationOutline style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdTimer style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiFoodTruck style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiRank3 style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdFormatListNumbered style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdLocalGroceryStore style={{width: '20px', height: '20px'}}/></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {viewChefRecipes && recipes && recipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <Link
                      to={`/recipe/${recipe._id}`}
                      style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                    >
                      <td className="align-middle" style={{paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px'}}>
                        <Card style={{border: 'none', maxWidth: '100px'}}>
                          <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '77px', width: '100px', borderRadius: '25px'}} />
                        </Card>
                      </td>
                    </Link>
                    <td className="align-middle" style={{maxWidth: '200px', paddingLeft: '10px', minWidth: '225px', maxWidth: '225px'}}>
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
                      
                        {chef && chef.username > 15 ? (
                          <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                            {chef && chef.username.slice(0, 15) + (chef.username > 15 ? "..." : "")}
                          </div>
                        ) : (
                          <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                            {chef && chef.username}
                          </div>
                        )}
                      
                    </td>
                    <td className="align-middle" style={{padding: '0px'}}>
                      {recipe.isPublished === false && (
                        <OverlayTrigger
                          placement='bottom'
                          overlay={
                            <Tooltip id={'tooltip-bottom'}>
                              The chef has unpublished this recipe and appears to be making some edits!
                            </Tooltip>
                          }
                        >
                          <span><BiInfoCircle /></span>
                        </OverlayTrigger>
                      )}
                    </td>
                    <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>
                      <div onClick={countryRecipesHandler} style={{cursor: 'pointer'}}>
                        {recipe.country < 1 ? 'n/a' : recipe.country}
                      </div>
                    </td>
                    <td className="align-middle" style={{textAlign: 'center', width: '35px'}}>{recipe.cook_time}</td>
                    <td className="align-middle" style={{minWidth: '225px', maxWidth: '225px'}}>
                      {(recipe.isVegan === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={veganRecipesHandler}>Vegan</Badge> 
                      ))}
                      {(recipe.isVegetarian === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={vegetarianRecipesHandler}>Vegetarian</Badge> 
                      ))}
                      {(recipe.isGlutenFree === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={glutenFreeRecipesHandler}>Gluten Free</Badge>                                                               
                      ))}
                      {(recipe.isKetogenic === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={ketogenicRecipesHandler}>Ketogenic</Badge>    
                      ))}
                      {(recipe.isPescatarian === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={pescatarianRecipesHandler}>Pescatarian</Badge>     
                      ))}
                      {(recipe.isDairy === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={dairyRecipesHandler}>Dairy Free</Badge>    
                      ))}
                      {(recipe.isEgg === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={eggRecipesHandler}>Egg Free</Badge>                                   
                      ))}
                      {(recipe.isNuts === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={nutsRecipesHandler}>Nuts Free</Badge>                                  
                      ))}
                      {(recipe.isShellfish === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={shellfishRecipesHandler}>Shellfish Free</Badge>                                  
                      ))}
                      {(recipe.isSoy === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={soyRecipesHandler}>Soy Free</Badge>                                  
                      ))}
                      {(recipe.isWheat === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={wheatRecipesHandler}>Wheat Free</Badge>
                      ))}
                      {(recipe.isAppetizer === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={appetizerRecipesHandler}>Appetizer</Badge>  
                      ))}
                      {(recipe.isBreakfastBrunch === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={breakfastBrunchRecipesHandler}>Breakfast or Brunch</Badge>  
                      ))}
                      {(recipe.isDessert === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={dessertRecipesHandler}>Dessert</Badge>  
                      ))}
                      {(recipe.isDrink === true && ( 
                        <Badge pill variant='primary' style={{marginRight: '15px', marginTop: '5px', cursor: 'pointer'}} onClick={drinkRecipesHandler}>Drink</Badge>
                      ))}
                      {(recipe.isMainDish === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={mainDishRecipesHandler}>Main Dish</Badge>  
                      ))}
                      {(recipe.isSideSauce === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={sideSauceRecipesHandler}>Side or Sauce</Badge>  
                      ))}
                      {(recipe.isSnack === true && (
                        <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={snackRecipesHandler}>Snack</Badge> 
                      ))}
                    </td>
                    <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>{recipe.netVotes}</td>
                    <td className="align-middle" style={{textAlign: 'center', width: '80px'}}>
                      {recipe.steps.length} Steps
                    </td>
                    <td className="align-middle" style={{textAlign: 'center', width: '120px'}}>
                      {recipe.ingredients.length} Ingredients
                    </td>
                    <td className="align-middle" style={{textAlign: 'center', width: '50px', padding: '0px'}}>
                      <PopoverStickOnHover
                        component={
                          <div style={{ fontSize: '.85rem', textAlign: 'center', marginLeft: '0px', marginRight: '0px' }}>
                            <Col xs={12}>
                              <LinkContainer to={`/recipe/${recipe._id}`}>
                                <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}>
                                  View Recipe
                                </Button>
                              </LinkContainer>                     
                            </Col>
                            <Col xs={12}>
                              {(chefInfo && recipe.chef === chefInfo._id) && (
                                <LinkContainer to={`/myrecipes/${recipe._id}/edit`} style={{marginLeft: '0px', marginRight: '0px'}}>
                                  <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px', marginLeft: '0px', marginRight: '0px'}}>
                                    Edit Recipe
                                  </Button>
                                </LinkContainer>
                              )}                       
                            </Col>
                            {/* <Col xs={12}>
                              <Form onSubmit={unsaveHandler}>
                                <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}
                                  type='submit'
                                  onClick={(e) => setRecipeId(recipe._id)}
                                >
                                  Save Recipe
                                </Button>
                              </Form>                  
                            </Col> */}
                            <Col>
                              {(chefInfo && chefInfo.savedRecipes.find(chefRecipe => chefRecipe._id === recipe._id) ? (
                                <Form onSubmit={unsaveHandler}>
                                  <Button
                                    variant='light'
                                    className='btn-sm'
                                    style={{width: '100%', height: '30px'}}
                                    type='submit'
                                    onClick={(e) => setRecipeId(recipe._id)}
                                    disabled={(chefInfo == null) ? true : false}
                                  >
                                    Unsave Recipe
                                  </Button>
                                </Form>
                              ) : (chefInfo) ? (
                                <Form onSubmit={saveHandler}>
                                  <Button
                                    variant='light'
                                    className='btn-sm'
                                    style={{width: '100%', height: '30px'}}
                                    type='submit'
                                    onClick={(e) => setRecipeId(recipe._id)}
                                    disabled={(chefInfo == null) ? true : false}
                                  >
                                    Save Recipe
                                  </Button>
                                </Form>
                              ) : (
                                <Form>
                                  <Button
                                    variant='light'
                                    className='btn-sm'
                                    style={{width: '100%', height: '30px'}}
                                    disabled
                                  >
                                    Save Recipe
                                  </Button>
                                </Form>                     
                              ))}
                            </Col>
                          </div>
                        }
                        placement="left"
                        onMouseEnter={() => { }}
                        delay={200}
                      >
                        <div>
                          <IoIosMore style={{ fontSize: '1.25rem' }}/>
                        </div>
                      </PopoverStickOnHover>      
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div style={{marginBottom: '100px', marginTop: '15px'}}>
                <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', paddingLeft: '15px', height: '35px', textAlign: 'center'}}>
                  <Badge 
                    pill variant={(viewChefRecipes) ? 'success' : 'primary' }
                    style={{marginRight: '5px', marginTop: '5px'}}
                    onClick={viewChefRecipesHandler}
                  >
                    Chef Recipes
                  </Badge>
                  <Badge 
                    pill variant={(viewChefCookbooks) ? 'success' : 'primary' }
                    style={{marginRight: '5px', marginTop: '5px'}}
                    onClick={viewChefCookbooksHandler}
                  >
                    Chef Cookbooks
                  </Badge>
                </div>
                <Col xs={12}>
                    <Table hover responsive borderless className='table-sm'>
                        {viewChefRecipes && recipes && recipes.map((recipe) => (         
                            <tr key={recipe.id}>
                                <Link
                                    to={`/recipe/${recipe._id}`}
                                    style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                                >
                                <td style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                    <Card style={{border: 'none'}}>
                                        <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '77px', width: '100px', borderRadius: '25px'}} />
                                    </Card>
                                </td>
                                <td style={{paddingTop: '20.5px'}}>
                                    {recipe.recipe_name.length > 20 ? (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {recipe.recipe_name.slice(0, 40) + (recipe.recipe_name.length > 40 ? "..." : "")}
                                        </div>
                                    ) : (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {recipe.recipe_name}
                                        </div>
                                    )}
                                    {chef.username > 15 ? (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {chef.username.slice(0, 15) + (chef.username > 15 ? "..." : "")}
                                    </div>
                                    ) : (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {chef.username}
                                    </div>
                                    )}
                                </td>
                                </Link>
                            </tr>
                        ))}
                      </Table>
                    </Col>
            </div>
          )}
          {(recipes && recipes.length < 1) && (
            <div style={{marginRight: '15px', marginTop: '50px', textAlign: 'center'}}>
              <Message>Bummer... it looks like {chef.username} does not have any recipes yet.</Message>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  )
}

export default IndividualChefPage;
