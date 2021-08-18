import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip, Card, Form, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listCookbookDetails,
  updateCookbook,
  listMyCookbooks
} from '../../actions/cookbookActions';
import {
  removeRecipeFromCookbook,
} from '../../actions/recipeActions';
import Message from '../../components/Message/Message.component';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';
import PopoverStickOnHover from '../../components/PopoverStickOnHover/PopoverStickOnHover.component';
import { IoLocationOutline } from 'react-icons/io5'
import { IoMdCreate, IoIosMore } from 'react-icons/io'
import { BiInfoCircle } from 'react-icons/bi'
import { GiBookmark, GiRank3, GiFoodTruck } from 'react-icons/gi'
import { MdTimer, MdFormatListNumbered, MdLocalGroceryStore, MdDelete } from 'react-icons/md'

import { RECIPE_REMOVE_FROM_COOKBOOK_RESET } from '../../constants/recipeConstants';
import { COOKBOOK_UPDATE_RESET, COOKBOOK_DETAILS_RESET } from '../../constants/cookbookConstants';

import { isBrowser } from 'react-device-detect';

import './CookbookDetailsPage.styles.css';

const CookbookDetailsPage = ({ match , history }) => {

  const cookbookId = match.params.id
  const [removeFromCookbook, setRemoveFromCookbook] = useState('')
  const [cookbook_name, setCookbookName] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [cookbook_cover_image, setCookbookCoverImage] = useState('')

  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [editCookbookDetails, setEditCookbookDetails] = useState(false)

  const dispatch = useDispatch()

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

  const cookbookDetails = useSelector(state => state.cookbookDetails)
  const { loading, error, success, cookbook, myCookbookRecipes, chefNames } = cookbookDetails

  const recipeRemoveFromCookbook = useSelector(state => state.recipeRemoveFromCookbook)
  const {
    success: successRecipeRemoveFromCookbook
  } = recipeRemoveFromCookbook

  const cookbookUpdate = useSelector(state => state.cookbookUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = cookbookUpdate

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    if(successRecipeRemoveFromCookbook) {
      setRemoveFromCookbook('')
      dispatch({ type: RECIPE_REMOVE_FROM_COOKBOOK_RESET })
    }
    if(successUpdate) {
      dispatch({ type: COOKBOOK_UPDATE_RESET })
      dispatch({ type: COOKBOOK_DETAILS_RESET })
      dispatch(listMyCookbooks())
    } else {
      // this check makes sure the FE updates if we look at a different cookbook
      if(!cookbook.cookbook_name || cookbook._id !== cookbookId) {
        dispatch(listCookbookDetails(cookbookId))
      } else {
        setCookbookName(cookbook.cookbook_name)
        setDescription(cookbook.description)
        setIsPrivate(cookbook.isPrivate)
        setIsPremium(cookbook.isPremium)
        setCookbookCoverImage(cookbook.cookbook_cover_image)
      }
    }
  }, [
    dispatch,
    history,
    chefInfo,
    cookbookId,
    successUpdate,
    successRecipeRemoveFromCookbook,
    cookbook.cookbook_name,
    cookbook.description,
    cookbook.isPrivate,
    cookbook.setIsPremium,
    cookbook.cookbook_cover_image
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    setEditCookbookDetails(false)
    dispatch(
      updateCookbook({
        _id: cookbookId,
        cookbook_name,
        description,
        isPrivate,
        isPremium,
        cookbook_cover_image,
      })
    )
  }

  const [recipeId, setRecipeId] = useState('')
  const removeRecipeFromCookbookHandler = (id) => {
    // console.log(match.params.id) This is currently the cookbook ID
    // console.log(recipeId) This is the correct recipeID
    if(window.confirm('Are you sure? You can not undo this action.')) {
      dispatch(removeRecipeFromCookbook(id, { 
        removeFromCookbook,
        cookbookId
      }))
    }
  }

    // Need to update to remove recipe from liked recipes on page (vs new window)
  //const [recipeId, setRecipeId] = useState('')
  // const [unsave, setUnsave] = useState('')
  // const unsaveHandler = (e) => {
  //   e.preventDefault()
  //   const index = currentMySavedRecipesList.findIndex(x => x._id === recipeId)
  //   dispatch(unsaveRecipe(recipeId, {
  //     unsave
  //   }))
  //   setCurrentMySavedRecipesList(() => {
  //     return [...currentMySavedRecipesList.slice(0, index), ...currentMySavedRecipesList.splice(index+1)]
  //   })
  // }

  return (
      <div className="cookbookDetailsPageMobile" style={{paddingLeft: '200px', paddingRight: '30px'}}>
          {warningMessage !== '' && (
            <Message variant='danger'>{warningMessage}</Message>
          )}
          {successMessage !== '' && (
            <Message variant='success'>{successMessage}</Message>
          )}
          {(myCookbookRecipes === undefined || myCookbookRecipes.length == 0 && chefInfo._id === cookbook.chef) && (
            <div style={{marginLeft: '30px', width: '100%', textAlign: 'center'}}>
              <Message variant='warning'>Looks like your cookbook does not have any recipes yet. Go to any recipe page to add it to this cookbook...</Message>
            </div>
          )}
          {(isBrowser) ? (
            <div>
            {editCookbookDetails === false ? (
              <div style={{marginLeft: '30px'}}>
                <Form>
                  <Form.Label>
                    <h3>
                      {cookbook.cookbook_name}
                    </h3>
                  </Form.Label>
                  <Form.Check
                    className="align-middle"
                    inline
                    style={{paddingBottom: '10px', marginLeft: '10px'}}
                    type="switch"
                    id="custom-switch"
                    label="Edit"
                    onChange={(e) => setEditCookbookDetails(true)}
                  />
                </Form>
                <p>{cookbook.description}</p>
              </div>
            ) : (
              <div style={{marginLeft: '30px', maxWidth: '50%'}}>
                <Form inline onSubmit={submitHandler}>
                  <h3>
                    <Form.Control
                      style={{width: '25vw'}}
                      inline
                      type='text'
                      placeholder={cookbook.cookbook_name}
                      value={cookbook_name}
                      maxLength={40}
                      minLength={5}
                      onChange={(e) => setCookbookName(e.target.value)}
                    >
                    </Form.Control>
                  </h3>
                  <Button
                    type='submit'
                    variant='primary'
                    className="align-middle"
                    style={{marginBottom: '10px', marginLeft: '10px'}}
                    onChange={(e) => setEditCookbookDetails(false)}
                  >
                    Save Changes
                  </Button>
                  <p>
                    <Form.Control
                      style={{width: '80vw'}}
                      inline
                      as='textarea'
                      rows={3}
                      placeholder={cookbook.description}
                      value={description}
                      maxLength={300}
                      minLength={0}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                  </p>

                </Form>
                <Row>
                  <Form.Check
                    className="align-middle"
                    inline
                    style={{paddingBottom: '10px', marginLeft: '10px'}}
                    label="Share?"
                    type="switch"
                    id="custom-switch"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                  />
                </Row>
              </div>
            )}
            
            <Table responsive borderless className='table-sm' style={{marginLeft: '20px'}}>
              <thead style={{borderBottom: 'solid 1px #dedede'}}>
                <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                  <th style={{paddingRight: '0px', width: '115px'}}><GiBookmark style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px', minWidth: '200px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center', paddingRight: '0px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><IoLocationOutline style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdTimer style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center', minWidth: '300px'}}><GiFoodTruck style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiRank3 style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdFormatListNumbered style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdLocalGroceryStore style={{width: '20px', height: '20px'}}/></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(myCookbookRecipes && myCookbookRecipes.map(recipe => (
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
                      <td className="align-middle" style={{maxWidth: '200px', paddingLeft: '10px'}}>
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
                        <Link to={`/chefs/${recipe.chef}`}>
                          {chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {chefNames.find( ({ _id }) => _id === recipe.chef ).username.slice(0, 15) + (chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? "..." : "")}
                            </div>
                          ) : (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {chefNames.find( ({ _id }) => _id === recipe.chef ).username}
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
                      <td className="align-middle" style={{minWidth: '150px', maxWidth: '150px', textAlign: 'center'}}>
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
                              {(recipe.isPublished) && (
                              <Col xs={12}>
                                <LinkContainer to={`/recipe/${recipe._id}`}>
                                  <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}>
                                    View Recipe
                                  </Button>
                                </LinkContainer>                     
                              </Col>
                              )} 
                              <Col xs={12}>
                              {(chefInfo && recipe.chef === chefInfo._id) && (
                                <LinkContainer to={`/myrecipes/${recipe._id}/edit`} style={{paddingLeft: '5px', paddingRight: '5px'}}>
                                  <Button variant='light' className='btn-sm' style={{width: '30px', height: '30px'}}>
                                    Edit Recipe
                                  </Button>
                                </LinkContainer>
                              )}                 
                              </Col>
                              <Col xs={12}>
                                {(chefInfo && cookbook.chef === chefInfo._id) && (
                                    <Button 
                                    variant='light' 
                                    className='btn-sm' 
                                    style={{width: '100%', height: '30px'}}
                                    onClick={() => removeRecipeFromCookbookHandler(recipe._id)}
                                    disabled
                                  >
                                    Remove Recipe
                                  </Button>
                                )}
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
                  )))}
              </tbody>
            </Table>
            </div>
            ) : (
            <div>
              {editCookbookDetails === false ? (
                <div style={{marginLeft: '10px'}}>
                  <Form>
                    <Form.Label>
                      <h3 style={{textAlign: 'center'}}>
                        {cookbook.cookbook_name}
                      </h3>
                    </Form.Label>
                    <p>{cookbook.description}</p>
                    <Form.Check
                      className="align-middle"
                      inline
                      style={{paddingBottom: '10px'}}
                      type="switch"
                      id="custom-switch"
                      label="Edit"
                      onChange={(e) => setEditCookbookDetails(true)}
                    />
                  </Form>
                </div>
              ) : (
                <div style={{width: '100%'}}>
                  <Form inline onSubmit={submitHandler}>
                    <h3>
                      <Form.Control
                        style={{width: '95vw'}}
                        inline
                        type='text'
                        placeholder={cookbook.cookbook_name}
                        value={cookbook_name}
                        maxLength={40}
                        minLength={5}
                        onChange={(e) => setCookbookName(e.target.value)}
                      >
                      </Form.Control>
                    </h3>
                    <p>
                      <Form.Control
                        style={{width: '95vw'}}
                        inline
                        as='textarea'
                        rows={3}
                        placeholder={cookbook.description}
                        value={description}
                        maxLength={300}
                        minLength={0}
                        onChange={(e) => setDescription(e.target.value)}
                      >
                      </Form.Control>
                    </p>
                    <div style={{width: '95vw'}}>
                        <Form.Check
                          className="align-middle"
                          inline
                          style={{paddingBottom: '10px', marginLeft: '20px'}}
                          label="Share?"
                          type="switch"
                          id="custom-switch"
                          checked={isPrivate}
                          onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                        <Button
                          type='submit'
                          variant='primary'
                          style={{marginBottom: '10px', width: '50vw', height: '25px', padding: '0px 6px 6px 6px'}}
                          onChange={(e) => setEditCookbookDetails(false)}
                        >
                          Save Changes
                        </Button>
                    </div>             
                  </Form>
                </div>
              )}
              
              <Table responsive borderless className='table-sm'>
                <thead style={{borderBottom: 'solid 1px #dedede'}}>
                  <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                    <th style={{paddingRight: '0px'}}><GiBookmark style={{width: '20px', height: '20px'}}/></th>
                    <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px'}}></th>
                  </tr>
                </thead>
                <tbody>
                  {(myCookbookRecipes === undefined || myCookbookRecipes.length == 0) ? (
                    <div></div>
                  ) : (
                    myCookbookRecipes.map(recipe => (
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
                            {chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? (
                              <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                {chefNames.find( ({ _id }) => _id === recipe.chef ).username.slice(0, 15) + (chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? "..." : "")}
                              </div>
                            ) : (
                              <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                {chefNames.find( ({ _id }) => _id === recipe.chef ).username}
                              </div>
                            )}
                          </td>
                        </Link>
                      </tr>
                    ))
                  )
                }
                </tbody>
              </Table>
            </div>
            )}
      </div>
  )
}

export default CookbookDetailsPage;
