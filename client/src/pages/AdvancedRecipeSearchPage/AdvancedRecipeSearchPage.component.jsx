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
  //const pageNumber = match.params.pageNumber || 1

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const submitHandler = (e) => {
    e.preventDefault()
    if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordCountry=${keywordCountry}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim()) {
      history.push(`/recipes/advanced-search-results/keywordChefName=${keywordChefName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    } else {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}`)
    }
  }

  useEffect(() => {
    if (chefInfo) {
      setKeywordIsVegan(chefInfo.isVegan)
      setKeywordIsVegetarian(chefInfo.isVegetarian)
      setKeywordIsGlutenFree(chefInfo.isGlutenFree)
      setKeywordIsKetogenic(chefInfo.isKetogenic)
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
        <Row style={{ textAlign: 'center', paddingBottom: '15px' }}>
          <Col>
            <Button type='submit' variant='outline-success' className='p-2' style={{width: '25%'}}>
              Let me search by diet
            </Button>
          </Col>
        </Row>
        // if true then show parameters and then hit url above
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
