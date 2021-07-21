import React from 'react';
import { textGroceryList } from '../actions/groceryListActions';
import { Button, Form } from 'react-bootstrap';

const MessageIngredients = ({
  dispatch,
  successTextMessage,
  setSuccessTextMessage,
  temporarilyDisableEmailButton,
  setTemporarilyDisableEmailButton,
  temporarilyDisableTextButton,
  setTemporarilyDisableTextButton,
  chef,
  chefInfo,
  sendRecipeIngredients
}) => {

  const textGroceryListHandlerTest = (e) => {
    e.preventDefault()
    setSuccessTextMessage(`Your saved ingredients are on their way to you! They will be sent to ${chef.phone_number}`)
    setTemporarilyDisableEmailButton(true)
    setTemporarilyDisableTextButton(true)
    setTimeout(function() {
      setSuccessTextMessage('')
      setTemporarilyDisableEmailButton(false)
      setTemporarilyDisableTextButton(false)
    }, 20000)
    dispatch(textGroceryList({
      _id: chef._id || chefInfo._id,
      first_name: chef.first_name || chefInfo.first_name,
      last_name: chef.last_name || chefInfo.last_name,
      phone_number: chef.phone_number || chefInfo.phone_number,
      savedIngredients: chef.savedIngredients || sendRecipeIngredients
    }))
  }

  return (
      <Form onSubmit={textGroceryListHandlerTest}>
        <Button
          variant='primary'
          style={{padding: '0px', marginTop: '5px', marginRight: '0px', width: '200px' }}
          type='submit'
          disabled={temporarilyDisableTextButton}
        >
          Text Grocery List
        </Button>
      </Form>

  )

}

export default MessageIngredients;
