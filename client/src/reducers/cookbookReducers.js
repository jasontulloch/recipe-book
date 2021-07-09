import {
  COOKBOOK_CREATE_REQUEST,
  COOKBOOK_CREATE_SUCCESS,
  COOKBOOK_CREATE_FAILURE,
  COOKBOOK_CREATE_RESET,
  COOKBOOK_MYLIST_REQUEST,
  COOKBOOK_MYLIST_SUCCESS,
  COOKBOOK_MYLIST_FAILURE,
} from '../constants/cookbookConstants';

export const cookbookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COOKBOOK_CREATE_REQUEST:
      return { loading: true }
    case COOKBOOK_CREATE_SUCCESS:
      return { loading: false, success: true, cookbook: action.payload }
    case COOKBOOK_CREATE_FAILURE:
      return { loading: false, error: action.payload }
    case COOKBOOK_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const cookbookMyListReducer = (state = { cookbooks: [] }, action) => {
  switch (action.type) {
    case COOKBOOK_MYLIST_REQUEST:
      return { loading: true, cookbooks: [] }
    case COOKBOOK_MYLIST_SUCCESS:
      return { loading: false, cookbooks: action.payload }
    case COOKBOOK_MYLIST_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}
