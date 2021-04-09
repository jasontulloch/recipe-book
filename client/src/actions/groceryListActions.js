import axios from 'axios';
import {
  GROCERY_LIST_EMAIL_REQUEST,
  GROCERY_LIST_EMAIL_SUCCESS,
  GROCERY_LIST_EMAIL_FAILURE,
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
