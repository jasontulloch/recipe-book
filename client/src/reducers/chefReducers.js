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
