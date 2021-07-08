import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMySavedRecipes,
  unsaveRecipe
} from '../../actions/recipeActions';
import { RECIPE_UNSAVE_RESET } from '../../constants/recipeConstants';
import { BiInfoCircle } from 'react-icons/bi'
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';

import './ChefSavedRecipesListPage.styles.scss';

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

  return (
      <div className="chefSavedRecipesListPageMobile" style={{paddingLeft: '200px', paddingRight: '30px'}}>
        {initialLoader ?  (
          <PancakeLoader>Finding the recipes you already love...</PancakeLoader>
        ) : savedRecipes.length > 0 ? (
          <Row className="chefSavedRecipesMobileRow" style={{paddingLeft: '30px'}}>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>SAVED RECIPES</th>
                  <th>RATING</th>
                  <th>COUNTRY</th>
                  <th className='d-none d-md-table-cell'>COOK TIME</th>
                  <th className='d-none d-md-table-cell'>SERVING SIZE</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {savedRecipes.map(recipe => (
                  <tr key={recipe.id}>
                    <td>
                      <Link
                        to={`/recipe/${recipe._id}`}
                        style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {textDecoration: 'underline'}}>
                        {recipe.recipe_name}
                      </Link>
                      {recipe.isPublished === false && (
                        <OverlayTrigger
                          placement='bottom'
                          overlay={
                            <Tooltip id={'tooltip-bottom'}>
                              The chef has unpublished this recipe and appears to be making some edits!
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
        ) : (
          <Row>
            <Col style={{textAlign: 'center', paddingTop: '100px'}}>
              <p >Looks like you don't have any recipes saved yet, let's find you some!</p>
              <LinkContainer to={`/recipes`}>
                <Button variant='light' className='btn-sm'>
                  <i className='fas fa-search'>Explore all Recipes!</i>
                </Button>
              </LinkContainer>
              <LinkContainer to={`/recipes/advanced-search`}>
                <Button variant='light' className='btn-sm'>
                  <i className='fas fa-search'>Find the Exact Recipe you are Looking For!</i>
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        )}
      </div>
  )
}

export default ChefSavedRecipesListPage;
