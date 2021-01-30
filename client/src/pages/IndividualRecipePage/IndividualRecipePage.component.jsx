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

import './IndividualRecipePage.styles.scss';

const IndividualRecipePage = ({ history, match }) => {

  const [vote, setVote] = useState(0)
  const [save, setSave] = useState('')
  const [unsave, setUnsave] = useState('')

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

  return (
    <div>
      <Link className="btn btn-light my-3" to='/recipes'>
        Go Back
      </Link>
        <div>
          <Row>
            <Col md={6}>
              <Image src={recipe.recipe_cover_image} alt={recipe.recipe_name} fluid></Image>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{recipe.recipe_name}</h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>
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
    </div>
  )
}

export default IndividualRecipePage;
