import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState('')

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
          className='mr-sm-1 ml-sm-2'
        ></Form.Control>
      {(keywordRecipeName.length < 1) ?  (
          <Button type='submit' variant='outline-success' className='ml-1 p-2'>
            Search All
          </Button>
        ) : (
          <Button type='submit' variant='outline-success' className='ml-1 p-2'>
            Search
          </Button>
        )}
      </Form>
    </div>
  )
}

export default SearchBox;
