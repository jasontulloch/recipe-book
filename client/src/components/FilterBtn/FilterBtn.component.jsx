import React, { useState } from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import {
  OverlayTrigger,
  Popover,
  Button,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import Countries from '../../lists/countries';

const FilterBtn = () => {

  const { params } = useRouteMatch()

  const [keywordRecipeName, setKeywordRecipeName] = useState(params.keywordRecipeName || '')
  const [keywordCountry, setKeywordCountry] = useState(params.keywordCountry || '')
  const [keywordIsVegan, setKeywordIsVegan] = useState(false)
  const [keywordIsVegetarian, setKeywordIsVegetarian] = useState(false)
  const [keywordIsGlutenFree, setKeywordIsGlutenFree] = useState(false)
  const [keywordIsKetogenic, setKeywordIsKetogenic] = useState(false)
  const [keywordIsPescatarian, setKeywordIsPescatarian] = useState(false)
  const [keywordIsDairy, setKeywordIsDairy] = useState(false)
  const [keywordIsEgg, setKeywordIsEgg] = useState(false)
  const [keywordIsNuts, setKeywordIsNuts] = useState(false)
  const [keywordIsShellfish, setKeywordIsShellfish] = useState(false)
  const [keywordIsSoy, setKeywordIsSoy] = useState(false)
  const [keywordIsWheat, setKeywordIsWheat] = useState(false)
  const [keywordIsBreakfastBrunch, setKeywordIsBreakfastBrunch] = useState(false)
  const [keywordIsMainDish, setKeywordIsMainDish] = useState(false)
  const [keywordIsSideSauce, setKeywordIsSideSauce] = useState(false)
  const [keywordIsDessert, setKeywordIsDessert] = useState(false)
  const [keywordIsSnack, setKeywordIsSnack] = useState(false)
  const [keywordIsAppetizer, setKeywordIsAppetizer] = useState(false)
  const [keywordIsDrink, setKeywordIsDrink] = useState(false)

  const [recipeFilter, setRecipeFilter] = useState([
    {keyword: 'keywordRecipeName', defaultState: ''},
    {keyword: 'keywordCountry', defaultState: ''},
    {keyword: 'keywordIsVegan', defaultState: false},
    {keyword: 'keywordIsVegetarian', defaultState: false},
    {keyword: 'keywordIsGlutenFree', defaultState: false},
    {keyword: 'keywordIsKetogenic', defaultState: false},
    {keyword: 'keywordIsPescatarian', defaultState: false},
    {keyword: 'keywordIsDairy', defaultState: false},
    {keyword: 'keywordIsEgg', defaultState: false},
    {keyword: 'keywordIsNuts', defaultState: false},
    {keyword: 'keywordIsShellfish', defaultState: false},
    {keyword: 'keywordIsSoy', defaultState: false},
    {keyword: 'keywordIsWheat', defaultState: false},
    {keyword: 'keywordIsBreakfastBrunch', defaultState: false},
    {keyword: 'keywordIsMainDish', defaultState: false},
    {keyword: 'keywordIsSideSauce', defaultState: false},
    {keyword: 'keywordIsDessert', defaultState: false},
    {keyword: 'keywordIsSnack', defaultState: false},
    {keyword: 'keywordIsAppetizer', defaultState: false},
    {keyword: 'keywordIsDrink', defaultState: false}
  ])

  //console.log(path)
  //console.log(url)
  //console.log(useRouteMatch())
  //console.log(recipeFilter)
  //console.log(keywordIsVegan)
  console.log(params.keywordRecipeName)

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

  const handleMostRecent = (e) => {
    e.preventDefault()
    //history.push('/recipes/page/1')
    setCreatedAtSort(-1)
    localStorage.setItem('createdAtSortAdvLocalStorage', -1)
    setNetVotesSort('')
    localStorage.setItem('netVotesSortAdvLocalStorage', '')
    setSortButtonLabel('Most Recent')
    localStorage.setItem('sortButtonLabelAdvLocalStorage', 'Most Recent')
  }

  const handleHighestRanking = (e) => {
    e.preventDefault()
    //history.push('/recipes/page/1')
    setNetVotesSort(-1)
    localStorage.setItem('netVotesSortAdvLocalStorage', -1)
    setCreatedAtSort('')
    localStorage.setItem('createdAtSortAdvLocalStorage', '')
    setSortButtonLabel('Highest Ranking')
    localStorage.setItem('sortButtonLabelAdvLocalStorage', 'Highest Ranking')
  }

  const handleLowestRanking = (e) => {
    e.preventDefault()
    //history.push('/recipes/page/1')
    setNetVotesSort(1)
    localStorage.setItem('netVotesSortAdvLocalStorage', 1)
    setCreatedAtSort('')
    localStorage.setItem('createdAtSortAdvLocalStorage', '')
    setSortButtonLabel('Lowest Ranking')
    localStorage.setItem('sortButtonLabelAdvLocalStorage', 'Lowest Ranking')
  }

  const recipeNameFilterHandler = (e) => {
    setKeywordRecipeName(e.target.value)
    if (e.target.value !== '') {
      recipeFilter[0] = {keyword: 'keywordRecipeName', defaultState: true, urlString: e.target.value}
    } else {
      recipeFilter[0] = {keyword: 'keywordRecipeName', defaultState: false, urlString: ''}
    }
  }
  const countryFilterHandler = (e) => {
    setKeywordCountry(e.target.value)
    if (e.target.value !== '') {
      recipeFilter[1] = {keyword: 'keywordCountry', defaultState: true, urlString: e.target.value}
    } else {
      recipeFilter[1] = {keyword: 'keywordCountry', defaultState: false, urlString: ''}
    }
  }
  const veganFilterHandler = (e) => {
    setKeywordIsVegan(e.target.checked)
    if (keywordIsVegan === false) {
      recipeFilter[2] = {keyword: 'keywordIsVegan', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[2] = {keyword: 'keywordIsVegan', defaultState: false, urlString: 'false'}
    }
  }
  const vegetarianFilterHandler = (e) => {
    setKeywordIsVegetarian(e.target.checked)
    if (keywordIsVegetarian === false) {
      recipeFilter[3] = {keyword: 'keywordIsVegetarian', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[3] = {keyword: 'keywordIsVegetarian', defaultState: false, urlString: 'false'}
    }
  }
  const glutenFreeFilterHandler = (e) => {
    setKeywordIsGlutenFree(e.target.checked)
    if (keywordIsGlutenFree === false) {
      recipeFilter[4] = {keyword: 'keywordIsGlutenFree', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[4] = {keyword: 'keywordIsGlutenFree', defaultState: false, urlString: 'false'}
    }
  }
  const ketogenicFilterHandler = (e) => {
    setKeywordIsKetogenic(e.target.checked)
    if (keywordIsKetogenic === false) {
      recipeFilter[5] = {keyword: 'keywordIsKetogenic', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[5] = {keyword: 'keywordIsKetogenic', defaultState: false, urlString: 'false'}
    }
  }
  const pescatarianFilterHandler = (e) => {
    setKeywordIsPescatarian(e.target.checked)
    if (keywordIsPescatarian === false) {
      recipeFilter[6] = {keyword: 'keywordIsPescatarian', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[6] = {keyword: 'keywordIsPescatarian', defaultState: false, urlString: 'false'}
    }
  }
  const dairyFilterHandler = (e) => {
    setKeywordIsDairy(e.target.checked)
    if (keywordIsDairy === false) {
      recipeFilter[7] = {keyword: 'keywordIsDairy', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[7] = {keyword: 'keywordIsDairy', defaultState: false, urlString: 'false'}
    }
  }
  const eggFilterHandler = (e) => {
    setKeywordIsEgg(e.target.checked)
    if (keywordIsEgg === false) {
      recipeFilter[8] = {keyword: 'keywordIsEgg', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[8] = {keyword: 'keywordIsEgg', defaultState: false, urlString: 'false'}
    }
  }
  const nutsFilterHandler = (e) => {
    setKeywordIsNuts(e.target.checked)
    if (keywordIsNuts === false) {
      recipeFilter[9] = {keyword: 'keywordIsNuts', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[9] = {keyword: 'keywordIsNuts', defaultState: false, urlString: 'false'}
    }
  }
  const shellfishFilterHandler = (e) => {
    setKeywordIsShellfish(e.target.checked)
    if (keywordIsShellfish === false) {
      recipeFilter[10] = {keyword: 'keywordIsShellfish', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[10] = {keyword: 'keywordIsShellfish', defaultState: false, urlString: 'false'}
    }
  }
  const soyFilterHandler = (e) => {
    setKeywordIsSoy(e.target.checked)
    if (keywordIsSoy === false) {
      recipeFilter[11] = {keyword: 'keywordIsSoy', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[11] = {keyword: 'keywordIsSoy', defaultState: false, urlString: 'false'}
    }
  }
  const wheatFilterHandler = (e) => {
    setKeywordIsWheat(e.target.checked)
    if (keywordIsWheat === false) {
      recipeFilter[12] = {keyword: 'keywordIsWheat', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[12] = {keyword: 'keywordIsWheat', defaultState: false, urlString: 'false'}
    }
  }
  const breakfastBrunchFilterHandler = (e) => {
    setKeywordIsBreakfastBrunch(e.target.checked)
    if (keywordIsBreakfastBrunch === false) {
      recipeFilter[13] = {keyword: 'keywordIsBreakfastBrunch', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[13] = {keyword: 'keywordIsBreakfastBrunch', defaultState: false, urlString: 'false'}
    }
  }
  const mainDishFilterHandler = (e) => {
    setKeywordIsMainDish(e.target.checked)
    if (keywordIsMainDish === false) {
      recipeFilter[14] = {keyword: 'keywordIsMainDish', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[14] = {keyword: 'keywordIsMainDish', defaultState: false, urlString: 'false'}
    }
  }
  const sideSauceFilterHandler = (e) => {
    setKeywordIsSideSauce(e.target.checked)
    if (keywordIsSideSauce === false) {
      recipeFilter[15] = {keyword: 'keywordIsSideSauce', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[15] = {keyword: 'keywordIsSideSauce', defaultState: false, urlString: 'false'}
    }
  }
  const dessertFilterHandler = (e) => {
    setKeywordIsDessert(e.target.checked)
    if (keywordIsDessert === false) {
      recipeFilter[16] = {keyword: 'keywordIsDessert', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[16] = {keyword: 'keywordIsDessert', defaultState: false, urlString: 'false'}
    }
  }
  const snackFilterHandler = (e) => {
    setKeywordIsSnack(e.target.checked)
    if (keywordIsSnack === false) {
      recipeFilter[17] = {keyword: 'keywordIsSnack', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[17] = {keyword: 'keywordIsSnack', defaultState: false, urlString: 'false'}
    }
  }
  const appetizerFilterHandler = (e) => {
    setKeywordIsAppetizer(e.target.checked)
    if (keywordIsAppetizer === false) {
      recipeFilter[18] = {keyword: 'keywordIsAppetizer', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[18] = {keyword: 'keywordIsAppetizer', defaultState: false, urlString: 'false'}
    }
  }
  const drinkFilterHandler = (e) => {
    setKeywordIsDrink(e.target.checked)
    if (keywordIsDrink === false) {
      recipeFilter[19] = {keyword: 'keywordIsDrink', defaultState: true, urlString: 'true'}
    } else {
      recipeFilter[19] = {keyword: 'keywordIsDrink', defaultState: false, urlString: 'false'}
    }
  }

  let searchUrl = []
  const recipeFilterFinal = recipeFilter.filter(filterItem => filterItem.defaultState === true).map(filterItem => searchUrl.push('/' + filterItem.keyword + '=' + filterItem.urlString))

  return (
    <div>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id='popover-positioned-bottom' style={{maxWidth: '100vw', maxHeight: '5000px'}}>
            <Popover.Title as="h3">
              Advanced Filter
              <Link style={{marginLeft: '10px'}} to={`/recipes/advanced-search-results${searchUrl.join('')}/page/1`}>Search</Link>
            </Popover.Title>
            <Popover.Content>
              <Row>
                <Col xs={4}>
                  <Form.Label style={{display: 'block'}}>Diets</Form.Label>
                  <Form.Group controlId='isVegan' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Vegan recipes'
                      checked={keywordIsVegan}
                      onChange={veganFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isVegetarian' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Vegetarian recipes'
                      checked={keywordIsVegetarian}
                      onChange={vegetarianFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isGlutenFree' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Gluten-free recipes'
                      checked={keywordIsGlutenFree}
                      onChange={glutenFreeFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isKetogenic' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Ketogenic recipes'
                      onChange={ketogenicFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isPescatarian' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Pescatarian recipes'
                      checked={keywordIsPescatarian}
                      onChange={pescatarianFilterHandler}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Label style={{display: 'block'}}>Allergins</Form.Label>
                  <Form.Group controlId='isDairy' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Avoid Dairy'
                      checked={keywordIsDairy}
                      onChange={dairyFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isEgg' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Avoid Egg'
                      checked={keywordIsEgg}
                      onChange={eggFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isNuts' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Avoid Nuts'
                      checked={keywordIsNuts}
                      onChange={nutsFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isShellfish' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Avoid Shellfish'
                      checked={keywordIsShellfish}
                      onChange={shellfishFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isSoy' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Avoid Soy'
                      checked={keywordIsSoy}
                      onChange={soyFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isWheat' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Avoid Wheat'
                      checked={keywordIsWheat}
                      onChange={wheatFilterHandler}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Label style={{display: 'block'}}>Meal Course / Type</Form.Label>
                  <Form.Group controlId='isBreakfastBrunch' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Breakfast or Brunch'
                      checked={keywordIsBreakfastBrunch}
                      onChange={breakfastBrunchFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isMainDish' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Main Dish'
                      checked={keywordIsMainDish}
                      onChange={mainDishFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isSideSauce' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Side or Sauce'
                      checked={keywordIsSideSauce}
                      onChange={sideSauceFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isDessert' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Dessert'
                      checked={keywordIsDessert}
                      onChange={dessertFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isSnack' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Snack'
                      checked={keywordIsSnack}
                      onChange={snackFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isAppetizer' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Appetizer'
                      checked={keywordIsAppetizer}
                      onChange={appetizerFilterHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId='isDrink' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Drink'
                      checked={keywordIsDrink}
                      onChange={drinkFilterHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Country of Origin:</Form.Label>
                    <Form.Control
                      as='select'
                      value={keywordCountry}
                      onChange={countryFilterHandler}
                    >
                      {Countries.map((country) =>
                        <option key={country[0]}>
                          {country[1]}
                        </option>
                      )}
                    </Form.Control>
                    <Form.Text>Leave blank and we will search every country...</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Recipe Name:</Form.Label>
                    <Form.Control
                      type='text'
                      name='keywordRecipeName'
                      onChange={recipeNameFilterHandler}
                      placeholder='Search by recipe name...'
                    >
                    </Form.Control>
                    <Form.Text>Leave blank and we will search every recipe we can find...</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant="secondary">Filter</Button>
      </OverlayTrigger>
    </div>
  )
}

export default FilterBtn;
