import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import { listAdvancedSearchRecipes } from '../../actions/recipeActions';
import Paginate from '../../components/Paginate/Paginate.component';


const AdvancedRecipeSearchResultsPage = ({ match }) => {

  const dispatch = useDispatch()

  const recipeListAdvancedSearch = useSelector(state => state.recipeListAdvancedSearch)
  const { loading, error, advancedSearchRecipes } = recipeListAdvancedSearch

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  // This is firing off the action to get products in state
  useEffect(() => {
    dispatch(listAdvancedSearchRecipes())
  }, [dispatch])

  return (
    <div>
      <h1>Custom Searched Recipes</h1>
      <div>
        <Row>
          {advancedSearchRecipes.map((recipe) => (
            <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default AdvancedRecipeSearchResultsPage;
