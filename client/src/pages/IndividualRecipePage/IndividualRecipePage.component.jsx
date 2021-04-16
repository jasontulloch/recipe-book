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
  OverlayTrigger
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
    MealTypes.push('isAppetizer')
  }
  if (recipe.isDrink === true) {
    MealTypes.push('isDrink')
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
  const quantitiesArray = recipeIngredients.map((ingredient) =>
    new Fraction((eval(ingredient[0]) / actualServingSize * servingSize).toFixed(2)).toFraction(true)
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
    <div>
      {recipe.isPublished === true ? (
        <div>
          {warningMessage !== '' && (
            <Message variant='danger'>{warningMessage}</Message>
          )}
          {(chefInfo == null) && (
            <Message variant='danger'>
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
            <Message variant='success'>
              {successMessage}
              <Link to='/grocerylist' style={{ paddingTop: 0, paddingBottom: 0 }}>
                My Grocery List
              </Link>
            </Message>
          )}
          <Row>
            <Col xs={12} sm={12} md={2} lg={2} xl={2} style={{paddingLeft: '0px' }}>
              <Link className="btn btn-dark" onClick={() => browserHistory.goBack()} style={{ padding: '0px 5px 0px 5px' }}>
                Go Back
              </Link>
            </Col>
            <Col xs={12} sm={12} md={10} lg={10} xl={10}>
              <Row style={{ height: '30px' }}>
              {(isRecipeSaved) ? (
                <Form onSubmit={unsaveHandler}>
                  <Form.Group>
                    <OverlayTrigger
                      placement='bottom'
                      overlay={
                        <Tooltip id={'tooltip-bottom'}>
                          Remove recipe from your recipe book
                        </Tooltip>
                      }
                    >
                      <Button
                        variant='link'
                        style={{ marginRight: '12.25px', padding: 0, height: '25px'}}
                        type='submit'
                        onClick={(e) => setSave('')}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <FaTimes />
                      </Button>
                    </OverlayTrigger>
                  </Form.Group>
                </Form>
              ) : (
                <Form onSubmit={saveHandler}>
                  <Form.Group>
                    <OverlayTrigger
                      placement='bottom'
                      overlay={
                        <Tooltip id={'tooltip-bottom'}>
                          Save recipe to your recipe book
                        </Tooltip>
                      }
                    >
                      <Button
                        variant='link'
                        style={{ marginRight: '12.25px', padding: 0, height: '25px'}}
                        type='submit'
                        onClick={(e) => setSave('')}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <FaBookMedical />
                      </Button>
                    </OverlayTrigger>
                  </Form.Group>
                </Form>
              )}
              {(showLikeBtn || doesVoteExist) ? (
                <Form onSubmit={upvoteHandler}>
                  <Form.Group as={Row}>
                    <Form.Label>
                      <h4 style={{ marginLeft: '10px' }}>{recipe.recipe_name}</h4>
                    </Form.Label>
                    <Form.Label>
                      <p style={{ marginTop: '3px', marginLeft: '10px' }}>RATING | {recipe.netVotes}</p>
                    </Form.Label>
                    <OverlayTrigger
                      placement='right'
                      overlay={
                        <Tooltip id={'tooltip-right'}>
                          Upvote recipe... This will not save the recipe
                        </Tooltip>
                      }
                    >
                      <Button
                        variant='link'
                        style={{ padding: 0, height: '25px'}}
                        type='submit'
                        onClick={(e) => setVote(1)}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <FaThumbsUp style={{ marginLeft: '5px'}}/>
                      </Button>
                    </OverlayTrigger>
                  </Form.Group>
                </Form>
              ) : (
                <Form onSubmit={downvoteHandler}>
                  <Form.Group as={Row}>
                    <Form.Label>
                      <h4 style={{ marginLeft: '10px' }}>{recipe.recipe_name}</h4>
                    </Form.Label>
                    <Form.Label>
                      <p style={{ marginTop: '3px', marginLeft: '10px' }}>RATING | {recipe.netVotes}</p>
                    </Form.Label>
                    <OverlayTrigger
                      placement='right'
                      overlay={
                        <Tooltip id={'tooltip-right'}>
                          Downvote recipe
                        </Tooltip>
                      }
                    >
                      <Button
                        variant='link'
                        style={{ padding: 0, height: '25px'}}
                        type='submit'
                        onClick={(e) => setVote(-1)}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <FaThumbsDown style={{ marginLeft: '5px'}}/>
                      </Button>
                    </OverlayTrigger>
                  </Form.Group>
                </Form>
              )}
              </Row>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingLeft: 0 }}>
              <LinkContainer to={`/chefs/${chefId}`} style={{cursor: 'pointer'}}>
                <h5>Chef: {chefUsername}</h5>
              </LinkContainer>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} style={{ paddingLeft: 0 }}>
              <h5>Cook Time: {time_convert(recipe.cook_time)}</h5>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} style={{ paddingLeft: 0 }}>
              <Form.Group as={Row} controlId='cookTime' style={{ marginBottom: '0px' }}>
                <h5 style= {{ marginRight: '5px' }}>Serving Size:</h5>
                <Form.Control
                    style={{ paddingLeft: '3px', paddingRight: '3px', paddingTop: '9px', paddingBottom: '8px', width: '40px', height: '12px'}}
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
                <Form.Check
                  style={{ paddingLeft: '5px', width: '40px', height: '20px', paddingRight: '15px', paddingTop: '5px', paddingBottom: '8px'}}
                  inline
                  label='Metric?'
                  checked={isMetric}
                  onChange={(e) => setIsMetric(e.target.checked)}
                  disabled={(chefInfo == null) ? true : false}
                />
              </Form.Group>
            </Col>
            {(recipe.country && recipe.country.length > 1) && (
              <Col xs={12} sm={12} md={12} lg={4} xl={4} style={{ paddingLeft: 0 }}>
                <h5>Country: {recipe.country}</h5>
              </Col>
            )}
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingLeft: 0 }}>
              <h5>
                {MealTypes.length > 0 && 'Meal Type / Course: '}
                {new Intl.ListFormat().format(MealTypes)}
              </h5>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingLeft: 0 }}>
              <h5>
                {Diets.length > 0 && 'Diets: '}
                {new Intl.ListFormat().format(Diets)}
              </h5>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingLeft: 0 }}>
              <h5>
                {Allergins.length > 0 && 'Allergins: '}
                {new Intl.ListFormat().format(Allergins)}
              </h5>
            </Col>
            <Col xs={12} style={{paddingBottom: '20px'}}>
              {recipe.steps && recipe.steps.flat().join('').includes('Celsius' || 'celsius' || ' C ') && (
              <Form.Group as={Row} controlId='celsiusToFahrenheit' style={{ marginBottom: '0px' }}>
                <h5 style= {{ marginRight: '5px' }}>Celsius:</h5>
                <Form.Control
                    style={{ paddingLeft: '3px', paddingRight: '3px', paddingTop: '9px', paddingBottom: '8px', width: '80px', height: '12px'}}
                    type='number'
                    step={5}
                    onChange={(e) => setTemperatureC((eval(e.target.value) * 9 / 5) + 32 )}
                  >
                </Form.Control>
                <div style={{paddingLeft: '10px'}}>
                  {temperatureC > 0 && (
                    <h5> is {temperatureC.toFixed()} Degrees Fahrenheit</h5>
                  )}
                </div>
              </Form.Group>
              )}
              {recipe.steps && recipe.steps.flat().join('').includes('Fahrenheit' || 'fahrenheit' || ' F ') && (
              <Form.Group as={Row} controlId='fahrenheitToCelsius' style={{ marginBottom: '0px' }}>
                <h5 style= {{ marginRight: '5px' }}>Fahrenheit:</h5>
                <Form.Control
                    style={{ paddingLeft: '3px', paddingRight: '3px', paddingTop: '9px', paddingBottom: '8px', width: '80px', height: '12px'}}
                    type='number'
                    step={5}
                    onChange={(e) => setTemperatureF((eval(e.target.value) - 32) * 5 / 9 )}
                  >
                </Form.Control>
                <div style={{paddingLeft: '10px'}}>
                  {temperatureF > 0 && (
                    <h5> is {temperatureF.toFixed()} Degrees Celsius</h5>
                  )}
                </div>
              </Form.Group>
              )}
            </Col>
            <Col style={{ paddingTop: '15px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Row>
                <Col xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                  <Form onSubmit={saveIngredientsHandler}>
                    <Form.Group as={Row} style={{height: '24px', marginBottom: '8px'}}>
                      <Form.Label>
                        <h4 style={{paddingLeft: '0px', textAlign: 'center'}}>Ingredients</h4>
                      </Form.Label>
                      <OverlayTrigger
                        placement='top'
                        overlay={
                          <Tooltip id={'tooltip-top'}>
                            Add ingredients to grocery list
                          </Tooltip>
                        }
                      >
                      <Button
                        variant='link'
                        style={{ padding: 0, height: '0px'}}
                        type='submit'
                        onClick={(e) => setSaveIngredients('')}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <FaFileDownload style={{ marginLeft: '5px'}}/>
                      </Button>
                      </OverlayTrigger>
                    </Form.Group>
                  </Form>
                </Col>

              </Row>
              <ul>
                {finalClean && finalClean.map((obj) => (
                  <li>{obj}</li>
                ))}
              </ul>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ paddingLeft: '0px', paddingTop: '15px' }}>
              <h4 style={{paddingLeft: '0px', textAlign: 'center'}}>Steps</h4>
              <ol>
                {recipe.steps && recipe.steps.map((step) => (
                  <li>{step}</li>
                ))}
              </ol>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'center', paddingBottom: '20px'}}>
              {recipe.notes && recipe.notes !== '' && (
                <div>
                  <h4>Recipe Notes</h4>
                  <p>{recipe.notes}</p>
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
