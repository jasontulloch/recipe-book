import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import RecipeCardMobile from '../../components/RecipeCard/RecipeCardMobile.component';
import { 
  listRecipes, listHighestRatedRecipes, listMostRecentRecipes, listFiveIngredientsOrFewerRecipes, listTenIngredientsOrFewerRecipes,
  listFiveStepsOrFewerRecipes, listTenStepsOrFewerRecipes, listThirtyMinutesAndUnderRecipes, listSixtyMinutesAndUnderRecipes,
} from '../../actions/recipeActions';
import InfiniteScrollLoader from '../../components/InfiniteScrollLoader/InfiniteScrollLoader.component';
import { RiDownload2Line } from 'react-icons/ri';

const AllRecipesPageMobile = ({ match, history }) => {

  // Okay this is cool --- we are passing netVotesSortButton from the other page to this page
  // Then in our sorting variables, we see if it exists, if it does we use it, if not, nah!
  // We also need to change the button label to say we are sorting for the highest rated
  const location = useLocation()
  const { allRecipesState } = location.state || { allRecipes: false}
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
  const { nameRecipe } = location.state || { nameRecipe: ''}
  const { countryName } = location.state || { countryName: ''}
  const { isVegan } = location.state || { isVegan: '' }
  const { isVegetarian } = location.state || { isVegetarian: '' }
  const { isGlutenFree } = location.state || { isGlutenFree: '' }
  const { isKetogenic } = location.state || { isKetogenic: '' }
  const { isPescatarian } = location.state || { isPescatarian: '' }
  const { isDairy } = location.state || { isDairy: '' }
  const { isEgg } = location.state || { isEgg: '' }
  const { isNuts } = location.state || { isNuts: '' }
  const { isShellfish } = location.state || { isShellfish: '' }
  const { isSoy } = location.state || { isSoy: '' }
  const { isWheat } = location.state || { isWheat: '' }
  const { isBreakfastBrunch } = location.state || { isBreakfastBrunch: '' }
  const { isMainDish } = location.state || { isMainDish: '' }
  const { isSideSauce } = location.state || { isSideSauce: '' }
  const { isDessert } = location.state || { isDessert: '' }
  const { isSnack } = location.state || { isSnack: '' }
  const { isAppetizer } = location.state || { isAppetizer: '' }
  const { isDrink } = location.state || { isDrink: '' }
  
  // Lazy Loading!!!
  const [isFetching, setIsFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);

  const [currentAllRecipesList, setCurrentAllRecipesList] = useState([]);
  const [currentTopRecipesList, setCurrentTopRecipesList] = useState([]);
  const [currentMostRecentRecipesList, setCurrentMostRecentRecipesList] = useState([]);
  const [currentFiveIngredientsOrFewerRecipesList, setCurrentFiveIngredientsOrFewerRecipesList] = useState([]);
  const [currentTenIngredientsOrFewerRecipesList, setCurrentTenIngredientsOrFewerRecipesList] = useState([]);
  const [currentFiveStepsOrFewerRecipesList, setCurrentFiveStepsOrFewerRecipesList] = useState([]);
  const [currentTenStepsOrFewerRecipesList, setCurrentTenStepsOrFewerRecipesList] = useState([]);
  const [currentThirtyMinutesAndUnderRecipesList, setCurrentThirtyMinutesAndUnderRecipesList] = useState([]);
  const [currentSixtyMinutesAndUnderRecipesList, setCurrentSixtyMinutesAndUnderRecipesList] = useState([]);
  const [currentNameRecipesList, setCurrentNameRecipesList] = useState([]);
  const [currentCountryRecipesList, setCurrentCountryRecipesList] = useState([]);
  const [currentDietRecipesList, setCurrentDietRecipesList] = useState([]);
  const [currentAllerginRecipesList, setCurrentAllerginRecipesList] = useState([]);
  const [currentMealTypeRecipesList, setCurrentMealTypeRecipesList] = useState([]);

  useEffect(() => {
		fetchData();
		window.addEventListener('scroll', handleScroll);
	}, []);

	const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
	};

	const fetchData = async () => {
		setTimeout(async () => {
      if (allRecipesState) {
        const result = await axios.get(`/api/recipes?pageNumber=${pageNumber}`)
        const data = await result.data.recipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentAllRecipesList(() => {
          return [...currentAllRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (netVotesState) {
        const result = await axios.get(`/api/recipes/highestRatedRecipes?netVotesSort=${netVotesSortState}&pageNumber=${pageNumber}`)
        const data = await result.data.highestRatedRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentTopRecipesList(() => {
          return [...currentTopRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (createdAtState) {
        const result = await axios.get(`/api/recipes/mostRecentRecipes?createdAtSort=${createdAtState}&pageNumber=${pageNumber}`)
        const data = await result.data.mostRecentRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentMostRecentRecipesList(() => {
          return [...currentMostRecentRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (fiveIngredientsOrFewerRecipesState) {
        const result = await axios.get(`/api/recipes/fiveIngredientsOrFewerRecipes?netVotesSort=${netVotesSortState}&pageNumber=${pageNumber}`)
        const data = await result.data.fiveIngredientsOrFewerRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentFiveIngredientsOrFewerRecipesList(() => {
          return [...currentFiveIngredientsOrFewerRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (tenIngredientsOrFewerRecipesState) {
        const result = await axios.get(`/api/recipes/tenIngredientsOrFewerRecipes?netVotesSort=${netVotesSortState}&pageNumber=${pageNumber}`)
        const data = await result.data.tenIngredientsOrFewerRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentTenIngredientsOrFewerRecipesList(() => {
          return [...currentTenIngredientsOrFewerRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (fiveStepsOrFewerRecipesState) {
        const result = await axios.get(`/api/recipes/fiveStepsOrFewerRecipes?netVotesSort=${netVotesSortState}&pageNumber=${pageNumber}`)
        const data = await result.data.fiveStepsOrFewerRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentFiveStepsOrFewerRecipesList(() => {
          return [...currentFiveStepsOrFewerRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (tenStepsOrFewerRecipesState) {
        const result = await axios.get(`/api/recipes/tenStepsOrFewerRecipes?netVotesSort=${netVotesSortState}&pageNumber=${pageNumber}`)
        const data = await result.data.tenStepsOrFewerRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentTenStepsOrFewerRecipesList(() => {
          return [...currentTenStepsOrFewerRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (thirtyMinutesAndUnderRecipesState) {
        const result = await axios.get(`/api/recipes/thirtyMinutesAndUnderRecipes?netVotesSort=${netVotesSortState}&pageNumber=${pageNumber}`)
        const data = await result.data.thirtyMinutesAndUnderRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentThirtyMinutesAndUnderRecipesList(() => {
          return [...currentThirtyMinutesAndUnderRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (sixtyMinutesAndUnderRecipesState) {
        const result = await axios.get(`/api/recipes/sixtyMinutesAndUnderRecipes?netVotesSort=${netVotesSortState}&pageNumber=${pageNumber}`)
        const data = await result.data.sixtyMinutesAndUnderRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentSixtyMinutesAndUnderRecipesList(() => {
          return [...currentSixtyMinutesAndUnderRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (nameRecipe) {
        const result = await axios.get(`/api/recipes/nameRecipes?nameRecipe=${nameRecipe}&pageNumber=${pageNumber}`)
        const data = await result.data.nameRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentNameRecipesList(() => {
          return [...currentNameRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (countryName) {
        const result = await axios.get(`/api/recipes/countryRecipes?countryName=${countryName}&pageNumber=${pageNumber}`)
        const data = await result.data.countryRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentCountryRecipesList(() => {
          return [...currentCountryRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (isVegan || isVegetarian || isGlutenFree || isKetogenic || isPescatarian) {
        const result = await axios.get(`/api/recipes/dietRecipes?isVegan=${isVegan}&isVegetarian=${isVegetarian}&isGlutenFree=${isGlutenFree}&isKetogenic=${isKetogenic}&isPescatarian=${isPescatarian}&pageNumber=${pageNumber}`)
        const data = await result.data.dietRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentDietRecipesList(() => {
          return [...currentDietRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (isDairy || isEgg || isNuts || isShellfish || isSoy || isWheat) {
        const result = await axios.get(`/api/recipes/allerginRecipes?isDairy=${isDairy}&isEgg=${isEgg}&isNuts=${isNuts}&isShellfish=${isShellfish}&isSoy=${isSoy}&isWheat=${isWheat}&pageNumber=${pageNumber}`)
        const data = await result.data.allerginRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentAllerginRecipesList(() => {
          return [...currentAllerginRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (isBreakfastBrunch || isMainDish || isSideSauce || isDessert || isSnack || isAppetizer || isDrink) {
        const result = await axios.get(`/api/recipes/mealTypeRecipes?isBreakfastBrunch=${isBreakfastBrunch}&isMainDish=${isMainDish}&isSideSauce=${isSideSauce}&isDessert=${isDessert}&isSnack=${isSnack}&isAppetizer=${isAppetizer}&isDrink=${isDrink}&pageNumber=${pageNumber}`)
        const data = await result.data.mealTypeRecipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentMealTypeRecipesList(() => {
          return [...currentMealTypeRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
		}, 1000);
	};

	useEffect(() => {
		if (!isFetching) return;
      fetchMoreListItems()
	}, [isFetching]);

	const fetchMoreListItems = () => {
		fetchData();
		setIsFetching(false);
	};

    return (
        <div>
            {/* <Row>
              <Col xs={12} style={{textAlign: 'center'}}>
                <div>
                  <DropdownButton id="dropdown-item-button" title={sortButtonLabel}>
                    <Dropdown.Item as="button" onClick={handleMostRecent}>Most Recent (UPDATE)</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={handleHighestRanking}>Highest Rated (UPDATE)</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={handleLowestRanking}>Lowest Rated (UPDATE)</Dropdown.Item>
                  </DropdownButton>
                </div>
              </Col>
            </Row> */}
            {allRecipesState && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentAllRecipesList && currentAllRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}
            {netVotesState && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentTopRecipesList && currentTopRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}
            {createdAtState && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentMostRecentRecipesList && currentMostRecentRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}  
            {fiveIngredientsOrFewerRecipesState && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentFiveIngredientsOrFewerRecipesList && currentFiveIngredientsOrFewerRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}  
            {tenIngredientsOrFewerRecipesState && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentTenIngredientsOrFewerRecipesList && currentTenIngredientsOrFewerRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}
            {fiveStepsOrFewerRecipesState && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentFiveStepsOrFewerRecipesList && currentFiveStepsOrFewerRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}  
            {tenStepsOrFewerRecipesState && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentTenStepsOrFewerRecipesList && currentTenStepsOrFewerRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )} 
            {thirtyMinutesAndUnderRecipesState && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentThirtyMinutesAndUnderRecipesList && currentThirtyMinutesAndUnderRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )} 
            {sixtyMinutesAndUnderRecipesState && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentSixtyMinutesAndUnderRecipesList && currentSixtyMinutesAndUnderRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}   
            {nameRecipe && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentNameRecipesList && currentNameRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}
            {countryName && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentCountryRecipesList && currentCountryRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}
            {(isVegan || isVegetarian || isGlutenFree || isKetogenic || isPescatarian) && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentDietRecipesList && currentDietRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}  
            {(isDairy|| isEgg || isNuts || isShellfish || isSoy || isWheat) && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentAllerginRecipesList && currentAllerginRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}  
            {(isBreakfastBrunch || isMainDish || isSideSauce || isDessert || isSnack || isAppetizer || isDrink) && (
              <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
                {currentMealTypeRecipesList && currentMealTypeRecipesList.map((recipe) => (
                  <Col xs={6} key={recipe._id} style={{padding: '5px'}}>
                    <div>
                        <RecipeCardMobile recipe={recipe} />
                    </div>
                  </Col>
                ))}
                <Col xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                  <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                </Col>
              </Row>           
            )}                           
        </div>
    )

}

export default AllRecipesPageMobile