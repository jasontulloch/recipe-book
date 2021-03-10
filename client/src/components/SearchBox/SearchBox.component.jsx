import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    if(keywordRecipeName.trim()) {
      history.push(`/recipes/search/keywordRecipeName=${keywordRecipeName}/page/1`)
      // Need to set keyword recipe name to another variable and then clear
    } else {
      history.push('/recipes')
    }
  }

  return (
    <div>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeywordRecipeName(e.target.value)}
          placeholder='Search Recipes...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Form>
    </div>
  )
}

export default SearchBox;
