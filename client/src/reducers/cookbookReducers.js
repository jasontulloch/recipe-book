import {
  COOKBOOK_CREATE_REQUEST,
  COOKBOOK_CREATE_SUCCESS,
  COOKBOOK_CREATE_FAILURE,
  COOKBOOK_CREATE_RESET,
  COOKBOOK_MYLIST_REQUEST,
  COOKBOOK_MYLIST_SUCCESS,
  COOKBOOK_MYLIST_FAILURE,
  COOKBOOK_DETAILS_REQUEST,
  COOKBOOK_DETAILS_SUCCESS,
  COOKBOOK_DETAILS_FAILURE,
  COOKBOOK_DETAILS_RESET,
  COOKBOOK_UPDATE_REQUEST,
  COOKBOOK_UPDATE_SUCCESS,
  COOKBOOK_UPDATE_FAILURE,
  COOKBOOK_UPDATE_RESET,
  COOKBOOK_DELETE_REQUEST,
  COOKBOOK_DELETE_SUCCESS,
  COOKBOOK_DELETE_FAILURE,
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

export const cookbookDetailsReducer = (state = { cookbook: [] }, action) => {
  switch (action.type) {
    case COOKBOOK_DETAILS_REQUEST:
      return { loading: true, ...state }
    case COOKBOOK_DETAILS_SUCCESS:
      return {
        loading: false,
        cookbook: action.payload.cookbook,
        myCookbookRecipes: action.payload.myCookbookRecipes,
        chefNames: action.payload.chefNames
      }
    case COOKBOOK_DETAILS_FAILURE:
      return { loading: false, error: action.payload}
    case COOKBOOK_DETAILS_RESET:
      return { cookbook: {} }
    default:
      return state
  }
}

export const cookbookUpdateReducer = (state = { cookbook: {} }, action) => {
  switch (action.type) {
    case COOKBOOK_UPDATE_REQUEST:
      return { loading: true }
    case COOKBOOK_UPDATE_SUCCESS:
      return { loading: false, success: true, cookbook: action.payload }
    case COOKBOOK_UPDATE_FAILURE:
      return { loading: false, error: action.payload }
    case COOKBOOK_UPDATE_RESET:
      return { cookbook: {} }
    default:
      return state
  }
}

export const cookbookDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COOKBOOK_DELETE_REQUEST:
      return { loading: true }
    case COOKBOOK_DELETE_SUCCESS:
      return { loading: false, success: true }
    case COOKBOOK_DELETE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
