import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyRecipes,
  createRecipe,
  deleteRecipe,
} from '../../actions/recipeActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';

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

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

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
        {initialLoader ?  (
          <PancakeLoader>Collecting all of your recipes...</PancakeLoader>
        ) : (
          <Row>
            <Col style={{textAlign:'center'}} xs={12} sm={12} md={8} lg={8} xl={8}>
              <h1>My Recipes</h1>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xl={4} style={{ textAlign: 'center', paddingBottom: '15px' }}>
              <Button style={{margin: '0px', padding: '4px' }} onClick={createRecipeHandler}>
                <i className='fas fa-plus'> Create a Recipe</i>
              </Button>
            </Col>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>RECIPE NAME</th>
                  <th>RATING</th>
                  <th>COUNTRY</th>
                  <th className='d-none d-md-table-cell'>COOK TIME</th>
                  <th className='d-none d-md-table-cell'>SERVING SIZE</th>
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
                      <td>
                        <Link to={`/recipe/${recipe._id}`} style={{textDecoration: 'none'}}>
                          {recipe.recipe_name}
                        </Link>
                      </td>
                      <td>{recipe.netVotes}</td>
                      <td>{recipe.country}</td>
                      <td className='d-none d-md-table-cell'>{recipe.cook_time}</td>
                      <td className='d-none d-md-table-cell'>{recipe.serving_size}</td>
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
          </Row>
        )}
      </div>
  )
}

export default ChefRecipesListPage;
