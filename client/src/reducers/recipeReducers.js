import {
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FAILURE,
  RECIPE_DETAILS_REQUEST,
  RECIPE_DETAILS_SUCCESS,
  RECIPE_DETAILS_FAILURE,
  RECIPE_DELETE_REQUEST,
  RECIPE_DELETE_SUCCESS,
  RECIPE_DELETE_FAILURE,
  RECIPE_CREATE_REQUEST,
  RECIPE_CREATE_SUCCESS,
  RECIPE_CREATE_FAILURE,
  RECIPE_CREATE_RESET,
  RECIPE_UPDATE_REQUEST,
  RECIPE_UPDATE_SUCCESS,
  RECIPE_UPDATE_FAILURE,
  RECIPE_UPDATE_RESET
} from '../constants/recipeConstants';

export const recipeListReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_LIST_REQUEST:
      return { loading: true, recipes: [] }
    case RECIPE_LIST_SUCCESS:
      return { loading: false, recipes: action.payload }
    case RECIPE_LIST_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

export const recipeDetailsReducer = (state = { recipe: [] }, action) => {
  switch (action.type) {
    case RECIPE_DETAILS_REQUEST:
      return { loading: true, ...state }
    case RECIPE_DETAILS_SUCCESS:
      return { loading: false, recipe: action.payload }
    case RECIPE_DETAILS_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

export const recipeUpdateReducer = (state = { recipe: {} }, action) => {
  switch (action.type) {
    case RECIPE_UPDATE_REQUEST:
      return { loading: true }
    case RECIPE_UPDATE_SUCCESS:
      return { loading: false, success: true, recipe: action.payload }
    case RECIPE_UPDATE_FAILURE:
      return { loading: false, error: action.payload }
    case RECIPE_UPDATE_RESET:
      return { recipe: {} }
    default:
      return state
  }
}

export const recipeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_CREATE_REQUEST:
      return { loading: true }
    case RECIPE_CREATE_SUCCESS:
      return { loading: false, success: true, recipe: action.payload }
    case RECIPE_CREATE_FAILURE:
      return { loading: false, error: action.payload }
    case RECIPE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const recipeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_DELETE_REQUEST:
      return { loading: true }
    case RECIPE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_DELETE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
