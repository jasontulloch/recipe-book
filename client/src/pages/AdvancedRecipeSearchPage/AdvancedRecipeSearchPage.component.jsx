import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';


const AdvancedRecipeSearchPage = ({ history, match }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState('')
  const [keywordCountry, setKeywordCountry] = useState('')
  const [keywordChefName, setKeywordChefName] = useState('')
  //const [keywordCookTime, setKeywordCookTime] = useState('')
  //const pageNumber = match.params.pageNumber || 1

  const submitHandler = (e) => {
    e.preventDefault()
    if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim()) {
      history.push(`/recipes/advanced-search-results/keywordCountry=${keywordCountry}`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim()) {
      history.push(`/recipes/advanced-search-results/keywordChefName=${keywordChefName}`)
    } else {
      history.push('/recipes')
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
        <Form.Control
          type='text'
          name='keywordCountry'
          onChange={(e) => setKeywordCountry(e.target.value)}
          placeholder='Search by country...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Form.Control
          type='text'
          name='keywordChefName'
          onChange={(e) => setKeywordChefName(e.target.value)}
          placeholder='Search by chef username...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Form>
    </div>
  )
}

export default AdvancedRecipeSearchPage;
