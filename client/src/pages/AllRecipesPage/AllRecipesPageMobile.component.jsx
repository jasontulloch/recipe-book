import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import RecipeCardMobile from '../../components/RecipeCard/RecipeCardMobile.component';
import { 
  listRecipes, listHighestRatedRecipes, listMostRecentRecipes, listFiveIngredientsOrFewerRecipes, listTenIngredientsOrFewerRecipes,
  listFiveStepsOrFewerRecipes, listTenStepsOrFewerRecipes, listThirtyMinutesAndUnderRecipes, listSixtyMinutesAndUnderRecipes,
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
  const { tenIngredientsOrFewerRecipesState } = location.state || { tenIngredientsOrFewerRecipesState: false}
  const { fiveStepsOrFewerRecipesState } = location.state || { fiveStepsOrFewerRecipesState: false}
  const { tenStepsOrFewerRecipesState } = location.state || { tenStepsOrFewerRecipesState: false}
  const { thirtyMinutesAndUnderRecipesState } = location.state || { thirtyMinutesAndUnderRecipesState: false}  
  const { sixtyMinutesAndUnderRecipesState } = location.state || { sixtyMinutesAndUnderRecipesState: false}  

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

  const recipeListTenIngredientsOrFewer = useSelector(state => state.recipeListTenIngredientsOrFewer)
  const { 
    loading: loadingTenIngredientsOrFewer, 
    error: errorTenIngredientsOrFewer, 
    tenIngredientsOrFewerRecipes: tenIngredientsOrFewerRecipes, 
    pages: pagesTenIngredientsOrFewer, 
    page: pageTenIngredientsOrFewer,
  } = recipeListTenIngredientsOrFewer

  const recipeListFiveStepsOrFewer = useSelector(state => state.recipeListFiveStepsOrFewer)
  const { 
    loading: loadingFiveStepsOrFewer, 
    error: errorFiveStepsOrFewer, 
    fiveStepsOrFewerRecipes: fiveStepsOrFewerRecipes, 
    pages: pagesFiveStepsOrFewer, 
    page: pageFiveStepsOrFewer,
  } = recipeListFiveStepsOrFewer

  const recipeListTenStepsOrFewer = useSelector(state => state.recipeListTenStepsOrFewer)
  const { 
    loading: loadingTenStepsOrFewer, 
    error: errorTenStepsOrFewer, 
    tenStepsOrFewerRecipes: tenStepsOrFewerRecipes, 
    pages: pagesTenStepsOrFewer, 
    page: pageTenStepsOrFewer,
  } = recipeListTenStepsOrFewer

  const recipeListThirtyMinutesAndUnder = useSelector(state => state.recipeListThirtyMinutesAndUnder)
  const { 
    loading: loadingThirtyMinutesAndUnder, 
    error: errorThirtyMinutesAndUnder, 
    thirtyMinutesAndUnderRecipes: thirtyMinutesAndUnderRecipes, 
    pages: pagesThirtyMinutesAndUnder, 
    page: pageThirtyMinutesAndUnder,
  } = recipeListThirtyMinutesAndUnder

  const recipeListSixtyMinutesAndUnder = useSelector(state => state.recipeListSixtyMinutesAndUnder)
  const { 
    loading: loadingSixtyMinutesAndUnder, 
    error: errorSixtyMinutesAndUnder, 
    sixtyMinutesAndUnderRecipes: sixtyMinutesAndUnderRecipes, 
    pages: pagesSixtyMinutesAndUnder, 
    page: pageSixtyMinutesAndUnder,
  } = recipeListSixtyMinutesAndUnder

  // This is firing off the action to get products in state
  useEffect(() => {
    dispatch(listRecipes(createdAtSort, netVotesSort, pageNumber))
    if(createdAtState === true) {
      dispatch(listMostRecentRecipes())
    }
    if(netVotesState === true) {
      dispatch(listHighestRatedRecipes())
    }
    if(fiveIngredientsOrFewerRecipesState === true) {
      dispatch(listFiveIngredientsOrFewerRecipes())  
    }
    if(tenIngredientsOrFewerRecipesState === true) {
      dispatch(listTenIngredientsOrFewerRecipes())
    }
    if(fiveStepsOrFewerRecipesState === true) {
      dispatch(listFiveStepsOrFewerRecipes()) 
    }
    if(tenStepsOrFewerRecipesState === true) {
      dispatch(listTenStepsOrFewerRecipes())   
    }  
    if(thirtyMinutesAndUnderRecipesState === true) {
      dispatch(listThirtyMinutesAndUnderRecipes())   
    } 
    if(sixtyMinutesAndUnderRecipesState === true) {
      dispatch(listSixtyMinutesAndUnderRecipes())   
    }
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
    tenIngredientsOrFewerRecipesState,
    fiveStepsOrFewerRecipesState,
    tenStepsOrFewerRecipesState,
    thirtyMinutesAndUnderRecipesState,
    sixtyMinutesAndUnderRecipesState,
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
            {netVotesState === true && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {highestRatedRecipes && highestRatedRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            {createdAtState === true && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {mostRecentRecipes && mostRecentRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            {fiveIngredientsOrFewerRecipesState === true && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {fiveIngredientsOrFewerRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            {tenIngredientsOrFewerRecipesState === true && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {tenIngredientsOrFewerRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            {fiveStepsOrFewerRecipesState === true && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {fiveStepsOrFewerRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            {tenStepsOrFewerRecipesState === true && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {tenStepsOrFewerRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            {thirtyMinutesAndUnderRecipesState === true && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {thirtyMinutesAndUnderRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            {sixtyMinutesAndUnderRecipesState === true && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {sixtyMinutesAndUnderRecipes.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
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