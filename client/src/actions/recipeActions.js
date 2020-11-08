import axios from 'axios';
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
  RECIPE_UPDATE_REQUEST,
  RECIPE_UPDATE_SUCCESS,
  RECIPE_UPDATE_FAILURE
} from '../constants/recipeConstants';

export const listRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_LIST_REQUEST })

    const { data } = await axios.get('/api/recipes')

    dispatch({
      type: RECIPE_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: RECIPE_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const listRecipeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/recipes/${id}`)

    dispatch({
      type: RECIPE_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: RECIPE_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const updateRecipe = (recipe) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_UPDATE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/recipes/${recipe._id}`, recipe, config)

    dispatch({
      type: RECIPE_UPDATE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: RECIPE_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const createRecipe = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_CREATE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/recipes`, {}, config)

    dispatch({
      type: RECIPE_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: RECIPE_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const deleteRecipe = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_DELETE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    await axios.delete(`/api/recipes/${id}`, config)

    dispatch({
      type: RECIPE_DELETE_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: RECIPE_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
