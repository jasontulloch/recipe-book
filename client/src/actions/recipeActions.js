import axios from 'axios';
import {
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FAILURE,
  RECIPE_LIST_ADVANCED_SEARCH_REQUEST,
  RECIPE_LIST_ADVANCED_SEARCH_SUCCESS,
  RECIPE_LIST_ADVANCED_SEARCH_FAILURE,
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
  RECIPE_UPDATE_FAILURE,
  RECIPE_CREATE_UPVOTE_REQUEST,
  RECIPE_CREATE_UPVOTE_SUCCESS,
  RECIPE_CREATE_UPVOTE_FAILURE,
  RECIPE_CREATE_DOWNVOTE_REQUEST,
  RECIPE_CREATE_DOWNVOTE_SUCCESS,
  RECIPE_CREATE_DOWNVOTE_FAILURE,
  RECIPE_SAVE_REQUEST,
  RECIPE_SAVE_SUCCESS,
  RECIPE_SAVE_FAILURE,
  RECIPE_UNSAVE_REQUEST,
  RECIPE_UNSAVE_SUCCESS,
  RECIPE_UNSAVE_FAILURE,
  RECIPE_MYLIST_REQUEST,
  RECIPE_MYLIST_SUCCESS,
  RECIPE_MYLIST_FAILURE,
  RECIPE_MYSAVED_REQUEST,
  RECIPE_MYSAVED_SUCCESS,
  RECIPE_MYSAVED_FAILURE,
} from '../constants/recipeConstants';

export const listRecipes = (keywordRecipeName = '') => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/recipes?keywordRecipeName=${keywordRecipeName}`
    )

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

export const listAdvancedSearchRecipes = (
  keywordRecipeName = '',
  keywordCountry = '',
  keywordChefName = '',
  keywordCookTimeMin = '',
  keywordCookTimeMax = '',
  keywordIsVegan = '',
  keywordIsVegetarian = '',
  keywordIsGlutenFree = '',
  keywordIsKetogenic = ''
) => async (dispatch) => {

  try {
    dispatch({ type: RECIPE_LIST_ADVANCED_SEARCH_REQUEST })

    const { data } = await axios.get(
      `/api/recipes/advanced-search-results?keywordRecipeName=${keywordRecipeName}&keywordCountry=${keywordCountry}&keywordChefName=${keywordChefName}&keywordCookTimeMin=${keywordCookTimeMin}&keywordCookTimeMax=${keywordCookTimeMax}&keywordIsVegan=${keywordIsVegan}&keywordIsVegetarian=${keywordIsVegetarian}&keywordIsGlutenFree=${keywordIsGlutenFree}&keywordIsKetogenic=${keywordIsKetogenic}`
    )

    dispatch({
      type: RECIPE_LIST_ADVANCED_SEARCH_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: RECIPE_LIST_ADVANCED_SEARCH_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const listMyRecipes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RECIPE_MYLIST_REQUEST })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.get('/api/recipes/myrecipes', config)

    dispatch({
      type: RECIPE_MYLIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: RECIPE_MYLIST_FAILURE,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const listMySavedRecipes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RECIPE_MYSAVED_REQUEST })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    const { data } = await axios.get('/api/recipes/savedrecipes', config)

    dispatch({
      type: RECIPE_MYSAVED_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: RECIPE_MYSAVED_FAILURE,
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

    dispatch({
      type: RECIPE_DETAILS_SUCCESS,
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

export const createRecipeUpvote = (recipeId, vote) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_CREATE_UPVOTE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    await axios.post(
      `/api/recipes/${recipeId}/upvotes`,
      vote,
      config
    )

    dispatch({
      type: RECIPE_CREATE_UPVOTE_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: RECIPE_CREATE_UPVOTE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createRecipeDownvote = (recipeId, vote) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_CREATE_DOWNVOTE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    await axios.post(
      `/api/recipes/${recipeId}/downvotes`,
      vote,
      config
    )

    dispatch({
      type: RECIPE_CREATE_DOWNVOTE_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: RECIPE_CREATE_DOWNVOTE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const saveRecipe = (recipeId, recipe) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_SAVE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    await axios.post(
      `/api/recipes/${recipeId}/save`,
      recipe,
      config
    )

    dispatch({
      type: RECIPE_SAVE_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: RECIPE_SAVE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const unsaveRecipe = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_UNSAVE_REQUEST
    })

    const { chefLogin: { chefInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chefInfo.token}`
      }
    }

    await axios.delete(
      `/api/recipes/${id}/save`,
      config
    )

    dispatch({
      type: RECIPE_UNSAVE_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: RECIPE_UNSAVE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
