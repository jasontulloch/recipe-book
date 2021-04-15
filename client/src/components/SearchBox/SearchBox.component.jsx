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
          className='mr-1 ml-1 p-3'
          style={{fontSize: '10px'}}
        ></Form.Control>
      {(keywordRecipeName.length < 1) ?  (
          <Button type='submit' variant='outline-success' className='ml-1 p-1' style={{fontSize: '8.5px'}}>
            Search All
          </Button>
        ) : (
          <Button type='submit' variant='outline-success' className='ml-1 p-1' style={{fontSize: '8.5px'}}>
            Search
          </Button>
        )}
      </Form>
    </div>
  )
}

export default SearchBox;
