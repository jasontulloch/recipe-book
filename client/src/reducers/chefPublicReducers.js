import {
  CHEF_LIST_REQUEST,
  CHEF_LIST_SUCCESS,
  CHEF_LIST_FAILURE,
  CHEF_PUBLIC_DETAILS_REQUEST,
  CHEF_PUBLIC_DETAILS_SUCCESS,
  CHEF_PUBLIC_DETAILS_FAILURE,
  CHEF_PUBLIC_DETAILS_RESET,
} from '../constants/chefPublicConstants';

// Returning chefs, pages, and page to match what is returned in the controller
export const chefListReducer = (state = { chefs: [] }, action) => {
  switch (action.type) {
    case CHEF_LIST_REQUEST:
      return { loading: true, chefs: [] }
    case CHEF_LIST_SUCCESS:
      return {
        loading: false,
        chefs: action.payload.chefs,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case CHEF_LIST_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

export const chefPublicDetailsReducer = (state = { chef: [] }, action) => {
  switch (action.type) {
    case CHEF_PUBLIC_DETAILS_REQUEST:
      return { loading: true, chef: [] }
    case CHEF_PUBLIC_DETAILS_SUCCESS:
      return {
        loading: false,
        chef: action.payload.chef,
        recipes: action.payload.recipes,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case CHEF_PUBLIC_DETAILS_FAILURE:
      return { loading: false, error: action.payload}
    case CHEF_PUBLIC_DETAILS_RESET:
      return { chef: {} }
    default:
      return state
  }
}
