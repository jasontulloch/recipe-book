import {
  GROCERY_LIST_EMAIL_REQUEST,
  GROCERY_LIST_EMAIL_SUCCESS,
  GROCERY_LIST_EMAIL_FAILURE,
  GROCERY_LIST_TEXT_REQUEST,
  GROCERY_LIST_TEXT_SUCCESS,
  GROCERY_LIST_TEXT_FAILURE,
} from '../constants/groceryListConstants';

export const emailGroceryListReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_LIST_EMAIL_REQUEST:
      return { loading: true }
    case GROCERY_LIST_EMAIL_SUCCESS:
      return { loading: false, success: true }
    case GROCERY_LIST_EMAIL_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const textGroceryListReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_LIST_TEXT_REQUEST:
      return { loading: true }
    case GROCERY_LIST_TEXT_SUCCESS:
      return { loading: false, success: true }
    case GROCERY_LIST_TEXT_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
