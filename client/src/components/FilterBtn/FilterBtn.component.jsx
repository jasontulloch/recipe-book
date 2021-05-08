import React, { useState, useEffect } from 'react';
import {
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import {
  OverlayTrigger,
  Popover,
  Button,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Form
} from 'react-bootstrap';

const FilterBtn = ({ match, history }) => {

  let { path, url } = useRouteMatch()

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

  const [recipeFilter, setRecipeFilter] = useState([
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
  ])

  //console.log(path)
  //console.log(url)
  //console.log(useRouteMatch())
  //console.log(recipeFilter)
  //console.log(keywordIsVegan)

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

  const veganFilterHandler = (e) => {
    setKeywordIsVegan(e.target.checked)
    if (keywordIsVegan === false) {
      recipeFilter[0] = {keyword: 'keywordIsVegan', defaultState: true}
    } else {
      recipeFilter[0] = {keyword: 'keywordIsVegan', defaultState: false}
    }
  }
  const vegetarianFilterHandler = (e) => {
    setKeywordIsVegetarian(e.target.checked)
    if (keywordIsVegetarian === false) {
      recipeFilter[1] = {keyword: 'keywordIsVegetarian', defaultState: true}
    } else {
      recipeFilter[1] = {keyword: 'keywordIsVegetarian', defaultState: false}
    }
  }
  const glutenFreeFilterHandler = (e) => {
    setKeywordIsGlutenFree(e.target.checked)
    if (keywordIsGlutenFree === false) {
      recipeFilter[2] = {keyword: 'keywordIsGlutenFree', defaultState: true}
    } else {
      recipeFilter[2] = {keyword: 'keywordIsGlutenFree', defaultState: false}
    }
  }
  const ketogenicFilterHandler = (e) => {
    setKeywordIsKetogenic(e.target.checked)
    if (keywordIsKetogenic === false) {
      recipeFilter[3] = {keyword: 'keywordIsKetogenic', defaultState: true}
    } else {
      recipeFilter[3] = {keyword: 'keywordIsKetogenic', defaultState: false}
    }
  }
  const pescatarianFilterHandler = (e) => {
    setKeywordIsPescatarian(e.target.checked)
    if (keywordIsPescatarian === false) {
      recipeFilter[4] = {keyword: 'keywordIsPescatarian', defaultState: true}
    } else {
      recipeFilter[4] = {keyword: 'keywordIsPescatarian', defaultState: false}
    }
  }
  const dairyFilterHandler = (e) => {
    setKeywordIsDairy(e.target.checked)
    if (keywordIsDairy === false) {
      recipeFilter[5] = {keyword: 'keywordIsDairy', defaultState: true}
    } else {
      recipeFilter[5] = {keyword: 'keywordIsDairy', defaultState: false}
    }
  }
  const eggFilterHandler = (e) => {
    setKeywordIsEgg(e.target.checked)
    if (keywordIsEgg === false) {
      recipeFilter[6] = {keyword: 'keywordIsEgg', defaultState: true}
    } else {
      recipeFilter[6] = {keyword: 'keywordIsEgg', defaultState: false}
    }
  }
  const nutsFilterHandler = (e) => {
    setKeywordIsNuts(e.target.checked)
    if (keywordIsNuts === false) {
      recipeFilter[7] = {keyword: 'keywordIsNuts', defaultState: true}
    } else {
      recipeFilter[7] = {keyword: 'keywordIsNuts', defaultState: false}
    }
  }
  const shellfishFilterHandler = (e) => {
    setKeywordIsShellfish(e.target.checked)
    if (keywordIsShellfish === false) {
      recipeFilter[8] = {keyword: 'keywordIsShellfish', defaultState: true}
    } else {
      recipeFilter[8] = {keyword: 'keywordIsShellfish', defaultState: false}
    }
  }
  const soyFilterHandler = (e) => {
    setKeywordIsSoy(e.target.checked)
    if (keywordIsSoy === false) {
      recipeFilter[9] = {keyword: 'keywordIsSoy', defaultState: true}
    } else {
      recipeFilter[9] = {keyword: 'keywordIsSoy', defaultState: false}
    }
  }
  const wheatFilterHandler = (e) => {
    setKeywordIsWheat(e.target.checked)
    if (keywordIsWheat === false) {
      recipeFilter[10] = {keyword: 'keywordIsWheat', defaultState: true}
    } else {
      recipeFilter[10] = {keyword: 'keywordIsWheat', defaultState: false}
    }
  }

  let searchUrl = []
  const recipeFilterFinal = recipeFilter.filter(filterItem => filterItem.defaultState === true).map(filterItem => searchUrl.push('/' + filterItem.keyword + '=true'))

  return (
    <div>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id='popover-positioned-bottom'>
            <Popover.Title as="h3">
              Advanced Filter
              <Link style={{marginLeft: '10px'}} to={`/recipes/advanced-search-results${searchUrl.join('')}/page/1`}>Search</Link>
            </Popover.Title>
            <Popover.Content>
              <Row>
                <Col style={{width: '300px !important'}}>
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
                <Col>
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
