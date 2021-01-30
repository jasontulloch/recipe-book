import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMySavedRecipes,
  unsaveRecipe
} from '../../actions/recipeActions';
import { RECIPE_UNSAVE_RESET } from '../../constants/recipeConstants';

const ChefSavedRecipesListPage = ({ match , history }) => {

  const [unsave, setUnsave] = useState('')

  const dispatch = useDispatch()

  const recipeMySaved = useSelector(state => state.recipeMySaved)
  const { loading, error, savedRecipes } = recipeMySaved

  const recipeUnsave = useSelector(state => state.recipeUnsave)
  const {
    success: successRecipeUnsave,
    error: errorRecipeUnsave
  } = recipeUnsave

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  useEffect(() => {
    if(!chefInfo) {
      history.push('/login')
    }

    if(successRecipeUnsave) {
      alert('Recipe removed')
      setUnsave('')
      dispatch({ type: RECIPE_UNSAVE_RESET })
    }

    dispatch(listMySavedRecipes())

  }, [
    dispatch,
    history,
    match,
    chefInfo,
    successRecipeUnsave
  ])

  const unsaveHandler = (e) => {
    e.preventDefault()
    dispatch(unsaveRecipe(unsave, {
      unsave
    }))
  }

  console.log(unsave)

  return (
      <div>
        <Row className='align-items-center'>
          <Col>
            <h1>Saved Recipes</h1>
          </Col>
        </Row>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>RECIPE NAME</th>
                <th>RATING</th>
                <th>COUNTRY</th>
                <th>COOK TIME</th>
                <th>SERVING SIZE</th>
                <th>VIEW</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {savedRecipes.map(recipe => (
                <tr key={recipe.id}>
                  <td>{recipe.recipe_name}</td>
                  <td>{recipe.netVotes}</td>
                  <td>{recipe.country}</td>
                  <td>{recipe.cook_time}</td>
                  <td>{recipe.serving_size}</td>
                  <td>
                    <LinkContainer to={`/recipe/${recipe._id}`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <LinkContainer to={`/savedrecipes/${recipe._id}`}>
                      <Button variant='danger' className='btn-sm'>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
  )
}

export default ChefSavedRecipesListPage;
