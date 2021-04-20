import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyRecipes,
  createRecipe,
  deleteRecipe,
} from '../../actions/recipeActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';
import { BiInfoCircle } from 'react-icons/bi'
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
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', paddingBottom: '15px' }}>
              <Button
                style={{margin: '5px', padding: '15px', width: '100%', backgroundColor: '#343a40' }}
                onClick={createRecipeHandler}
                variant='outline-success'
              >
                <i className='fas fa-plus'> Create a Recipe</i>
              </Button>
            </Col>
            <Table striped bordered hover responsive className='table-sm' style={{marginLeft: '10px'}}>
              <thead>
                <tr>
                  <th>MY RECIPES</th>
                  <th>RATING</th>
                  <th>COUNTRY</th>
                  <th className='d-none d-md-table-cell'>COOK TIME</th>
                  <th className='d-none d-md-table-cell'>SERVING SIZE</th>
                  <th>PUBLISHED?</th>
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
                        <Link
                          to={`/recipe/${recipe._id}`}
                          style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {textDecoration: 'none'}}>
                          {recipe.recipe_name}
                        </Link>
                        {recipe.isPublished === false && (
                          <OverlayTrigger
                            placement='bottom'
                            overlay={
                              <Tooltip id={'tooltip-bottom'}>
                                You need to publish the recipe to view it!
                              </Tooltip>
                            }
                          >
                            <span><BiInfoCircle /></span>
                          </OverlayTrigger>
                        )}
                      </td>
                      <td>{recipe.netVotes}</td>
                      <td>{recipe.country}</td>
                      <td className='d-none d-md-table-cell'>{recipe.cook_time}</td>
                      <td className='d-none d-md-table-cell'>{recipe.serving_size}</td>
                      <td>
                        {recipe.isPublished === true ? (
                          <i className='fas fa-check'></i>
                        ): (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
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
