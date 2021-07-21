import React from 'react';
import { Form, Button } from 'react-bootstrap';

import './AdvancedSearchBtn.styles.css';

const AdvancedSearchBtn = ({ history }) => {

  const submitHandler = (e) => {
    e.preventDefault()
    history.push('/recipes/advanced-search')
  }

  return (
    <div className="advancedSearchBtnMobile" style={{display: 'inline-block'}}>
      <Form onSubmit={submitHandler} inline>
        <Button type='submit' variant='outline-success' className='ml-1 p-1 advancedSearchBtnButtonMobile' style={{fontSize: '8.5px'}}>
          Advanced Search
        </Button>
      </Form>
    </div>
  )
}

export default AdvancedSearchBtn;
