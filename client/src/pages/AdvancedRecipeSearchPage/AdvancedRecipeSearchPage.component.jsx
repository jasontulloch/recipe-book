import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Countries from '../../lists/countries';

const AdvancedRecipeSearchPage = ({ history, match }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState('')
  const [keywordCountry, setKeywordCountry] = useState('')
  const [keywordChefName, setKeywordChefName] = useState('')
  const [keywordCookTimeMin, setKeywordCookTimeMin] = useState(0)
  const [keywordCookTimeMax, setKeywordCookTimeMax] = useState(60)
  const [keywordIsVegan, setKeywordIsVegan] = useState(false)
  const [keywordIsVegetarian, setKeywordIsVegetarian] = useState(false)
  const [keywordIsGlutenFree, setKeywordIsGlutenFree] = useState(false)
  const [keywordIsKetogenic, setKeywordIsKetogenic] = useState(false)
  const [keywordIsDairy, setKeywordIsDairy] = useState(false)
  const [keywordIsEgg, setKeywordIsEgg] = useState(false)
  const [keywordIsNuts, setKeywordIsNuts] = useState(false)
  const [keywordIsShellfish, setKeywordIsShellfish] = useState(false)
  const [keywordIsSoy, setKeywordIsSoy] = useState(false)

  const [searchByDiet, setSearchByDiet] = useState(false)
  const [searchByAllergin, setSearchByAllergin] = useState(false)
  //const pageNumber = match.params.pageNumber || 1

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const submitHandler = (e) => {
    e.preventDefault()
    if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == true && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == true && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)

    } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == false && searchByAllergin == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == false && searchByAllergin == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}`)
      // Step 2: Contemplate if user wants to search by Diet, if no, exclude parameters from search
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == false && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == false && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}`)
    } else {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    }
  }

  useEffect(() => {
    if (chefInfo) {
      setKeywordIsVegan(chefInfo.isVegan)
      setKeywordIsVegetarian(chefInfo.isVegetarian)
      setKeywordIsGlutenFree(chefInfo.isGlutenFree)
      setKeywordIsKetogenic(chefInfo.isKetogenic)
      setKeywordIsDairy(chefInfo.isDairy)
      setKeywordIsEgg(chefInfo.isEgg)
      setKeywordIsNuts(chefInfo.isNuts)
      setKeywordIsShellfish(chefInfo.isShellfish)
      setKeywordIsSoy(chefInfo.isSoy)
    }
  }, [chefInfo])

  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <h1>Advanced Search</h1>
        <p style={{marginBottom: '0px'}}>Looking for the most popular recipe? Don't worry, you can sort after your search.</p>
        <p>How about a different serving size? All recipes can be adjusted on their individual page.</p>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row}>
          <Form.Label column md={2}>Recipe Name:</Form.Label>
          <Col md={10}>
            <Form.Control
              type='text'
              name='keywordRecipeName'
              onChange={(e) => setKeywordRecipeName(e.target.value)}
              placeholder='Search by recipe name...'
              className=''
            >
            </Form.Control>
            <Form.Text>Leave blank and we will search every recipe we can find...</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column md={2}>Country of Origin:</Form.Label>
          <Col md={10}>
            <Form.Control
              as='select'
              value={keywordCountry}
              onChange={(e) => setKeywordCountry(e.target.value)}
            >
              {Countries.map((country) =>
                <option key={country[0]}>
                  {country[1]}
                </option>
              )}
            </Form.Control>
            <Form.Text>Leave blank and we will search every country...</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column md={2}>Chef Username:</Form.Label>
          <Col md={10}>
            <Form.Control
              type='text'
              name='keywordChefName'
              onChange={(e) => setKeywordChefName(e.target.value)}
              placeholder='Search by chef username...'
              className=''
            ></Form.Control>
            <Form.Text>Find your favorite chef or leave blank and search them all...</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column md={2}>Cook Time:</Form.Label>
          <Form.Label column md={2}>Between</Form.Label>
          <Col md={2}>
            <Form.Control
              type='number'
              name='keywordCookTimeMin'
              onChange={(e) => setKeywordCookTimeMin(e.target.value)}
              placeholder='Minimum time'
              required
              min='0'
              max='359'
              value={keywordCookTimeMin}
              className=''
            ></Form.Control>
          </Col>
          <Form.Label column md={1}>and</Form.Label>
          <Col md={2}>
            <Form.Control
              type='number'
              name='keywordCookTimeMax'
              onChange={(e) => setKeywordCookTimeMax(e.target.value)}
              placeholder='Maximum time'
              required
              min='0'
              max='360'
              value={keywordCookTimeMax}
              className=''
            ></Form.Control>
          </Col>
          <Form.Label column md={1}>minutes</Form.Label>
        </Form.Group>
        {(searchByDiet === true) ? (
          <Row style={{ textAlign:'center' }}>
            <Col>
                <Form.Group controlId='isVegan' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Vegan recipes?'
                    checked={keywordIsVegan}
                    onChange={(e) => setKeywordIsVegan(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isVegetarian' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Vegetarian recipes?'
                    checked={keywordIsVegetarian}
                    onChange={(e) => setKeywordIsVegetarian(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isGlutenFree' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Gluten-free recipes?'
                    checked={keywordIsGlutenFree}
                    onChange={(e) => setKeywordIsGlutenFree(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isKetogenic' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Ketogenic recipes?'
                    checked={keywordIsKetogenic}
                    onChange={(e) => setKeywordIsKetogenic(e.target.checked)}
                  />
                </Form.Group>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
        <Row style={{ textAlign: 'center', paddingBottom: '15px' }}>
          <Col>
              {(searchByDiet === true) ? (
                <Button onClick={(e) => setSearchByDiet(false)} variant='outline-success' className='p-2' style={{width: '25%'}}>
                  Hide diet options, I don't want these included in my search
                </Button>
              ) : (
                <Button onClick={(e) => setSearchByDiet(true)} variant='outline-success' className='p-2' style={{width: '25%'}}>
                  Let me search by diet
                </Button>
              )}
          </Col>
        </Row>
        {(searchByAllergin === true) ? (
          <Row style={{ textAlign:'center' }}>
            <Col>
                <Form.Group controlId='isDairy' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains dairy?'
                    checked={keywordIsDairy}
                    onChange={(e) => setKeywordIsDairy(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isEgg' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains egg?'
                    checked={keywordIsEgg}
                    onChange={(e) => setKeywordIsEgg(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isNuts' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains nuts?'
                    checked={keywordIsNuts}
                    onChange={(e) => setKeywordIsNuts(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isShellfish' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains shellfish?'
                    checked={keywordIsShellfish}
                    onChange={(e) => setKeywordIsShellfish(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isSoy' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains soy?'
                    checked={keywordIsSoy}
                    onChange={(e) => setKeywordIsSoy(e.target.checked)}
                  />
                </Form.Group>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
        <Row style={{ textAlign: 'center', paddingBottom: '15px' }}>
          <Col>
              {(searchByAllergin === true) ? (
                <Button onClick={(e) => setSearchByAllergin(false)} variant='outline-success' className='p-2' style={{width: '25%'}}>
                  Hide allergin options, I don't want these included in my search
                </Button>
              ) : (
                <Button onClick={(e) => setSearchByAllergin(true)} variant='outline-success' className='p-2' style={{width: '25%'}}>
                  Let me search by common allergins
                </Button>
              )}
          </Col>
        </Row>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button type='submit' variant='outline-success' className='p-2' style={{width: '25%'}}>
              Search
            </Button>
          </Col>
        </Row>

      </Form>
    </div>
  )
}

export default AdvancedRecipeSearchPage;
