import {
  CHEF_REGISTER_REQUEST,
  CHEF_REGISTER_SUCCESS,
  CHEF_REGISTER_FAILURE,
  CHEF_LOGIN_REQUEST,
  CHEF_LOGIN_SUCCESS,
  CHEF_LOGIN_FAILURE,
  CHEF_LOGOUT,
  CHEF_DETAILS_REQUEST,
  CHEF_DETAILS_SUCCESS,
  CHEF_DETAILS_FAILURE,
  CHEF_DETAILS_RESET,
  CHEF_UPDATE_PROFILE_REQUEST,
  CHEF_UPDATE_PROFILE_SUCCESS,
  CHEF_UPDATE_PROFILE_FAILURE,
  CHEF_UPDATE_PROFILE_RESET,
  CHEF_FOLLOW_REQUEST,
  CHEF_FOLLOW_SUCCESS,
  CHEF_FOLLOW_FAILURE,
  CHEF_FOLLOW_RESET,
  CHEF_UNFOLLOW_REQUEST,
  CHEF_UNFOLLOW_SUCCESS,
  CHEF_UNFOLLOW_FAILURE,
  CHEF_UNFOLLOW_RESET,
  CHEF_MYFOLLOWED_REQUEST,
  CHEF_MYFOLLOWED_SUCCESS,
  CHEF_MYFOLLOWED_FAILURE,
} from '../constants/chefConstants';

export const chefLoginReducer = (state = { }, action) => {
  switch(action.type) {
    case CHEF_LOGIN_REQUEST:
      return { loading: true }
    case CHEF_LOGIN_SUCCESS:
      return { loading: false, chefInfo: action.payload }
    case CHEF_LOGIN_FAILURE:
      return { loading: false, error: action.payload }
    case CHEF_LOGOUT:
      return { }
    default:
      return state
  }
}

export const chefRegisterReducer = (state = { }, action) => {
  switch (action.type) {
    case CHEF_REGISTER_REQUEST:
      return { loading: true }
    case CHEF_REGISTER_SUCCESS:
      return { loading: false, chefInfo: action.payload }
    case CHEF_REGISTER_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const chefDetailsReducer = (state = { chef: { } }, action) => {
  switch(action.type) {
    case CHEF_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CHEF_DETAILS_SUCCESS:
      return { loading: false, chef: action.payload }
    case CHEF_DETAILS_FAILURE:
      return { loading: false, error: action.payload }
    case CHEF_DETAILS_RESET:
      return {
        chef: {}
      }
    default:
      return state
  }
}

export const chefUpdateProfileReducer = (state = { }, action) => {
  switch(action.type) {
    case CHEF_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case CHEF_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, chefInfo: action.payload }
    case CHEF_UPDATE_PROFILE_FAILURE:
      return { loading: false, error: action.payload }
    case CHEF_UPDATE_PROFILE_RESET:
      return { }
    default:
      return state
  }
}

export const chefFollowReducer = (state = {}, action) => {
  switch (action.type) {
    case CHEF_FOLLOW_REQUEST:
      return { loading: true }
    case CHEF_FOLLOW_SUCCESS:
      return { loading: false, success: true, chefInfo: action.payload }
    case CHEF_FOLLOW_FAILURE:
      return { loading: false, error: action.payload }
    case CHEF_FOLLOW_RESET:
      return {}
    default:
      return state
  }
}

export const chefUnfollowReducer = (state = {}, action) => {
  switch (action.type) {
    case CHEF_UNFOLLOW_REQUEST:
      return { loading: true }
    case CHEF_UNFOLLOW_SUCCESS:
      return { loading: false, success: true }
    case CHEF_UNFOLLOW_FAILURE:
      return { loading: false, error: action.payload }
    case CHEF_UNFOLLOW_RESET:
      return {}
    default:
      return state
  }
}

export const chefMyFollowedReducer = (state = { chefs: [], finalRecipes: [] }, action) => {
  switch (action.type) {
    case CHEF_MYFOLLOWED_REQUEST:
      return { loading: true, chefs: [], recipes: [] }
    case CHEF_MYFOLLOWED_SUCCESS:
      return {
        loading: false,
        chefs: action.payload.chefs,
        finalRecipes: action.payload.finalRecipes,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case CHEF_MYFOLLOWED_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}
