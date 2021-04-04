import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import { listAdvancedSearchRecipes } from '../../actions/recipeActions';

import AdvancedSearchPaginate from '../../components/AdvancedSearchPaginate/AdvancedSearchPaginate.component';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
//import SortButton from '../../components/SortButton/SortButton.component';
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
  const keywordIsPescatarian = match.params.keywordIsPescatarian || ''
  const keywordIsDairy = match.params.keywordIsDairy || ''
  const keywordIsEgg = match.params.keywordIsEgg || ''
  const keywordIsNuts = match.params.keywordIsNuts || ''
  const keywordIsShellfish = match.params.keywordIsShellfish || ''
  const keywordIsSoy = match.params.keywordIsSoy || ''
  const keywordIsWheat = match.params.keywordIsWheat || ''
  const keywordIsBreakfastBrunch = match.params.keywordIsBreakfastBrunch || ''
  const keywordIsMainDish = match.params.keywordIsMainDish || ''
  const keywordIsSideSauce = match.params.keywordIsSideSauce || ''
  const keywordIsDessert = match.params.keywordIsDessert || ''
  const keywordIsSnack = match.params.keywordIsSnack || ''
  const keywordIsAppetizer = match.params.keywordIsAppetizer || ''
  const keywordIsDrink = match.params.keywordIsDrink || ''
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const recipeListAdvancedSearch = useSelector(state => state.recipeListAdvancedSearch)
  const { loading, error, recipes, pages, page } = recipeListAdvancedSearch

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }

  const [netVotesSort, setNetVotesSort] = useState(-1)
  const [createdAtSort, setCreatedAtSort] = useState(-1)
  const [sortButtonLabel, setSortButtonLabel] = useState('Most Recent')

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
        keywordIsPescatarian,
        keywordIsDairy,
        keywordIsEgg,
        keywordIsNuts,
        keywordIsShellfish,
        keywordIsSoy,
        keywordIsWheat,
        keywordIsBreakfastBrunch,
        keywordIsMainDish,
        keywordIsSideSauce,
        keywordIsDessert,
        keywordIsSnack,
        keywordIsAppetizer,
        keywordIsDrink,
        netVotesSort,
        createdAtSort,
        pageNumber
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
    keywordIsPescatarian,
    keywordIsDairy,
    keywordIsEgg,
    keywordIsNuts,
    keywordIsShellfish,
    keywordIsSoy,
    keywordIsWheat,
    keywordIsBreakfastBrunch,
    keywordIsMainDish,
    keywordIsSideSauce,
    keywordIsDessert,
    keywordIsSnack,
    keywordIsAppetizer,
    keywordIsDrink,
    netVotesSort,
    createdAtSort,
    pageNumber
  ])

  const handleMostRecent = (e) => {
    e.preventDefault()
    setNetVotesSort('')
    setCreatedAtSort(-1)
    setSortButtonLabel('Most Recent')
  }

  const handleHighestRanking = (e) => {
    e.preventDefault()
    setCreatedAtSort(-1)
    setNetVotesSort(-1)
    setSortButtonLabel('Highest Ranking')
  }

  const handleLowestRanking = (e) => {
    e.preventDefault()
    setCreatedAtSort('')
    setNetVotesSort(1)
    setSortButtonLabel('Lowest Ranking')
  }

  return (
    <div>
      {initialLoader ?  (
        <PancakeLoader>Finding recipes exactly how you like them...</PancakeLoader>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <Row>
            <Col>
              <h1>Custom Searched Recipes</h1>
            </Col>
            {(recipes && recipes.length > 1) && (
            <Col xs={12} md={3} style={{paddingBottom: '10px'}}>
              <DropdownButton id="dropdown-item-button" title={sortButtonLabel}>
                <Dropdown.Item as="button" onClick={handleMostRecent}>Most Recent</Dropdown.Item>
                <Dropdown.Item as="button" onClick={handleHighestRanking}>Highest Rated</Dropdown.Item>
                <Dropdown.Item as="button" onClick={handleLowestRanking}>Lowest Rated</Dropdown.Item>
              </DropdownButton>
            </Col>
            )}
          </Row>
          <Row>
            {recipes && recipes.map((recipe) => (
              <Col key={recipe._id} xs={6} sm={6} md={4} lg={3} xl={3}>
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
            {(recipes === undefined && recipes.length == 0) && (
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

            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <AdvancedSearchPaginate
                  pages={pages}
                  page={page}
                  keywordCookTimeMax={keywordCookTimeMax ? keywordCookTimeMax : ''}
                  keywordCookTimeMin={keywordCookTimeMin ? keywordCookTimeMin : ''}
                  keywordRecipeName={keywordRecipeName ? keywordRecipeName : ''}
                  keywordCountry={keywordCountry ? keywordCountry : ''}
                  keywordIsVegan={keywordIsVegan ? keywordIsVegan : ''}
                  keywordIsVegetarian={keywordIsVegetarian ? keywordIsVegetarian : ''}
                  keywordIsGlutenFree={keywordIsGlutenFree ? keywordIsGlutenFree : ''}
                  keywordIsKetogenic={keywordIsKetogenic ? keywordIsKetogenic : ''}
                  keywordIsPescatarian={keywordIsPescatarian ? keywordIsPescatarian : ''}
                  keywordIsDairy={keywordIsDairy ? keywordIsDairy : ''}
                  keywordIsEgg={keywordIsEgg ? keywordIsEgg : ''}
                  keywordIsNuts={keywordIsNuts ? keywordIsNuts : ''}
                  keywordIsShellfish={keywordIsShellfish ? keywordIsShellfish : ''}
                  keywordIsSoy={keywordIsSoy ? keywordIsSoy : ''}
                  keywordIsWheat={keywordIsWheat ? keywordIsWheat : ''}
                  keywordIsBreakfastBrunch={keywordIsBreakfastBrunch ? keywordIsBreakfastBrunch : ''}
                  keywordIsMainDish={keywordIsMainDish ? keywordIsMainDish : ''}
                  keywordIsSideSauce={keywordIsSideSauce ? keywordIsSideSauce : ''}
                  keywordIsDessert={keywordIsDessert ? keywordIsDessert : ''}
                  keywordIsSnack={keywordIsSnack ? keywordIsSnack : ''}
                  keywordIsAppetizer={keywordIsAppetizer ? keywordIsAppetizer : ''}
                  keywordIsDrink={keywordIsDrink ? keywordIsDrink : ''}
                />
              </Col>
            </Row>

        </div>
      )}
    </div>
  )
}

export default AdvancedRecipeSearchResultsPage;
