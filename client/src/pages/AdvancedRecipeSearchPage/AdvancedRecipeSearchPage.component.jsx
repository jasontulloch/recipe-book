import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';


const AdvancedRecipeSearchPage = ({ history }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState("")
  const [keywordCountry, setKeywordCountry] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    if(keywordRecipeName.trim() || keywordCountry.trim()) {
      history.push(`/recipes/advanced-search-results/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}`)
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
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Form>
    </div>
  )
}

export default AdvancedRecipeSearchPage;
