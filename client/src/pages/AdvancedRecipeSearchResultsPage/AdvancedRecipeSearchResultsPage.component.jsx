import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import FilterBtn from '../../components/FilterBtn/FilterBtn.component';
import { listAdvancedSearchRecipes } from '../../actions/recipeActions';

import AdvancedSearchPaginate from '../../components/AdvancedSearchPaginate/AdvancedSearchPaginate.component';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import Message from '../../components/Message/Message.component';

import './AdvancedRecipeSearchResultsPage.styles.css';

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

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }

  // Sorting variables
  const [netVotesSort, setNetVotesSort] = useState(
    localStorage.getItem('netVotesSortAdvLocalStorage') || ''
  )
  const [createdAtSort, setCreatedAtSort] = useState(
    localStorage.getItem('createdAtSortAdvLocalStorage') || -1
  )
  const [sortButtonLabel, setSortButtonLabel] = useState(
    localStorage.getItem('sortButtonLabelAdvLocalStorage') || 'Most Recent'
  )

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
    localStorage.setItem('createdAtSortAdvLocalStorage', createdAtSort)
    localStorage.setItem('netVotesSortAdvLocalStorage', netVotesSort)
    localStorage.setItem('sortButtonLabelAdvLocalStorage', sortButtonLabel)
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
    sortButtonLabel,
    pageNumber
  ])

  // const handleMostRecent = (e) => {
  //   e.preventDefault()
  //   //history.push('/recipes/page/1')
  //   setCreatedAtSort(-1)
  //   localStorage.setItem('createdAtSortAdvLocalStorage', -1)
  //   setNetVotesSort('')
  //   localStorage.setItem('netVotesSortAdvLocalStorage', '')
  //   setSortButtonLabel('Most Recent')
  //   localStorage.setItem('sortButtonLabelAdvLocalStorage', 'Most Recent')
  // }

  // const handleHighestRanking = (e) => {
  //   e.preventDefault()
  //   //history.push('/recipes/page/1')
  //   setNetVotesSort(-1)
  //   localStorage.setItem('netVotesSortAdvLocalStorage', -1)
  //   setCreatedAtSort('')
  //   localStorage.setItem('createdAtSortAdvLocalStorage', '')
  //   setSortButtonLabel('Highest Ranking')
  //   localStorage.setItem('sortButtonLabelAdvLocalStorage', 'Highest Ranking')
  // }

  // const handleLowestRanking = (e) => {
  //   e.preventDefault()
  //   //history.push('/recipes/page/1')
  //   setNetVotesSort(1)
  //   localStorage.setItem('netVotesSortAdvLocalStorage', 1)
  //   setCreatedAtSort('')
  //   localStorage.setItem('createdAtSortAdvLocalStorage', '')
  //   setSortButtonLabel('Lowest Ranking')
  //   localStorage.setItem('sortButtonLabelAdvLocalStorage', 'Lowest Ranking')
  // }

  return (
    <div className="advancedRecipeSearchResultsPageMobile" style={{paddingLeft: '30px', paddingRight: '30px'}}>
      {initialLoader ?  (
        <PancakeLoader>Finding recipes exactly how you like them...</PancakeLoader>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div style={{paddingLeft: '30px', display: 'block', marginRight: 'auto', marginLeft: '20px'}} className="advancedRecipeSearchResultsPageMobile2Div">
          <Row className="advancedRecipeSearchResultsPageMobileRow">
            {(recipes && recipes.length > 1) && (
              <Col xs={12} className="advancedRecipeSearchResultsSortButtonCol" style={{paddingBottom: '10px', textAlign: 'left'}}>
                <FilterBtn />
              </Col>
            )}
            {recipes && recipes.map((recipe) => (
              <Col className="advancedRecipeSearchResultsPageRecipeCardMobile" key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
            {(recipes.length === 0 && loading !== true) && (
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

            <Row className="advancedRecipeSearchResultsPageMobilePaginate">
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
