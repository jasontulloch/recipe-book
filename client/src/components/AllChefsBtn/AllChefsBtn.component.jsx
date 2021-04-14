import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AllChefsBtn = ({ history }) => {

  const submitHandler = (e) => {
    e.preventDefault()
    history.push('/chefs')
  }

  return (
    <div>
      <Form onSubmit={submitHandler} inline>
        <Button type='submit' variant='outline-success' className='ml-1 p-2'>
          Find Chefs
        </Button>
      </Form>
    </div>
  )
}

export default AllChefsBtn;
