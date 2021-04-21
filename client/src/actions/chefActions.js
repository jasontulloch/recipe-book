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
  CHEF_FOLLOW_REQUEST,
  CHEF_FOLLOW_SUCCESS,
  CHEF_FOLLOW_FAILURE,
  CHEF_UNFOLLOW_REQUEST,
  CHEF_UNFOLLOW_SUCCESS,
  CHEF_UNFOLLOW_FAILURE,
  CHEF_MYFOLLOWED_REQUEST,
  CHEF_MYFOLLOWED_SUCCESS,
  CHEF_MYFOLLOWED_FAILURE
} from '../constants/chefConstants';
import axios from 'axios';

export const register = (first_name, last_name, username, email, phone_number, password) => async (dispatch) => {
  try {
    dispatch({
      type: CHEF_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/chef',
      { first_name, last_name, username, email, phone_number, password },
      config
    )

    dispatch({
      type: CHEF_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: CHEF_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('chefInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CHEF_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: CHEF_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/chef/login',
      { email, password },
      config
    )

    dispatch({
      type: CHEF_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('chefInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CHEF_LOGIN_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('chefInfo')
  dispatch({ type: CHEF_LOGOUT })
  dispatch({ type: CHEF_DETAILS_RESET })
}

export const getChefDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHEF_DETAILS_REQUEST
    })

    const { chefLogin: { chefInfo} } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.get(
      `/api/chef/${id}`,
      config
    )

    dispatch({
      type: CHEF_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: CHEF_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateChefProfile = (chef) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHEF_UPDATE_PROFILE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.put(
      `/api/chef/profile`,
      chef,
      config
    )

    dispatch({
      type: CHEF_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

    dispatch({
      type: CHEF_LOGIN_SUCCESS,
      payload: data
    })

    //localStorage.setItem('chefInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: CHEF_UPDATE_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const followChef = (id, chef) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHEF_FOLLOW_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    await axios.post(
      `/api/chef/${id}/follow`,
      chef,
      config
    )

    dispatch({
      type: CHEF_FOLLOW_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: CHEF_FOLLOW_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const unfollowChef = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHEF_UNFOLLOW_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    await axios.delete(
      `/api/chef/${id}/unfollow`,
      config
    )

    dispatch({
      type: CHEF_UNFOLLOW_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: CHEF_UNFOLLOW_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listMyFollowedChefs = (chefInfo, pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: CHEF_MYFOLLOWED_REQUEST })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.get(
      `/api/chef/${chefInfo._id}/mychefs?pageNumber=${pageNumber}`,
      config
    )

    dispatch({
      type: CHEF_MYFOLLOWED_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CHEF_MYFOLLOWED_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}
