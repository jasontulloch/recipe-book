import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import RecipeCardImage from '../../components/RecipeCardImage/RecipeCardImage.component';
import { listAdvancedSearchRecipes } from '../../actions/recipeActions';
import Paginate from '../../components/Paginate/Paginate.component';


const AdvancedRecipeSearchResultsPage = ({ match }) => {
  //This needs to match the route in the App.js file
  const keywordRecipeName = match.params.keywordRecipeName || ''
  const keywordCountry = match.params.keywordCountry || ''
  const keywordChefName = match.params.keywordChefName || ''
  const pageNumber = match.params.pageNumber || 1
  const urlBaseRecipes = true

  const dispatch = useDispatch()

  const recipeListAdvancedSearch = useSelector(state => state.recipeListAdvancedSearch)
  const { loading, error, recipes } = recipeListAdvancedSearch

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  //Now we need to account for keywords in the BE - first by updating actions
  useEffect(() => {
    dispatch(listAdvancedSearchRecipes(keywordRecipeName, keywordCountry, keywordChefName ))
  }, [dispatch, keywordRecipeName, keywordCountry, keywordChefName ])

  return (
    <div>
      <h1>Custom Searched Recipes</h1>
        <Row>
          {recipes.recipes && recipes.recipes.map((recipe) => (
            <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
              <RecipeCardImage recipe={recipe} />
            </Col>
          ))}
        </Row>
    </div>
  )
}

export default AdvancedRecipeSearchResultsPage;
