import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import RecipeCardMobile from '../../components/RecipeCard/RecipeCardMobile.component';
import { 
  listRecipes, listHighestRatedRecipes, listMostRecentRecipes, listFiveIngredientsOrFewerRecipes,
} from '../../actions/recipeActions';
import Paginate from '../../components/Paginate/Paginate.component';

const AllRecipesPageMobile = ({ match, history }) => {

    const pageNumber = 1

    // Okay this is cool --- we are passing netVotesSortButton from the other page to this page
  // Then in our sorting variables, we see if it exists, if it does we use it, if not, nah!
  // We also need to change the button label to say we are sorting for the highest rated
  const location = useLocation()
  const { netVotesState } = location.state || { netVotesState: false }
  const { netVotesSortState } = location.state || { netVotesSortState: '' }
  const { createdAtState } = location.state || { createdAtState: false }
  const { createdAtSortState } = location.state || { createdAtSortState: '' }
  const { fiveIngredientsOrFewerRecipesState } = location.state || { fiveIngredientsOrFewerRecipesState: false}
  
  // Sorting variables
  const [netVotesSort, setNetVotesSort] = useState(
    netVotesSortState || localStorage.getItem('netVotesSortLocalStorage') || ''
  )
  const [createdAtSort, setCreatedAtSort] = useState(
    createdAtSortState || localStorage.getItem('createdAtSortLocalStorage') || -1
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

  const recipeListFiveIngredientsOrFewer = useSelector(state => state.recipeListFiveIngredientsOrFewer)
  const { 
    loading: loadingFiveIngredientsOrFewer, 
    error: errorFiveIngredientsOrFewer, 
    fiveIngredientsOrFewerRecipes: fiveIngredientsOrFewerRecipes, 
    pages: pagesFiveIngredientsOrFewer, 
    page: pageFiveIngredientsOrFewer,
  } = recipeListFiveIngredientsOrFewer

  // This is firing off the action to get products in state
  useEffect(() => {
    dispatch(listRecipes(createdAtSort, netVotesSort, pageNumber))
    dispatch(listMostRecentRecipes())
    dispatch(listHighestRatedRecipes())
    dispatch(listFiveIngredientsOrFewerRecipes())    
    localStorage.setItem('createdAtSortLocalStorage', createdAtSort)
    localStorage.setItem('netVotesSortLocalStorage', netVotesSort)
    localStorage.setItem('sortButtonLabelLocalStorage', sortButtonLabel)

  }, [
    dispatch,
    createdAtSort,
    createdAtSortState,
    netVotesSort,
    netVotesSortState,
    sortButtonLabel,
    fiveIngredientsOrFewerRecipesState,
    pageNumber
  ])

  const [initialLoader, setInitialLoader] = useState(true)
  if (loadingRecipeList !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }

  const handleMostRecent = (e) => {
    e.preventDefault()
    setCreatedAtSort(-1)
    localStorage.setItem('createdAtSortLocalStorage', -1)
    setNetVotesSort('')
    localStorage.setItem('netVotesSortLocalStorage', '')
    setSortButtonLabel('Most Recent')
    localStorage.setItem('sortButtonLabelLocalStorage', 'Most Recent')
  }

  const handleHighestRanking = (e) => {
    e.preventDefault()
    setNetVotesSort(-1)
    localStorage.setItem('netVotesSortLocalStorage', -1)
    setCreatedAtSort('')
    localStorage.setItem('createdAtSortLocalStorage', '')
    setSortButtonLabel('Highest Ranking')
    localStorage.setItem('sortButtonLabelLocalStorage', 'Highest Ranking')
  }

  const handleLowestRanking = (e) => {
    e.preventDefault()
    setNetVotesSort(1)
    localStorage.setItem('netVotesSortLocalStorage', 1)
    setCreatedAtSort('')
    localStorage.setItem('createdAtSortLocalStorage', '')
    setSortButtonLabel('Lowest Ranking')
    localStorage.setItem('sortButtonLabelLocalStorage', 'Lowest Ranking')
  }

    return (
        <div>
            <Row>
                  <Col xs={12} style={{textAlign: 'center'}}>
                    <div>
                        <DropdownButton id="dropdown-item-button" title={sortButtonLabel}>
                            <Dropdown.Item as="button" onClick={handleMostRecent}>Most Recent (UPDATE)</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleHighestRanking}>Highest Rated (UPDATE)</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLowestRanking}>Lowest Rated (UPDATE)</Dropdown.Item>
                        </DropdownButton>
                    </div>
                  </Col>
            </Row>
            <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {netVotesState === true && highestRatedRecipes && highestRatedRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
            </Row>
            <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {createdAtState === true && mostRecentRecipes && mostRecentRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
            </Row>
            <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {fiveIngredientsOrFewerRecipesState === true && fiveIngredientsOrFewerRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
            </Row>
            <Row style={{marginTop: '20px', marginBottom: '30px'}}>
                <Col xs={12}>
                  <Paginate
                    pages={pagesHighestRated}
                    page={pageHighestRated}
                  />
                </Col>
              </Row>
        </div>
    )

}

export default AllRecipesPageMobile