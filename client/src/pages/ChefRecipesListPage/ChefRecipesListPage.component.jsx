import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyRecipes,
  createRecipe,
  deleteRecipe,
} from '../../actions/recipeActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';

const ChefRecipesListPage = ({ match , history }) => {

  const dispatch = useDispatch()

  const recipeMyList = useSelector(state => state.recipeMyList)
  const { loading, error, myRecipes } = recipeMyList

  const recipeCreate = useSelector(state => state.recipeCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    recipe: createdRecipe,
  } = recipeCreate

  const recipeDelete = useSelector(state => state.recipeDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = recipeDelete

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  useEffect(() => {
    dispatch({ type: RECIPE_CREATE_RESET })

    if(!chefInfo) {
      history.push('/login')
    }

    if(successCreate) {
      history.push(`/myrecipes/${createdRecipe._id}/edit`)
    } else {
      dispatch(listMyRecipes())
    }
  }, [
    dispatch,
    history,
    chefInfo,
    successCreate,
    successDelete,
    createdRecipe
  ])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure? You can not undo this action.')) {
      dispatch(deleteRecipe(id))
    }
  }

  const createRecipeHandler = () => {
    dispatch(createRecipe())
  }

  return (
      <div>
        <Row className='align-items-center'>
          <Col>
            <h1>My Recipes</h1>
          </Col>
          <Col>
            <Button className='my-3' onClick={createRecipeHandler}>
              <i className='fas fa-plus'> Create a Recipe</i>
            </Button>
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
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {(myRecipes === undefined || myRecipes.length == 0) ? (
                <div></div>
              ) : (
                myRecipes.map(recipe => (
                  <tr key={recipe.id}>
                    <td>{recipe.recipe_name}</td>
                    <td>{recipe.netVotes}</td>
                    <td>{recipe.country}</td>
                    <td>{recipe.cook_time}</td>
                    <td>{recipe.serving_size}</td>
                    <td>
                      <LinkContainer to={`/myrecipes/${recipe._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(recipe._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )
            }
            </tbody>
          </Table>
        </div>
  )
}

export default ChefRecipesListPage;
