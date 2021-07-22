import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import { 
  listRecipes, listHighestRatedRecipes, listMostRecentRecipes
} from '../../actions/recipeActions';
import Paginate from '../../components/Paginate/Paginate.component';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import Message from '../../components/Message/Message.component';

import { isBrowser } from 'react-device-detect';
import './AllRecipesPage.styles.css';
import AllRecipesPageMobile from './AllRecipesPageMobile.component';

const AllRecipesPage = ({ match, history }) => {
  const keywordRecipeName = match.params.keywordRecipeName
  const pageNumber = match.params.pageNumber || 1
  const urlBaseRecipes = true

  // Okay this is cool --- we are passing netVotesSortButton from the other page to this page
  // Then in our sorting variables, we see if it exists, if it does we use it, if not, nah!
  // We also need to change the button label to say we are sorting for the highest rated
  const location = useLocation()
  const { netVotesSortState } = location.state || {netVotesSortState: '' }
  const { createdAtState } = location.state || {createdAtState: '' }

  // Sorting variables
  const [netVotesSort, setNetVotesSort] = useState(
    netVotesSortState || localStorage.getItem('netVotesSortLocalStorage') || ''
  )
  const [createdAtSort, setCreatedAtSort] = useState(
    createdAtState || localStorage.getItem('createdAtSortLocalStorage') || -1
  )
  const [sortButtonLabel, setSortButtonLabel] = useState(
    localStorage.getItem('sortButtonLabelLocalStorage') || 'Most Recent'
  )

  const dispatch = useDispatch()

  const recipeList = useSelector(state => state.recipeList)
  const { 
    loading: loadingRecipeList, 
    error: errorRecipeList, 
    recipes: recipesRecipeList, 
    pages: pagesRecipeList, 
    page: pageRecipeList 
  } = recipeList

  const recipeListMostRecent = useSelector(state => state.recipeListMostRecent)
  const { 
    loading: loadingMostRecent, 
    error: errorMostRecent, 
    mostRecentRecipes: mostRecentRecipes, 
    pages: pagesMostRecent, 
    page: pageMostRecent,
  } = recipeListMostRecent

  const recipeListHighestRated = useSelector(state => state.recipeListHighestRated)
  const { 
    loading: loadingHighestRated, 
    error: errorHighestRated, 
    highestRatedRecipes: highestRatedRecipes, 
    pages: pagesHighestRated, 
    page: pageHighestRated,
  } = recipeListHighestRated

  // This is firing off the action to get products in state
  useEffect(() => {
    dispatch(listRecipes(keywordRecipeName, createdAtSort, netVotesSort, pageNumber))
    if(createdAtState === -1) {
      dispatch(listMostRecentRecipes())
    }
    if(netVotesSortState === -1) {
      dispatch(listHighestRatedRecipes())
    }
    localStorage.setItem('createdAtSortLocalStorage', createdAtSort)
    localStorage.setItem('netVotesSortLocalStorage', netVotesSort)
    localStorage.setItem('sortButtonLabelLocalStorage', sortButtonLabel)

  }, [
    dispatch,
    keywordRecipeName,
    createdAtSort,
    createdAtState,
    netVotesSort,
    netVotesSortState,
    sortButtonLabel,
    pageNumber
  ])

  const [initialLoader, setInitialLoader] = useState(true)
  if (loadingRecipeList !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }

  const handleMostRecent = (e) => {
    e.preventDefault()
    history.push('/recipes/page/1')
    setCreatedAtSort(-1)
    localStorage.setItem('createdAtSortLocalStorage', -1)
    setNetVotesSort('')
    localStorage.setItem('netVotesSortLocalStorage', '')
    setSortButtonLabel('Most Recent')
    localStorage.setItem('sortButtonLabelLocalStorage', 'Most Recent')
  }

  const handleHighestRanking = (e) => {
    e.preventDefault()
    history.push('/recipes/page/1')
    setNetVotesSort(-1)
    localStorage.setItem('netVotesSortLocalStorage', -1)
    setCreatedAtSort('')
    localStorage.setItem('createdAtSortLocalStorage', '')
    setSortButtonLabel('Highest Ranking')
    localStorage.setItem('sortButtonLabelLocalStorage', 'Highest Ranking')
  }

  const handleLowestRanking = (e) => {
    e.preventDefault()
    history.push('/recipes/page/1')
    setNetVotesSort(1)
    localStorage.setItem('netVotesSortLocalStorage', 1)
    setCreatedAtSort('')
    localStorage.setItem('createdAtSortLocalStorage', '')
    setSortButtonLabel('Lowest Ranking')
    localStorage.setItem('sortButtonLabelLocalStorage', 'Lowest Ranking')
  }

  return (
    <div>
      {(isBrowser) ? (
        <div>
          {initialLoader ?  (
            <PancakeLoader className="allRecipesPagePancakeMobile">Finding yummy recipes...</PancakeLoader>
          ) : errorRecipeList ? (
            <Message>{errorRecipeList}</Message>
          ) : (
            <div style={{paddingLeft: '200px', display: 'block', marginRight: 'auto', marginLeft: '20px'}} className="allRecipesPageMobile2Div">
              <Row className="allRecipesPageMobileRow">
                {((highestRatedRecipes && highestRatedRecipes.length > 1) || (mostRecentRecipes && mostRecentRecipes.length > 1)) && (
                  <Col className="allRecipesSortButtonCol" xs={12} style={{paddingBottom: '10px', textAlign: 'left'}}>
                    <DropdownButton id="dropdown-item-button" title={sortButtonLabel}>
                      <Dropdown.Item as="button" onClick={handleMostRecent}>Most Recent</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={handleHighestRanking}>Highest Rated</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={handleLowestRanking}>Lowest Rated</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                )}
                {netVotesSortState === -1 && highestRatedRecipes.length > 1 && highestRatedRecipes.map((recipe) => (
                  <Col className="allRecipesPageRecipeCardMobile" key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                    <RecipeCard recipe={recipe} />
                  </Col>
                ))}
                {createdAtState === -1 && mostRecentRecipes.length > 1 && mostRecentRecipes.map((recipe) => (
                  <Col className="allRecipesPageRecipeCardMobile" key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                    <RecipeCard recipe={recipe} />
                  </Col>
                ))}
                {createdAtState !== -1 && netVotesSortState !== -1 && recipesRecipeList.map((recipe) => (
                  <Col className="allRecipesPageRecipeCardMobile" key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                    <RecipeCard recipe={recipe} />
                  </Col>
                ))}
                {(mostRecentRecipes.length === 0 && highestRatedRecipes.length === 0) && (
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
              <Row className="allRecipesPageMobilePaginate">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Paginate
                    pages={pagesRecipeList}
                    page={pageRecipeList}
                    keywordRecipeName={keywordRecipeName ? keywordRecipeName : ''}
                    urlBaseRecipes={urlBaseRecipes}
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      ) : (
        <AllRecipesPageMobile />
      )}
    </div>
  )
}

export default AllRecipesPage;
