import axios from 'axios';
import {
  COOKBOOK_CREATE_REQUEST,
  COOKBOOK_CREATE_SUCCESS,
  COOKBOOK_CREATE_FAILURE,
  COOKBOOK_MYLIST_REQUEST,
  COOKBOOK_MYLIST_SUCCESS,
  COOKBOOK_MYLIST_FAILURE,
  COOKBOOK_DETAILS_REQUEST,
  COOKBOOK_DETAILS_SUCCESS,
  COOKBOOK_DETAILS_FAILURE,
  COOKBOOK_UPDATE_REQUEST,
  COOKBOOK_UPDATE_SUCCESS,
  COOKBOOK_UPDATE_FAILURE,
  COOKBOOK_DELETE_REQUEST,
  COOKBOOK_DELETE_SUCCESS,
  COOKBOOK_DELETE_FAILURE,
} from '../constants/cookbookConstants';

export const createCookbook = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COOKBOOK_CREATE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/cookbooks`, {}, config)

    dispatch({
      type: COOKBOOK_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COOKBOOK_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const listMyCookbooks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COOKBOOK_MYLIST_REQUEST })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.get('/api/cookbooks/mycookbooks', config)

    dispatch({
      type: COOKBOOK_MYLIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COOKBOOK_MYLIST_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const listCookbookDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COOKBOOK_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/cookbooks/${id}`)

    dispatch({
      type: COOKBOOK_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COOKBOOK_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const updateCookbook = (cookbook) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COOKBOOK_UPDATE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/cookbooks/${cookbook._id}`, cookbook, config)

    dispatch({
      type: COOKBOOK_UPDATE_SUCCESS,
      payload: data
    })

    dispatch({
      type: COOKBOOK_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: COOKBOOK_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const deleteCookbook = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COOKBOOK_DELETE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    await axios.delete(`/api/cookbooks/${id}`, config)

    dispatch({
      type: COOKBOOK_DELETE_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: COOKBOOK_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
