import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import { listRecipes } from '../../actions/recipeActions';
import Paginate from '../../components/Paginate/Paginate.component';


const HomeScreen = ({ match }) => {
  const keywordRecipeName = match.params.keywordRecipeName
  const pageNumber = match.params.pageNumber || 1
  const urlBaseRecipes = true

  const dispatch = useDispatch()

  const recipeList = useSelector(state => state.recipeList)
  const { loading, error, recipes, page, pages } = recipeList

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  // This is firing off the action to get products in state
  useEffect(() => {
    dispatch(listRecipes(keywordRecipeName, pageNumber))
  }, [dispatch, keywordRecipeName, pageNumber])

  console.log(match.params.keywordRecipeName)

  return (
    <div>
      <h1>Latest Recipes</h1>
      <div>
        <Row>
          {recipes.map((recipe) => (
            <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
        <Paginate
          urlBaseRecipes={urlBaseRecipes}
          pages={pages}
          page={page}
          keywordRecipeName={keywordRecipeName ? keywordRecipeName : ''}
        />
      </div>
    </div>
  )
}

export default HomeScreen;
