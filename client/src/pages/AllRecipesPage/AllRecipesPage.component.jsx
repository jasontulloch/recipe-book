import React, { useEffect, useState, Suspense } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import { 
  listRecipes, listHighestRatedRecipes, listMostRecentRecipes
} from '../../actions/recipeActions';

import Message from '../../components/Message/Message.component';
import InfiniteScrollLoader from '../../components/InfiniteScrollLoader/InfiniteScrollLoader.component';

import { isBrowser } from 'react-device-detect';
import './AllRecipesPage.styles.css';
import AllRecipesPageMobile from './AllRecipesPageMobile.component';
import { set } from 'mongoose';

const AllRecipesPage = ({ match, history }) => {

  // Okay this is cool --- we are passing netVotesSortButton from the other page to this page
  // Then in our sorting variables, we see if it exists, if it does we use it, if not, nah!
  // We also need to change the button label to say we are sorting for the highest rated
  const location = useLocation()
  const { allRecipesState } = location.state || { allRecipesState: false}
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

  console.log(location)

  const dispatch = useDispatch()

  // Lazy Loading!!!
  const [currentAllRecipesList, setCurrentAllRecipesList] = useState([]);
  const [currentCountryRecipesList, setCurrentCountryRecipesList] = useState([]);
  const [currentDietRecipesList, setCurrentDietRecipesList] = useState([]);
  const [currentAllerginRecipesList, setCurrentAllerginRecipesList] = useState([]);
  const [currentMealTypeRecipesList, setCurrentMealTypeRecipesList] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);

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
      if (true) {
        const result = await axios.get(`/api/recipes?pageNumber=${pageNumber}`)
        const data = await result.data.recipes
        setPages(result.data.pages)
        if (pageNumber > pages) return
        setCurrentAllRecipesList(() => {
          return [...currentAllRecipesList, ...data];
        });
        setPageNumber(pageNumber + 1)
      }
      if (countryName !== '') {
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
      {(isBrowser) ? (
            <div style={{paddingLeft: '200px', display: 'block', marginRight: 'auto', marginLeft: '20px'}} className="allRecipesPageMobile2Div">
                {countryName === '' && (
                  <Row>
                    {currentAllRecipesList && currentAllRecipesList.map((recipe) => (
                      <Col key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                        <Suspense fallback={<img src={recipe.recipe_cover_image} alt='Avatar' style={{ width: '50%' }} />}>
                          <RecipeCard recipe={recipe} />
                        </Suspense>
                      </Col>
                    ))}
                    <Col xs={12} style={{paddingLeft: '10px', paddingRight: '30px', paddingBottom: '30px', textAlign: 'center'}}>
                      <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                    </Col>
                  </Row>
                )}
                {countryName && (
                  <Row>
                    {currentCountryRecipesList && currentCountryRecipesList.map((recipe) => (
                      <Col key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                        <Suspense fallback={<img src={recipe.recipe_cover_image} alt='Avatar' style={{ width: '50%' }} />}>
                          <RecipeCard recipe={recipe} />
                        </Suspense>
                      </Col>
                    ))}
                    <Col xs={12} style={{paddingLeft: '10px', paddingRight: '30px', paddingBottom: '30px', textAlign: 'center'}}>
                      <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                    </Col>
                  </Row>
                )}
                {(isVegan || isVegetarian || isGlutenFree || isKetogenic || isPescatarian) && (
                  <Row>
                    {currentDietRecipesList && currentDietRecipesList.map((recipe) => (
                      <Col key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                        <Suspense fallback={<img src={recipe.recipe_cover_image} alt='Avatar' style={{ width: '50%' }} />}>
                          <RecipeCard recipe={recipe} />
                        </Suspense>
                      </Col>
                    ))}
                    <Col xs={12} style={{paddingLeft: '10px', paddingRight: '30px', paddingBottom: '30px', textAlign: 'center'}}>
                      <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                    </Col>
                  </Row>
                )}
                {(isDairy || isEgg || isNuts || isShellfish || isSoy || isWheat) && (
                  <Row>
                    {currentAllerginRecipesList && currentAllerginRecipesList.map((recipe) => (
                      <Col key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                        <Suspense fallback={<img src={recipe.recipe_cover_image} alt='Avatar' style={{ width: '50%' }} />}>
                          <RecipeCard recipe={recipe} />
                        </Suspense>
                      </Col>
                    ))}
                    <Col xs={12} style={{paddingLeft: '10px', paddingRight: '30px', paddingBottom: '30px', textAlign: 'center'}}>
                      <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                    </Col>
                  </Row>
                )}
                {(isBreakfastBrunch || isMainDish || isSideSauce || isDessert || isSnack || isAppetizer || isDrink) && (
                  <Row>
                    {currentMealTypeRecipesList && currentMealTypeRecipesList.map((recipe) => (
                      <Col key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                        <Suspense fallback={<img src={recipe.recipe_cover_image} alt='Avatar' style={{ width: '50%' }} />}>
                          <RecipeCard recipe={recipe} />
                        </Suspense>
                      </Col>
                    ))}
                    <Col xs={12} style={{paddingLeft: '10px', paddingRight: '30px', paddingBottom: '30px', textAlign: 'center'}}>
                      <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={false} />
                    </Col>
                  </Row>
                )}

            </div>
      ) : (
        <AllRecipesPageMobile />
      )}

    </div>

  )
}

export default AllRecipesPage;
