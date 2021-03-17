import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMySavedRecipes,
  unsaveRecipe
} from '../../actions/recipeActions';
import { RECIPE_UNSAVE_RESET } from '../../constants/recipeConstants';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';

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

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

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
        {initialLoader ?  (
          <PancakeLoader>Finding the recipes you already love...</PancakeLoader>
        ) : (
          <Row>
            <Col style={{textAlign:'center'}} xs={12} sm={12} md={12} lg={12} xl={12}>
              <h1>Saved Recipes</h1>
            </Col>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>RECIPE NAME</th>
                  <th>RATING</th>
                  <th>COUNTRY</th>
                  <th className='d-none d-md-table-cell'>COOK TIME</th>
                  <th className='d-none d-md-table-cell'>SERVING SIZE</th>
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
                    <td className='d-none d-md-table-cell'>{recipe.cook_time}</td>
                    <td className='d-none d-md-table-cell'>{recipe.serving_size}</td>
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
          </Row>
        )}
      </div>
  )
}

export default ChefSavedRecipesListPage;
