import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import { listRecipes } from '../../actions/recipeActions';
import Paginate from '../../components/Paginate/Paginate.component';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import Message from '../../components/Message/Message.component';

const HomeScreen = ({ match }) => {
  const keywordRecipeName = match.params.keywordRecipeName
  //const pageNumber = match.params.pageNumber || 1
  //const urlBaseRecipes = true

  // Sorting variables
  const [netVotesSort, setNetVotesSort] = useState('')
  const [createdAtSort, setCreatedAtSort] = useState(-1)
  const [sortButtonLabel, setSortButtonLabel] = useState('Most Recent')

  const dispatch = useDispatch()

  const recipeList = useSelector(state => state.recipeList)
  const { loading, error, recipes } = recipeList

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  // This is firing off the action to get products in state
  useEffect(() => {
    dispatch(listRecipes(keywordRecipeName, createdAtSort, netVotesSort))
  }, [dispatch, keywordRecipeName, createdAtSort, netVotesSort])

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }

  const handleMostRecent = (e) => {
    e.preventDefault()
    setCreatedAtSort(-1)
    setNetVotesSort('')
    setSortButtonLabel('Most Recent')
  }

  const handleHighestRanking = (e) => {
    e.preventDefault()
    setNetVotesSort(-1)
    setCreatedAtSort('')
    setSortButtonLabel('Highest Ranking')
  }

  const handleLowestRanking = (e) => {
    e.preventDefault()
    setNetVotesSort(1)
    setCreatedAtSort('')
    setSortButtonLabel('Lowest Ranking')
  }

  return (
    <div>
      {initialLoader ?  (
        <PancakeLoader>Finding yummy recipes...</PancakeLoader>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <Row style={{paddingBottom: '10px'}}>
            <Col md={9}>
              <h1>{sortButtonLabel} Recipes</h1>
            </Col>
            <Col md={3}>
              <DropdownButton style={{textAlign: 'right'}} id="dropdown-item-button" title={sortButtonLabel}>
                <Dropdown.Item as="button" onClick={handleMostRecent}>Most Recent</Dropdown.Item>
                <Dropdown.Item as="button" onClick={handleHighestRanking}>Highest Rated</Dropdown.Item>
                <Dropdown.Item as="button" onClick={handleLowestRanking}>Lowest Rated</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>

          <Row>
            {recipes && recipes.map((recipe) => (
              <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
            {(recipes === undefined || recipes.length == 0) && (
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

export default HomeScreen;
