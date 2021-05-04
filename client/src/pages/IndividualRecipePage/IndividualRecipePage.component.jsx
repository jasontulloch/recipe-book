import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Tooltip,
  OverlayTrigger,
  Badge
} from 'react-bootstrap';
import {
  listRecipeDetails,
  createRecipeUpvote,
  createRecipeDownvote,
  saveRecipe,
  unsaveRecipe,
  saveRecipeIngredients,
} from '../../actions/recipeActions';
import { RECIPE_CREATE_UPVOTE_RESET } from '../../constants/recipeConstants';
import { RECIPE_CREATE_DOWNVOTE_RESET } from '../../constants/recipeConstants';
import { RECIPE_SAVE_RESET } from '../../constants/recipeConstants';
import { RECIPE_UNSAVE_RESET } from '../../constants/recipeConstants';
import { RECIPE_SAVE_INGREDIENTS_RESET } from '../../constants/recipeConstants';
import Unitz from 'unitz'
import './IndividualRecipePage.styles.scss';
import { FaThumbsUp, FaThumbsDown, FaBookMedical, FaTimes, FaFileDownload } from 'react-icons/fa';
import RecipeImagesModal from '../../components/RecipeImagesModal/RecipeImagesModal.component';
import Message from '../../components/Message/Message.component';
import Fraction from 'fraction.js'

import { isBrowser, isMobile } from 'react-device-detect';

