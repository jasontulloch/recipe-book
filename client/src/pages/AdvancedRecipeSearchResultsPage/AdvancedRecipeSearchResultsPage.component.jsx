import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import { listAdvancedSearchRecipes } from '../../actions/recipeActions';

import Paginate from '../../components/Paginate/Paginate.component';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import Message from '../../components/Message/Message.component';

const AdvancedRecipeSearchResultsPage = ({ match }) => {
  //This needs to match the route in the App.js file
  const keywordRecipeName = match.params.keywordRecipeName || ''
  const keywordCountry = match.params.keywordCountry || ''
  const keywordChefName = match.params.keywordChefName || ''
  const keywordCookTimeMin = match.params.keywordCookTimeMin || ''
  const keywordCookTimeMax = match.params.keywordCookTimeMax || ''
  const keywordIsVegan = match.params.keywordIsVegan || ''
  const keywordIsVegetarian = match.params.keywordIsVegetarian || ''
  const keywordIsGlutenFree = match.params.keywordIsGlutenFree || ''
  const keywordIsKetogenic = match.params.keywordIsKetogenic || ''
  const keywordIsDairy = match.params.keywordIsDairy || ''
  const keywordIsEgg = match.params.keywordIsEgg || ''
  const keywordIsNuts = match.params.keywordIsNuts || ''
  const keywordIsShellfish = match.params.keywordIsShellfish || ''
  const keywordIsSoy = match.params.keywordIsSoy || ''
  const keywordIsBreakfastBrunch = match.params.keywordIsBreakfastBrunch || ''
  const keywordIsMainDish = match.params.keywordIsMainDish || ''
  const keywordIsSideSauce = match.params.keywordIsSideSauce || ''
  const keywordIsDessert = match.params.keywordIsDessert || ''
  const keywordIsSnack = match.params.keywordIsSnack || ''
  const keywordIsAppetizer = match.params.keywordIsAppetizer || ''
  const keywordIsDrink = match.params.keywordIsDrink || ''
  const pageNumber = match.params.pageNumber || 1
  const urlBaseRecipes = true

  const dispatch = useDispatch()

  const recipeListAdvancedSearch = useSelector(state => state.recipeListAdvancedSearch)
  const { loading, error, recipes } = recipeListAdvancedSearch

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }

  //Now we need to account for keywords in the BE - first by updating actions
  useEffect(() => {
    dispatch(
      listAdvancedSearchRecipes(
        keywordRecipeName,
        keywordCountry,
        keywordChefName,
        keywordCookTimeMin,
        keywordCookTimeMax,
        keywordIsVegan,
        keywordIsVegetarian,
        keywordIsGlutenFree,
        keywordIsKetogenic,
        keywordIsDairy,
        keywordIsEgg,
        keywordIsNuts,
        keywordIsShellfish,
        keywordIsSoy,
        keywordIsBreakfastBrunch,
        keywordIsMainDish,
        keywordIsSideSauce,
        keywordIsDessert,
        keywordIsSnack,
        keywordIsAppetizer,
        keywordIsDrink
      )
    )
  }, [
    dispatch,
    keywordRecipeName,
    keywordCountry,
    keywordChefName,
    keywordCookTimeMin,
    keywordCookTimeMax,
    keywordIsVegan,
    keywordIsVegetarian,
    keywordIsGlutenFree,
    keywordIsKetogenic,
    keywordIsDairy,
    keywordIsEgg,
    keywordIsNuts,
    keywordIsShellfish,
    keywordIsSoy,
    keywordIsBreakfastBrunch,
    keywordIsMainDish,
    keywordIsSideSauce,
    keywordIsDessert,
    keywordIsSnack,
    keywordIsAppetizer,
    keywordIsDrink
  ])

  return (
    <div>
      {initialLoader ?  (
        <PancakeLoader>Finding recipes exactly how you like them...</PancakeLoader>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <h1>Custom Searched Recipes</h1>
          <Row>
            {recipes.recipes && recipes.recipes.map((recipe) => (
              <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
            {(recipes.recipes === undefined || recipes.recipes.length == 0) && (
              <Col style={{textAlign: 'center', paddingTop: '100px'}}>
                <p >Looks like we couldn't find any recipes, add your own or update your search!</p>
                <LinkContainer to={`/myrecipes`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-plus'>Add New Recipe</i>
                  </Button>
                </LinkContainer>
                <LinkContainer to={`/recipes/advanced-search`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-search'>New Search</i>
                  </Button>
                </LinkContainer>
              </Col>
            )}
          </Row>
        </div>
      )}
    </div>
  )
}

export default AdvancedRecipeSearchResultsPage;
