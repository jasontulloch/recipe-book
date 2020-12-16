import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {
  listRecipeDetails,
  createRecipeUpvote,
  createRecipeDownvote,
  saveRecipe
} from '../../actions/recipeActions';
import { RECIPE_CREATE_UPVOTE_RESET } from '../../constants/recipeConstants';
import { RECIPE_CREATE_DOWNVOTE_RESET } from '../../constants/recipeConstants';
import { RECIPE_SAVE_RESET } from '../../constants/recipeConstants';

import './IndividualRecipePage.styles.scss';

const IndividualRecipePage = ({ history, match }) => {

  const [vote, setVote] = useState(0)
  const [save, setSave] = useState('')

  const dispatch = useDispatch()

  const recipeDetails = useSelector(state => state.recipeDetails)
  const { loading, error, recipe } = recipeDetails

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

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
      dispatch({ type: RECIPE_SAVE_RESET })
    }
    dispatch(listRecipeDetails(match.params.id))
  }, [dispatch, match, successRecipeUpvote, successRecipeDownvote, successRecipeSave])

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

  const saveHandler = (e) => {
    e.preventDefault()
    dispatch(saveRecipe(match.params.id, {
      save
    }))
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
              Click to save:
              <Form onSubmit={saveHandler}>
                <Button type='submit' onClick={(e) => setSave('')}>
                  <span className='upvote-btn'></span>
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default IndividualRecipePage;
