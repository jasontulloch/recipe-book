import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {
  listRecipeDetails,
  createRecipeUpvote,
  createRecipeDownvote,
  saveRecipe,
  unsaveRecipe,
} from '../../actions/recipeActions';
import { RECIPE_CREATE_UPVOTE_RESET } from '../../constants/recipeConstants';
import { RECIPE_CREATE_DOWNVOTE_RESET } from '../../constants/recipeConstants';
import { RECIPE_SAVE_RESET } from '../../constants/recipeConstants';
import { RECIPE_UNSAVE_RESET } from '../../constants/recipeConstants';

import Unitz from 'unitz'

import './IndividualRecipePage.styles.scss';

const IndividualRecipePage = ({ history, match }) => {

  const [vote, setVote] = useState(0)
  const [save, setSave] = useState('')
  const [unsave, setUnsave] = useState('')
  const [servingSize, setServingSize] = useState(4)

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

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  // Currently works but may need to go to a different recipe to reset Recipe ID
  // Appears to set to TRUE even if not the case when you leave
  // In the actual handlers, if there is an error they will toggle
  // Not the best solution but works overall
  const [isRecipeSaved, setIsRecipeSaved] = useState(
    Boolean(chefInfo.savedRecipes.find(function(chefRecipe) {
      return chefRecipe._id === recipe._id
    }))
  )

  useEffect(() => {
    if(successRecipeUpvote) {
      alert('Upvoted Casted')
      setVote(0)
      dispatch({ type: RECIPE_CREATE_UPVOTE_RESET })
    }
    if(successRecipeDownvote) {
      alert('Downvote Casted')
      setVote(0)
      dispatch({ type: RECIPE_CREATE_DOWNVOTE_RESET })
    }
    if(successRecipeSave) {
      alert('Recipe saved')
      setSave('')
      setIsRecipeSaved(true)
      dispatch({ type: RECIPE_SAVE_RESET })
    }
    if(successRecipeUnsave) {
      alert('Recipe removed')
      setUnsave('')
      setIsRecipeSaved(false)
      dispatch({ type: RECIPE_UNSAVE_RESET })
    }
    dispatch(listRecipeDetails(match.params.id))
  }, [
    dispatch,
    match,
    successRecipeUpvote,
    successRecipeDownvote,
    successRecipeSave,
    successRecipeUnsave
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
    if(errorRecipeSave) {
      setIsRecipeSaved(true)
    }
  }

  // If statemet is temporarily, just lets me click the button and if error will toggle to save
  const unsaveHandler = (e) => {
    e.preventDefault()
    dispatch(unsaveRecipe(match.params.id, {
      unsave
    }))
    if(errorRecipeUnsave) {
      setIsRecipeSaved(false)
    }
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

  console.log(servingSize)

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
  const merge = newIngredientAndMeasurementArray.map(e => Unitz.compound(e, ['gal', 'c', 'tbsp', 'tsp']))
  const mergeNew = merge.map(function(x){return x.replace('Item', '')})
  // Return array of only the recipe's items
  const itemArray = recipeIngredients.map((item) =>
    item[2]
  )
  // Merge quantities / measurement array w Item
  const final = mergeNew.map((e, i) => e + " " + itemArray[i])

  return (
    <div>
          <Row>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h1>{recipe.recipe_name}</h1>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Link className="btn btn-light my-3" to='/recipes'>
                    Go Back
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4} className='fluid'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>Cook Time: {time_convert(recipe.cook_time)}</h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4} className='fluid'>
              <Form.Group as={Row} controlId='cookTime'>
                <Form.Label column sm="8">
                  <h3>Serving Size:</h3>
                </Form.Label>
                <Col sm="4">
                  <Form.Control
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
                </Col>
              </Form.Group>
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>Country: {recipe.country}</h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>
                  {Diets.length > 0 && 'Diets: '}
                  {new Intl.ListFormat().format(Diets)}
                </h3>
              </ListGroup.Item>
            </ListGroup>
          </Row>
          <Row>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>
                  {Allergins.length > 0 && 'Allergins: '}
                  {new Intl.ListFormat().format(Allergins)}
                </h3>
              </ListGroup.Item>
            </ListGroup>
          </Row>
          <Row>
            <Col md={6} className=''>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>Steps</h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>Ingredients</h3>
                </ListGroup.Item>
              </ListGroup>
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
            <Col md={3}>
              Click to upvote:
              <Form onSubmit={upvoteHandler}>
                <Button type='submit' onClick={(e) => setVote(1)}>
                  <span className='upvote-btn'></span>
                </Button>
              </Form>
              Click to downvote:
              <Form onSubmit={downvoteHandler}>
                <Button type='submit' onClick={(e) => setVote(-1)}>
                  <span className='downvote-btn'></span>
                </Button>
              </Form>
              <h1>Ranking: {recipe.netVotes}</h1>
              {isRecipeSaved
              ? (
                <div>
                  <h1>Remove Saved Recipe:</h1>
                  <Form onSubmit={unsaveHandler}>
                    <Button type='submit' onClick={(e) => setUnsave('')}>
                      <span className='downvote-btn'></span>
                    </Button>
                  </Form>
                </div>
              ) : (
                <div>
                  <h1>Save Recipe:</h1>
                  <Form onSubmit={saveHandler}>
                    <Button type='submit' onClick={(e) => setSave('')}>
                      <span className='upvote-btn'></span>
                    </Button>
                  </Form>
                </div>
              )}
            </Col>
          </Row>
    </div>
  )
}

//<Image src={recipe.recipe_cover_image} alt={recipe.recipe_name} fluid></Image>

export default IndividualRecipePage;
