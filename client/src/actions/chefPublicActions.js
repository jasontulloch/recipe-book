import axios from 'axios';
import {
  CHEF_LIST_REQUEST,
  CHEF_LIST_SUCCESS,
  CHEF_LIST_FAILURE,
  CHEF_PUBLIC_DETAILS_REQUEST,
  CHEF_PUBLIC_DETAILS_SUCCESS,
  CHEF_PUBLIC_DETAILS_FAILURE,
} from '../constants/chefPublicConstants';

export const listChefs = (
  createdAtSort = '',
  netVotesSort = '',
  pageNumber = ''
) => async (dispatch) => {

  try {
    dispatch({ type: CHEF_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/chefs?createdAtSort=${createdAtSort}&netVotesSort=${netVotesSort}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: CHEF_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CHEF_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const getChefPublicDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHEF_PUBLIC_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/chefs/${id}`)

    dispatch({
      type: CHEF_PUBLIC_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: CHEF_PUBLIC_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
