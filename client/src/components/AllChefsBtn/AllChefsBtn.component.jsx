import React from 'react';
import { Form, Button } from 'react-bootstrap';

import './AllChefsBtn.styles.css';

const AllChefsBtn = ({ history }) => {

  const submitHandler = (e) => {
    e.preventDefault()
    history.push('/chefs/page/1')
  }

  return (
    <div className="allChefsBtnMobile" style={{display: 'inline-block'}}>
      <Form onSubmit={submitHandler} inline>
        <Button type='submit' variant='outline-success' className='ml-1 p-1 allChefsBtnMobile' style={{fontSize: '8.5px'}}>
          Find Chefs
        </Button>
      </Form>
    </div>
  )
}

export default AllChefsBtn;