const IndividualRecipePage = ({ history, match }) => {

  const [vote, setVote] = useState(0)
  const [save, setSave] = useState('')
  const [unsave, setUnsave] = useState('')
  const [saveIngredients, setSaveIngredients] = useState('')
  const [servingSize, setServingSize] = useState(4)
  const [isMetric, setIsMetric] = useState(false)
  const [useTeaspoons, setUseTeaspoons] = useState(false)
  const [useTablespoons, setUseTablespoons] = useState(false)
  const [useFluidOunces, setUseFluidOunces] = useState(false)
  const [useCups, setUseCups] = useState(false)
  const [usePints, setUsePints] = useState(false)
  const [useQuarts, setUseQuarts] = useState(false)
  const [useGallons, setUseGallons] = useState(false)
  const [useOunces, setUseOunces] = useState(false)
  const [usePounds, setUsePounds] = useState(false)
  const [useInches, setUseInches] = useState(false)
  const [useMillilitres, setUseMillilitres] = useState(false)
  const [useLitres, setUseLitres] = useState(false)
  const [useGrams, setUseGrams] = useState(false)
  const [useKilograms, setUseKilograms] = useState(false)
  const [useCentimetres, setUseCentimetres] = useState(false)
  const [useMillimetres, setUseMillimetres] = useState(false)
  const [temperatureF, setTemperatureF] = useState(0)
  const [temperatureC, setTemperatureC] = useState(0)

  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const browserHistory = useHistory();
  const dispatch = useDispatch()

  const recipeDetails = useSelector(state => state.recipeDetails)
  const { loading, error, recipe, chefUsername, chefId } = recipeDetails

  const recipeUpvoteCreate = useSelector(state => state.recipeUpvoteCreate)
  const {
    success: successRecipeUpvote,
    error: errorRecipeUpvote
  } = recipeUpvoteCreate

  const recipeDownvoteCreate = useSelector(state => state.recipeDownvoteCreate)
  const {
    success: successRecipeDownvote,
    error: errorRecipeDownvote
  } = recipeDownvoteCreate

  const recipeSave = useSelector(state => state.recipeSave)
  const {
    success: successRecipeSave,
    error: errorRecipeSave
  } = recipeSave

  const recipeUnsave = useSelector(state => state.recipeUnsave)
  const {
    success: successRecipeUnsave,
    error: errorRecipeUnsave
  } = recipeUnsave

  const recipeSaveIngredients = useSelector(state => state.recipeSaveIngredients)
  const {
    success: successRecipeSaveIngredients,
    error: errorRecipeSaveIngredients
  } = recipeSaveIngredients

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  // Set up to toggle like and dislike button
  let doesVoteExist = Boolean
  try {
    if (recipe.votes) {
      doesVoteExist = recipe.votes.find(function(chefVote) {
        return chefVote.chef === chefInfo._id
      })
      if (doesVoteExist && doesVoteExist.rating === 1) {
        doesVoteExist = false
      } else {
        doesVoteExist = true
      }
    }
  } catch (err) {

  }

  const [showLikeBtn, setShowLikeBtn] = useState(doesVoteExist)

  let wasSaved = Boolean
  try {
    if (chefInfo.savedRecipes && recipe) {
      wasSaved = Boolean(chefInfo.savedRecipes.find(function(chefRecipe) {
        return chefRecipe._id === recipe._id
      }))
    }
  } catch (err) {

  }


  const [isRecipeSaved, setIsRecipeSaved] = useState(wasSaved)

  useEffect(() => {
    if(successRecipeUpvote) {
      setVote(0)
      setShowLikeBtn(false)
      dispatch({ type: RECIPE_CREATE_UPVOTE_RESET })
    }
    if(successRecipeDownvote) {
      setVote(0)
      setShowLikeBtn(true)
      dispatch({ type: RECIPE_CREATE_DOWNVOTE_RESET })
    }
    if(successRecipeSave) {
      setSave('')
      setIsRecipeSaved(true)
      dispatch({ type: RECIPE_SAVE_RESET })
    }
    if(successRecipeUnsave) {
      setUnsave('')
      setIsRecipeSaved(false)
      dispatch({ type: RECIPE_UNSAVE_RESET })
    }
    if(successRecipeSaveIngredients) {
      setSaveIngredients('')
      dispatch({ type: RECIPE_SAVE_INGREDIENTS_RESET })
    }
    dispatch(listRecipeDetails(match.params.id))
  }, [
    dispatch,
    match,
    successRecipeUpvote,
    successRecipeDownvote,
    successRecipeSave,
    successRecipeUnsave,
    successRecipeSaveIngredients,
    isMetric
  ])

  const upvoteHandler = (e) => {
    e.preventDefault()
    dispatch(createRecipeUpvote(match.params.id, {
      vote
    }))
  }

  const downvoteHandler = (e) => {
    e.preventDefault()
    dispatch(createRecipeDownvote(match.params.id, {
      vote
    }))
  }

  // If statemet is temporarily, just lets me click the button and if error will toggle to unsave
  const saveHandler = (e) => {
    e.preventDefault()
    dispatch(saveRecipe(match.params.id, {
      save
    }))
    setIsRecipeSaved(true)
  }

  // If statemet is temporarily, just lets me click the button and if error will toggle to save
  const unsaveHandler = (e) => {
    e.preventDefault()
    dispatch(unsaveRecipe(match.params.id, {
      unsave
    }))
    setIsRecipeSaved(false)
  }

  // Save ingredients
  const saveIngredientsHandler = (e) => {
    e.preventDefault()
    dispatch(saveRecipeIngredients(match.params.id, {
      saveIngredients
    }))
    setSuccessMessage('Recipe ingredients successfully added to your grocery list... go to ')
    setTimeout(function() {
      setSuccessMessage('')
    }, 3000)
  }

  const Diets = []
  if (recipe.isVegan === true) {
    Diets.push('Vegan')
  }
  if (recipe.isVegetarian === true) {
    Diets.push('Vegetarian')
  }
  if (recipe.isGlutenFree === true) {
    Diets.push('Gluten Free')
  }
  if (recipe.isKetogenic === true) {
    Diets.push('Ketogenic')
  }
  if (recipe.isPescatarian === true) {
    Diets.push('Pescatarian')
  }

  const Allergins = []
  if (recipe.isDairy === true) {
    Allergins.push('Dairy')
  }
  if (recipe.isEgg === true) {
    Allergins.push('Egg')
  }
  if (recipe.isNuts === true) {
    Allergins.push('Nuts')
  }
  if (recipe.isShellfish === true) {
    Allergins.push('Shellfish')
  }
  if (recipe.isSoy === true) {
    Allergins.push('Soy')
  }
  if (recipe.isWheat === true) {
    Allergins.push('Wheat')
  }

  const MealTypes = []
  if (recipe.isBreakfastBrunch === true) {
    MealTypes.push('Breakfast or Brunch')
  }
  if (recipe.isMainDish === true) {
    MealTypes.push('Main Dish')
  }
  if (recipe.isSideSauce === true) {
    MealTypes.push('Side or Sauce')
  }
  if (recipe.isDessert === true) {
    MealTypes.push('Dessert')
  }
  if (recipe.isSnack === true) {
    MealTypes.push('Snack')
  }
  if (recipe.isAppetizer === true) {
    MealTypes.push('Appetizer')
  }
  if (recipe.isDrink === true) {
    MealTypes.push('Drink')
  }

  // Function converts the time in minutes from Mongo to read as Hrs + Mins
  function time_convert(value) {
    if (value == null) { return "" }
    if (value <= 0) { return "" }
    const hours = Math.floor(value / 60)
    const minutes = value % 60
    let hour = (hours > 1) ? hours + " hrs " : hours + " hr "
        hour = (hours === 0) ? "" : hour
    let min = (minutes > 0) ? minutes + " mins" : ""
        min = (minutes === 1) ? minutes + " min" : min
    return hour + min
  }

  // Function disables all key presses
  function handleKeypress (e) {
    const characterCode = e.key
    if (characterCode) {
      e.preventDefault()
      setWarningMessage('Use the increment and decrement arrows to modify the serve size.')
      setTimeout(function() {
        setWarningMessage('')
      }, 3000)
    }
  }

  function handleKeypressMobile (e) {
    const characterCode = e.keyCode
    if ((characterCode > 31 && (characterCode < 48 || characterCode > 57) && !(characterCode == 46 || characterCode == 8)) || e.target.value > 20 || e.target.value < 1) {
      e.preventDefault()
      setTimeout(function() {
        setWarningMessage('')
      }, 3000)
    }
  }

  // Build custom array of imperial standards based on whether chef wants to use them
  const imperialStandards = []
  try {
    if (chefInfo.useTeaspoons === true) {
      imperialStandards.push('tsp')
    }
    if (chefInfo.useTablespoons === true) {
      imperialStandards.push('tbsp')
    }
    if (chefInfo.useFluidOunces === true) {
      imperialStandards.push('fl-oz')
    }
    if (chefInfo.useCups === true) {
      imperialStandards.push('c')
    }
    if (chefInfo.usePints === true) {
      imperialStandards.push('pt')
    }
    if (chefInfo.useQuarts === true) {
      imperialStandards.push('qt')
    }
    if (chefInfo.useGallons === true) {
      imperialStandards.push('gal')
    }
    if (chefInfo.useOunces === true) {
      imperialStandards.push('oz')
    }
    if (chefInfo.usePounds === true) {
      imperialStandards.push('lb')
    }
    if (chefInfo.useInches === true) {
      imperialStandards.push('in')
    }
  } catch (err) {

  }


  // Build custom array of metric standards based on whether chef wants to use them
  const metricStandards = []
  try {
    if (chefInfo.useMillilitres === true) {
      metricStandards.push('ml')
    }
    if (chefInfo.useLitres === true) {
      metricStandards.push('l')
    }
    if (chefInfo.useGrams === true) {
      metricStandards.push('g')
    }
    if (chefInfo.useKilograms === true) {
      metricStandards.push('kg')
    }
    if (chefInfo.useCentimetres === true) {
      metricStandards.push('cm')
    }
    if (chefInfo.useMillimetres === true) {
      metricStandards.push('mm')
    }
  } catch (err) {

  }


  // Note this will occassionally crash due to the React mapping before loading array
  // Return array of the recipe's ingredients (which includes quantity, measurement and amount)
  let recipeIngredients = []
  if (recipe.ingredients) {
    recipeIngredients = recipe.ingredients
  }
  // Actual recipe serving size
  const actualServingSize = recipe.serving_size
  // Return array of only the recipe's quantities and adjust for serving size
  if(servingSize > 20) {
    setServingSize(20)
    setWarningMessage('Serving sizes must be between 1 and 20.')
    setTimeout(function() {
      setWarningMessage('')
    }, 3000)
  }
  const quantitiesArray = recipeIngredients.map((ingredient) =>
    new Fraction((eval(ingredient[0]) / actualServingSize * servingSize)).toFraction(true)
  )
  // Return array of only the recipe's measurements
  const measurementArray = recipeIngredients.map((measurement) =>
    measurement[1]
  )
  // Merge quantities and measurement arrays
  const newIngredientAndMeasurementArray = quantitiesArray.map((e, i) => e + " " + measurementArray[i])
  // Adjust quantities and measurements to be readible with Unitz Library
  let merge = []
  if (isMetric === false) {
    merge = newIngredientAndMeasurementArray.map(e => Unitz.compound(e, imperialStandards))
  } else {
    merge = newIngredientAndMeasurementArray.map(e => Unitz.compound(e, metricStandards))
  }
  //const merge = newIngredientAndMeasurementArray.map(e => Unitz.compound(e, ['gal', 'c', 'tbsp', 'tsp']))
  let mergeNew = merge.map(function(x){return x.replace('Item', '')})
  mergeNew = mergeNew.map(function(x){return x.replace(' l', ' L')})
  mergeNew = mergeNew.map(function(x){return x.replace(' c', ' C')})
  // Return array of only the recipe's items
  const itemArray = recipeIngredients.map((item) =>
    item[2]
  )
  // Return array of only the recipe's preparation
  const preparationArray = recipeIngredients.map((preparation) =>
    preparation[3]
  )
  // Merge quantities / measurement array w Item
  const final = mergeNew.map((e, i) => e + " " + itemArray[i] + ((preparationArray[i] !== false) && " (" + preparationArray[i] + ")"))
  const finalCleanBrokenFractions = final.map(function(x){return x.replace(' ()', '')})
  const finalClean = finalCleanBrokenFractions.map(function(x){return x.replace('NaN/NaN ', '')})

  return (
    <div style={{paddingLeft: '30px', paddingRight:'30px'}} className="individualRecipePage">
      {recipe.isPublished === true ? (
        <div>
          <div className="individualRecipePageMessagesMobile" style={{paddingLeft: '30px'}}>
            {warningMessage !== '' && (
              <Message className="indvidualRecipePageMessageMobile" variant='danger'>{warningMessage}</Message>
            )}
            {(chefInfo == null) && (
              <Message className="indvidualRecipePageMessageMobile" variant='danger'>
                <Link to='/login' style={{ paddingRight: '5px' }}>
                  Sign in
                </Link>
                  or
                <Link to='/register' style={{ padding: '0px 5px 0px 5px' }}>
                  create an account
                </Link>
                  to get the most from RecipeBook
              </Message>
            )}
            {successMessage !== '' && (
              <Message className="indvidualRecipePageMessageMobile" variant='success'>
                {successMessage}
                <Link to='/grocerylist' style={{ paddingTop: 0, paddingBottom: 0 }}>
                  My Grocery List
                </Link>
              </Message>
            )}
          </div>

          <Row style={{marginLeft: '20px', marginRight: '10px'}} className="individualRecipePageFirstRowMobile">
            <Col xs={12} style={{textAlign: 'center'}}>
                <h2 className="individualRecipePageFontSizeMobile" style={{ marginLeft: '25px'}}>{recipe.recipe_name}</h2>
                <div>
                  <span>
                    <h5 className="individualRecipePageFontSizeMobile" style={{fontStyle: 'italic', display: 'inline'}}>Crafted By </h5>
                  </span>
                  <span>
                    <LinkContainer to={`/chefs/${chefId}`} style={{cursor: 'pointer', display: 'inline'}}>
                      <h5 className="individualRecipePageFontSizeMobile" style={{fontStyle: 'italic'}}>{chefUsername}</h5>
                    </LinkContainer>
                  </span>
                </div>
            </Col>
            <Col xs={12} style={{display: 'flex', justifyContent: 'center'}}>
              <Row style={{height: '40px'}}>
              {(chefInfo) ? (
                <div>
                  {(recipe.votes.length > 0 && recipe.votes.filter(chefId => chefId.chef.toString() === chefInfo._id.toString())[0] && recipe.votes.filter(chefId => chefId.chef.toString() === chefInfo._id.toString())[0].rating === 1) ? (
                    <Form onSubmit={downvoteHandler}>
                      <Form.Group as={Row}>
                        <Form.Label>
                          <p style={{ marginTop: '3px'}}>RATING | {recipe.netVotes}</p>
                        </Form.Label>
                        <Button
                          variant='link'
                          style={{ padding: 0, height: '25px'}}
                          type='submit'
                          onClick={(e) => setVote(-1)}
                          disabled={(chefInfo == null) ? true : false}
                        >
                          <FaThumbsDown style={{ marginLeft: '5px'}}/>
                        </Button>
                      </Form.Group>
                    </Form>
                  ) : (recipe.votes.length > 0 && recipe.votes.filter(chefId => chefId.chef.toString() === chefInfo._id.toString())[0] && recipe.votes.filter(chefId => chefId.chef.toString() === chefInfo._id.toString())[0].rating === -1) ? (
                    <Form onSubmit={upvoteHandler}>
                      <Form.Group as={Row}>
                        <Form.Label>
                          <p style={{ marginTop: '3px'}}>RATING | {recipe.netVotes}</p>
                        </Form.Label>
                        <Button
                          variant='link'
                          style={{ padding: 0, height: '25px'}}
                          type='submit'
                          onClick={(e) => setVote(1)}
                          disabled={(chefInfo == null) ? true : false}
                        >
                          <FaThumbsUp style={{ marginLeft: '5px'}}/>
                        </Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Row>
                      <Form onSubmit={upvoteHandler}>
                        <Form.Group as={Row}>
                          <Form.Label>
                            <p style={{ marginTop: '3px'}}>RATING | {recipe.netVotes}</p>
                          </Form.Label>
                          <Button
                            variant='link'
                            style={{ padding: 0, height: '25px', marginLeft: '10px', marginRight: '40px'}}
                            type='submit'
                            onClick={(e) => setVote(1)}
                            disabled={(chefInfo == null) ? true : false}
                          >
                            <FaThumbsUp style={{ }}/>
                          </Button>
                        </Form.Group>
                      </Form>
                      <Form onSubmit={downvoteHandler}>
                        <Form.Group as={Row}>
                          <Button
                            variant='link'
                            style={{ padding: 0, height: '25px'}}
                            type='submit'
                            onClick={(e) => setVote(-1)}
                            disabled={(chefInfo == null) ? true : false}
                          >
                            <FaThumbsDown style={{ }} />
                          </Button>
                        </Form.Group>
                      </Form>
                    </Row>
                  )}
                </div>
              ) : (
                <Form>
                  <Form.Label>
                    <p>RATING | {recipe.netVotes}</p>
                  </Form.Label>
                </Form>
              )}
              </Row>
            </Col>
            <Col xs={12} style={{borderBottom: 'dotted 3px'}}>
              <h6 style={{textAlign: 'center'}}>
                {(recipe.country && recipe.country.length > 1) && (
                  <Badge pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>{recipe.country}</Badge>
                )}
                {MealTypes.length > 0 && MealTypes.map((mealtype) => (
                  <Badge pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>{mealtype}</Badge>
                ))}
                {Diets.length > 0 && Diets.map((diet) => (
                  <Badge pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>{diet}</Badge>
                ))}
                {Allergins.length > 0 && Allergins.map((allergin) => (
                  <Badge pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>{allergin}</Badge>
                ))}
              </h6>
            </Col>
            <Col xs={12} style={{paddingTop: '20px'}}>
              <Row style={{display: 'flex', justifyContent: 'center'}}>
                {(isBrowser) ? (
                  <Col xs={12} md={6} style={{display: 'flex', justifyContent: 'center'}}>
                    <Form.Group as={Row} controlId='cookTime' style={{ marginBottom: '0px' }}>
                      <h5 style= {{ marginRight: '5px' }}>Serving Size:</h5>
                      <div style={{ border: '2px solid #4bbf73', height: '18px'}}>
                        <Form.Control
                            style={{
                              paddingLeft: '3px',
                              paddingRight: '3px',
                              paddingTop: '7px',
                              paddingBottom: '6px',
                              width: '40px',
                              height: '12px'
                            }}
                            type='number'
                            min={1}
                            max={20}
                            step={1}
                            value={servingSize}
                            onChange={(e) => setServingSize(e.target.value)}
                            onKeyDown={handleKeypress}
                            required
                          >
                        </Form.Control>
                      </div>
                      <Form.Check
                        style={{ paddingLeft: '5px', width: '40px', height: '20px', paddingTop: '5px', paddingBottom: '8px'}}
                        inline
                        label='Metric?'
                        checked={isMetric}
                        onChange={(e) => setIsMetric(e.target.checked)}
                        disabled={(chefInfo == null) ? true : false}
                      />
                    </Form.Group>
                  </Col>
                ) : (
                  <div>
                    <Col xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                      <h5 style= {{ marginRight: '5px' }}>Serving Size:</h5>
                    </Col>
                    <Col xs={12} style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}>
                      <div style={{ border: '2px solid #4bbf73', height: '30px'}}>
                        <Form.Control
                            style={{
                              paddingLeft: '3px',
                              paddingRight: '3px',
                              paddingTop: '0px',
                              paddingBottom: '6px',
                              width: '40px',
                              height: '25px',
                              fontSize: '18px'
                            }}
                            type='number'
                            min={1}
                            max={20}
                            step={1}
                            value={servingSize}
                            onChange={(e) => setServingSize(e.target.value)}
                            onKeyUp={handleKeypressMobile}
                            required
                          >
                        </Form.Control>
                      </div>

                      <Form.Check
                        style={{ paddingLeft: '5px', paddingTop: '5px', paddingBottom: '8px'}}
                        inline
                        label='Metric?'
                        checked={isMetric}
                        onChange={(e) => setIsMetric(e.target.checked)}
                        disabled={(chefInfo == null) ? true : false}
                      />
                    </Col>
                  </div>
                )}
                <Col xs={12} md={6} style={{textAlign:'center'}}>
                  <h5>Cook Time: {time_convert(recipe.cook_time)}</h5>
                </Col>
              </Row>
            </Col>
            <Col xs={12} style={{paddingTop: '7.5px', paddingLeft: '0px', marginLeft: '30px', display: 'flex', justifyContent: 'center'}}>
              {recipe.steps && recipe.steps.flat().join('').includes('Celsius' || 'celsius' || ' C ') && (
              <Form.Group as={Row} controlId='celsiusToFahrenheit' style={{ marginBottom: '0px' }}>
                <h5 className="individualRecipePageFontSizeMobile" style= {{ marginRight: '5px' }}>Celsius:</h5>
                <div style={{border: '2px solid #4bbf73', height: '18px'}}>
                  <Form.Control
                      style={{ paddingLeft: '3px', paddingRight: '3px', paddingTop: '7px', paddingBottom: '6px', width: '80px', height: '12px'}}
                      type='number'
                      step={5}
                      onChange={(e) => setTemperatureC((eval(e.target.value) * 9 / 5) + 32 )}
                    >
                  </Form.Control>
                </div>
                <div style={{paddingLeft: '10px'}}>
                  {temperatureC > 0 && (
                    <h5 className="individualRecipePageFontSizeMobile"> is {temperatureC.toFixed()} Degrees Fahrenheit</h5>
                  )}
                </div>
              </Form.Group>
              )}
              {recipe.steps && recipe.steps.flat().join('').includes('Fahrenheit' || 'fahrenheit' || ' F ') && (
              <Form.Group as={Row} controlId='fahrenheitToCelsius' style={{ marginBottom: '0px' }}>
                <h5 className="individualRecipePageFontSizeMobile" style= {{ marginRight: '5px' }}>Fahrenheit:</h5>
                <div style={{border: '2px solid #4bbf73', height: '18px'}}>
                  <Form.Control
                      style={{ paddingLeft: '3px', paddingRight: '3px', paddingTop: '7px', paddingBottom: '6px', width: '80px', height: '12px'}}
                      type='number'
                      step={5}
                      onChange={(e) => setTemperatureF((eval(e.target.value) - 32) * 5 / 9 )}
                    >
                  </Form.Control>
                </div>
                <div style={{paddingLeft: '10px'}}>
                  {temperatureF > 0 && (
                    <h5 className="individualRecipePageFontSizeMobile"> is {temperatureF.toFixed()} Degrees Celsius</h5>
                  )}
                </div>
              </Form.Group>
              )}
            </Col>
            <Col xs={12} style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            {(isRecipeSaved) ? (
              <Form onSubmit={unsaveHandler}>
                <Button
                  variant='outline-success'
                  className='ml-1 p-1'
                  style={{fontSize: '8.5px', lineHeight: '10px'}}
                  type='submit'
                  onClick={(e) => setSave('')}
                  disabled={(chefInfo == null) ? true : false}
                >
                  Remove recipe from recipebook
                </Button>
              </Form>
            ) : (
              <Form onSubmit={saveHandler}>
                <Button
                  variant='outline-success'
                  className='ml-1 p-1'
                  style={{fontSize: '8.5px', lineHeight: '10px'}}
                  type='submit'
                  onClick={(e) => setSave('')}
                  disabled={(chefInfo == null) ? true : false}
                >
                  Add recipe to recipebook
                </Button>
              </Form>
            )}
              <Form onSubmit={saveIngredientsHandler}>
                <Button
                  variant='outline-success'
                  className='ml-1 p-1'
                  style={{fontSize: '8.5px', lineHeight: '10px'}}
                  type='submit'
                  onClick={(e) => setSaveIngredients('')}
                  disabled={(chefInfo == null) ? true : false}
                >
                  Add ingredients to grocery list
                </Button>
              </Form>
            </Col>
            <Col className="indvidualRecipePageIngredientsMobile" style={{ paddingTop: '15px'}} xs={12} md={6}>
              <Row>
                <Col style={{textAlign: 'center'}}>
                  <h4 className="individualRecipePageFontSizeMobile" style={{paddingLeft: '0px', textAlign: 'center'}}>Ingredients</h4>
                </Col>
              </Row>
              <ul className="indvidualRecipePageIngredientListMobile">
                {finalClean && finalClean.map((obj) => (
                  <li className="individualRecipePageFontSizeMobile">{obj}</li>
                ))}
              </ul>
            </Col>
            <Col className="indvidualRecipePageStepsContainerMobile" xs={12} md={6} style={{ paddingLeft: '0px', paddingTop: '15px' }}>
              <h4 className="individualRecipePageFontSizeMobile" style={{paddingLeft: '0px', textAlign: 'center'}}>Steps</h4>
              <ol className="indvidualRecipePageStepsMobile">
                {recipe.steps && recipe.steps.map((step) => (
                  <li className="individualRecipePageFontSizeMobile">{step}</li>
                ))}
              </ol>
            </Col>
            <Col className="indvidualRecipePageNotesMobile" xs={12} style={{textAlign: 'center', paddingBottom: '20px'}}>
              {recipe.notes && recipe.notes !== '' && (
                <div>
                  <h4 className="individualRecipePageFontSizeMobile">Recipe Notes</h4>
                  <p className="individualRecipePageFontSizeMobile">{recipe.notes}</p>
                </div>
              )}
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'center', paddingBottom: '20px'}}>
              <RecipeImagesModal recipe={recipe}/>
            </Col>
          </Row>
        </div>
      ) : (
        <Row>
          <Col style={{textAlign: 'center', paddingTop: '100px'}}>
            <p>Looks like this recipe does not exist or is no longer published. Time to find you a new one!</p>
            <LinkContainer to={`/recipes`}>
              <Button variant='light' className='btn-sm'>
                <i className='fas fa-search'>Explore all Recipes!</i>
              </Button>
            </LinkContainer>
            <LinkContainer to={`/recipes/advanced-search`}>
              <Button variant='light' className='btn-sm'>
                <i className='fas fa-search'>Find the Exact Recipe you are Looking For!</i>
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default IndividualRecipePage;
