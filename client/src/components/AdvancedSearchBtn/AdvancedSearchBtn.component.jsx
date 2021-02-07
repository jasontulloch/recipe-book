import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AdvancedSearchBtn = ({ history }) => {

  const submitHandler = (e) => {
    e.preventDefault()
    history.push('/recipes/advanced-search')
  }

  return (
    <div>
      <Form onSubmit={submitHandler} inline>
        <Button type='submit' variant='outline-success' className='ml-2 p-2'>
          Advanced Search
        </Button>
      </Form>
    </div>
  )
}

export default AdvancedSearchBtn;
