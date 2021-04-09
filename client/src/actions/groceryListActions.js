import axios from 'axios';
import {
  GROCERY_LIST_EMAIL_REQUEST,
  GROCERY_LIST_EMAIL_SUCCESS,
  GROCERY_LIST_EMAIL_FAILURE,
  GROCERY_LIST_TEXT_REQUEST,
  GROCERY_LIST_TEXT_SUCCESS,
  GROCERY_LIST_TEXT_FAILURE,
} from '../constants/groceryListConstants';

export const emailGroceryList = (_id, first_name, last_name, email, savedIngredients) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROCERY_LIST_EMAIL_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/email/emailGroceryList`, _id, first_name, last_name, email, savedIngredients, config)

    dispatch({
      type: GROCERY_LIST_EMAIL_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GROCERY_LIST_EMAIL_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const textGroceryList = (_id, first_name, last_name, phone_number, savedIngredients) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROCERY_LIST_TEXT_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/text/textGroceryList`, _id, first_name, last_name, phone_number, savedIngredients, config)

    dispatch({
      type: GROCERY_LIST_TEXT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GROCERY_LIST_TEXT_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}
