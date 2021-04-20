import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AdvancedSearchBtn = ({ history }) => {

  const submitHandler = (e) => {
    e.preventDefault()
    history.push('/recipes/advanced-search')
  }

  return (
    <div>
      <Form onSubmit={submitHandler} inline className="justify-content-md-center">
        <Button type='submit' variant='outline-success' className='ml-1 p-1' style={{fontSize: '8.5px'}}>
          Advanced Search
        </Button>
      </Form>
    </div>
  )
}

export default AdvancedSearchBtn;
