import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listRecipeDetails,
  unsaveRecipe
} from '../../actions/recipeActions';
import { RECIPE_UNSAVE_RESET } from '../../constants/recipeConstants';

import { isMobile } from 'react-device-detect';

import './ChefSavedRecipesDeletePage.styles.css';

const ChefSavedRecipesListPage = ({ match , history }) => {

  const [unsave, setUnsave] = useState('')

  const dispatch = useDispatch()

  const recipeUnsave = useSelector(state => state.recipeUnsave)
  const {
    success: successRecipeUnsave
  } = recipeUnsave

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  useEffect(() => {
    if(!chefInfo) {
      history.push('/login')
    }

    if(isMobile) {
      history.push('/myfoods')
    }

    if(successRecipeUnsave) {
      alert('Recipe removed')
      setUnsave('')
      dispatch({ type: RECIPE_UNSAVE_RESET })
      history.push('/savedrecipes')
    }

    dispatch(listRecipeDetails(match.params.id))

  }, [
    dispatch,
    history,
    match,
    chefInfo,
    successRecipeUnsave
  ])

  const unsaveHandler = (e) => {
    e.preventDefault()
    dispatch(unsaveRecipe(match.params.id, {
      unsave
    }))
  }

  return (
      <div className="deleteSavedRecipeMobile" style={{paddingLeft: '40px', textAlign: 'center'}}>
        <Link className="btn btn-light my-3" to='/savedrecipes'>
          Go Back
        </Link>
        <Row className='align-items-center'>
          <Col>
            <h1>ARE YOU SURE YOU WANT TO UNSAVE THIS RECIPE?</h1>
          </Col>
        </Row>
        <Form onSubmit={unsaveHandler}>
          <Row>
            <Col></Col>
            <Col md='auto'>
              <Button
                variant='warning'
                type='submit'
                onClick={(e) => setUnsave('')}
              >
                YES PLEASE REMOVE
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Form>

      </div>
  )
}

export default ChefSavedRecipesListPage;
