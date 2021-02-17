import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Countries from '../../lists/countries';

const AdvancedRecipeSearchPage = ({ history, match }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState('')
  const [keywordCountry, setKeywordCountry] = useState('')
  const [keywordChefName, setKeywordChefName] = useState('')
  const [keywordCookTimeMin, setKeywordCookTimeMin] = useState(0)
  const [keywordCookTimeMax, setKeywordCookTimeMax] = useState(60)
  //const pageNumber = match.params.pageNumber || 1

  const submitHandler = (e) => {
    e.preventDefault()
    if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordCountry=${keywordCountry}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim()) {
      history.push(`/recipes/advanced-search-results/keywordChefName=${keywordChefName}/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim()) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    } else {
      history.push(`/recipes/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}`)
    }
  }

  return (
    <div>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type='text'
          name='keywordRecipeName'
          onChange={(e) => setKeywordRecipeName(e.target.value)}
          placeholder='Search by recipe name...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Form.Label>Country of Origin</Form.Label>
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
        <Form.Control
          type='text'
          name='keywordChefName'
          onChange={(e) => setKeywordChefName(e.target.value)}
          placeholder='Search by chef username...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Form.Label>I want to cook between</Form.Label>
        <Form.Control
          type='number'
          name='keywordCookTimeMin'
          onChange={(e) => setKeywordCookTimeMin(e.target.value)}
          placeholder='Minimum time'
          required
          min='0'
          max='359'
          value={keywordCookTimeMin}
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Form.Label>and</Form.Label>
        <Form.Control
          type='number'
          name='keywordCookTimeMax'
          onChange={(e) => setKeywordCookTimeMax(e.target.value)}
          placeholder='Maximum time'
          required
          min='0'
          max='360'
          value={keywordCookTimeMax}
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Form.Label>minutes</Form.Label>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Form>
    </div>
  )
}

export default AdvancedRecipeSearchPage;
