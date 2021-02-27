import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const dispatch = useDispatch()

  const recipeDetails = useSelector(state => state.recipeDetails)
  const { loading, error, recipe } = recipeDetails

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
  const [showLikeBtn, setShowLikeBtn] = useState(doesVoteExist)

  let wasSaved = Boolean
  if (chefInfo.savedRecipes && recipe) {
    wasSaved = Boolean(chefInfo.savedRecipes.find(function(chefRecipe) {
      return chefRecipe._id === recipe._id
    }))
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

  // Function disables any negatives and 0
  // Still need to update to stop manual entry above 20
  function handleKeypress (e) {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === 0) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }

  // Build custom array of imperial standards based on whether chef wants to use them
  const imperialStandards = []
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

  // Build custom array of metric standards based on whether chef wants to use them
  const metricStandards = []
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
      eval(eval(ingredient[0]) / actualServingSize * servingSize)
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
  const mergeNew = merge.map(function(x){return x.replace('Item', '')})
  // Return array of only the recipe's items
  const itemArray = recipeIngredients.map((item) =>
    item[2]
  )
  // Merge quantities / measurement array w Item
  const final = mergeNew.map((e, i) => e + " " + itemArray[i])

  return (
    <div>
      {warningMessage !== '' && (
        <Message variant='danger'>{warningMessage}</Message>
      )}
      {successMessage !== '' && (
        <Message variant='success'>
          {successMessage}
          <Link to='/recipes' style={{ paddingTop: 0, paddingBottom: 0 }}>
            My Grocery List
          </Link>
        </Message>
      )}
      <Row>
        <Col md={10}>
          <Row style={{ height: '50px' }}>
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
                  <Button variant='link' style={{ marginRight: '12.25px', padding: 0, height: '30px'}} type='submit' onClick={(e) => setSave('')}>
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
                  <Button variant='link' style={{ marginRight: '12.25px', padding: 0, height: '30px'}} type='submit' onClick={(e) => setSave('')}>
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
                  <h1 style={{ marginLeft: '10px' }}>{recipe.recipe_name}</h1>
                </Form.Label>
                <Form.Label>
                  <p style={{ marginTop: '7px', marginLeft: '10px' }}>RATING | {recipe.netVotes}</p>
                </Form.Label>
                <OverlayTrigger
                  placement='right'
                  overlay={
                    <Tooltip id={'tooltip-right'}>
                      Upvote recipe... This will not save the recipe
                    </Tooltip>
                  }
                >
                  <Button variant='link' style={{ padding: 0, height: '30px'}} type='submit' onClick={(e) => setVote(1)}>
                    <FaThumbsUp style={{ marginLeft: '5px'}}/>
                  </Button>
                </OverlayTrigger>
              </Form.Group>
            </Form>
          ) : (
            <Form onSubmit={downvoteHandler}>
              <Form.Group as={Row}>
                <Form.Label>
                  <h1 style={{ marginLeft: '10px' }}>{recipe.recipe_name}</h1>
                </Form.Label>
                <Form.Label>
                  <p style={{ marginTop: '7px', marginLeft: '10px' }}>RATING | {recipe.netVotes}</p>
                </Form.Label>
                <OverlayTrigger
                  placement='right'
                  overlay={
                    <Tooltip id={'tooltip-right'}>
                      Downvote recipe
                    </Tooltip>
                  }
                >
                  <Button variant='link' style={{ padding: 0, height: '30px'}} type='submit' onClick={(e) => setVote(-1)}>
                    <FaThumbsDown style={{ marginLeft: '5px'}}/>
                  </Button>
                </OverlayTrigger>
              </Form.Group>
            </Form>
          )}
          </Row>
        </Col>
        <Col md={2}>
          <Link className="btn btn-light" to='/recipes' style={{ paddingTop: 0, paddingBottom: 0 }}>
            Go Back
          </Link>
        </Col>
      </Row>
      <Row style={{ height: '40px' }}>
        <Col md={4} className='fluid' style={{ paddingLeft: 0 }}>
          <h4>Cook Time: {time_convert(recipe.cook_time)}</h4>
        </Col>
        <Col md={4} className='fluid'>
          <Form.Group as={Row} controlId='cookTime'>
            <h4 style= {{ marginRight: '5px' }}>Serving Size:</h4>
            <Form.Control
                style={{ paddingLeft: '3px', paddingRight: '3px', paddingTop: '12px', width: '40px', height: '25px'}}
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
              style={{ padding: '5px', width: '40px', height: '25px'}}
              inline
              label='Metric?'
              checked={isMetric}
              onChange={(e) => setIsMetric(e.target.checked)}
            />
          </Form.Group>
        </Col>
        <Col md={4} style={{ paddingRight: 0 }}>
          <h4>Country: {recipe.country}</h4>
        </Col>
      </Row>
          <Row>
            <h4>
              {Diets.length > 0 && 'Diets: '}
              {new Intl.ListFormat().format(Diets)}
            </h4>
          </Row>
          <Row>
            <h4>
              {Allergins.length > 0 && 'Allergins: '}
              {new Intl.ListFormat().format(Allergins)}
            </h4>
          </Row>
          <Row style={{ paddingTop: '15px', textAlign: 'center' }}>
            <Col md={6}>
              <h4>Steps</h4>
            </Col>
            <Col md={6}>
              <Row style={{paddingLeft: '30%'}}>
                <h4>Ingredients</h4>
                <Form onSubmit={saveIngredientsHandler}>
                  <Form.Group>
                    <OverlayTrigger
                      placement='top'
                      overlay={
                        <Tooltip id={'tooltip-top'}>
                          Add ingredients to grocery list
                        </Tooltip>
                      }
                    >
                      <Button variant='link' style={{ padding: 0, height: '0px'}} type='submit' onClick={(e) => setSaveIngredients('')}>
                        <FaFileDownload style={{ marginLeft: '5px'}}/>
                      </Button>
                    </OverlayTrigger>
                  </Form.Group>
                </Form>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <ol>
                {recipe.steps && recipe.steps.map((step) => (
                  <li>{step}</li>
                ))}
              </ol>
            </Col>
            <Col md={6}>
              <ol>
                {final && final.map((obj) => (
                  <li>{obj}</li>
                ))}
              </ol>
            </Col>
          </Row>
          <Row>
            <Col md={12} style={{textAlign: 'center'}}>
              <RecipeImagesModal recipe={recipe}/>
            </Col>
          </Row>
    </div>
  )
}

export default IndividualRecipePage;
