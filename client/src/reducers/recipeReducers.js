import {
  RECIPE_LIST_REQUEST, RECIPE_LIST_SUCCESS, RECIPE_LIST_FAILURE,
  RECIPE_NAMES_REQUEST, RECIPE_NAMES_SUCCESS, RECIPE_NAMES_FAILURE,
  RECIPE_LIST_ADVANCED_SEARCH_REQUEST, RECIPE_LIST_ADVANCED_SEARCH_SUCCESS, RECIPE_LIST_ADVANCED_SEARCH_FAILURE,
  RECIPE_MYLIST_REQUEST, RECIPE_MYLIST_SUCCESS, RECIPE_MYLIST_FAILURE,
  RECIPE_DETAILS_REQUEST, RECIPE_DETAILS_SUCCESS, RECIPE_DETAILS_FAILURE,
  RECIPE_DETAILS_RESET, RECIPE_DELETE_REQUEST, RECIPE_DELETE_SUCCESS,
  RECIPE_DELETE_FAILURE, RECIPE_CREATE_REQUEST, RECIPE_CREATE_SUCCESS,
  RECIPE_CREATE_FAILURE, RECIPE_CREATE_RESET, RECIPE_UPDATE_REQUEST,
  RECIPE_UPDATE_SUCCESS, RECIPE_UPDATE_FAILURE, RECIPE_UPDATE_RESET,
  RECIPE_CREATE_UPVOTE_REQUEST, RECIPE_CREATE_UPVOTE_SUCCESS, RECIPE_CREATE_UPVOTE_FAILURE, RECIPE_CREATE_UPVOTE_RESET, 
  RECIPE_CREATE_DOWNVOTE_REQUEST, RECIPE_CREATE_DOWNVOTE_SUCCESS, RECIPE_CREATE_DOWNVOTE_FAILURE, RECIPE_CREATE_DOWNVOTE_RESET,
  RECIPE_SAVE_REQUEST, RECIPE_SAVE_SUCCESS, RECIPE_SAVE_FAILURE, RECIPE_SAVE_RESET, 
  RECIPE_UNSAVE_REQUEST, RECIPE_UNSAVE_SUCCESS, RECIPE_UNSAVE_FAILURE, RECIPE_UNSAVE_RESET,
  RECIPE_MYSAVED_REQUEST, RECIPE_MYSAVED_SUCCESS, RECIPE_MYSAVED_FAILURE,
  RECIPE_SAVE_INGREDIENTS_REQUEST, RECIPE_SAVE_INGREDIENTS_SUCCESS, RECIPE_SAVE_INGREDIENTS_FAILURE, RECIPE_SAVE_INGREDIENTS_RESET,
  RECIPE_SAVE_TO_COOKBOOK_REQUEST, RECIPE_SAVE_TO_COOKBOOK_SUCCESS, RECIPE_SAVE_TO_COOKBOOK_FAILURE, RECIPE_SAVE_TO_COOKBOOK_RESET,
  RECIPE_REMOVE_FROM_COOKBOOK_REQUEST, RECIPE_REMOVE_FROM_COOKBOOK_SUCCESS, RECIPE_REMOVE_FROM_COOKBOOK_FAILURE, RECIPE_REMOVE_FROM_COOKBOOK_RESET,
  RECIPE_LIST_MOST_RECENT_REQUEST, RECIPE_LIST_MOST_RECENT_SUCCESS, RECIPE_LIST_MOST_RECENT_FAILURE,
  RECIPE_LIST_HIGHEST_RATED_LIMITED_REQUEST, RECIPE_LIST_HIGHEST_RATED_LIMITED_SUCCESS, RECIPE_LIST_HIGHEST_RATED_LIMITED_FAILURE,
  RECIPE_LIST_HIGHEST_RATED_REQUEST, RECIPE_LIST_HIGHEST_RATED_SUCCESS, RECIPE_LIST_HIGHEST_RATED_FAILURE,
} from '../constants/recipeConstants';

// Returning recipes, pages, and page to match what is returned in the controller
export const recipeListReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_LIST_REQUEST:
      return { loading: true, recipes: [] }
    case RECIPE_LIST_SUCCESS:
      return {
        loading: false,
        recipes: action.payload.recipes,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case RECIPE_LIST_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

// Returning recipes, pages, and page to match what is returned in the controller
export const recipeNamesReducer = (state = { recipeNames: [] }, action) => {
  switch (action.type) {
    case RECIPE_NAMES_REQUEST:
      return { loading: true, recipeNames: [] }
    case RECIPE_NAMES_SUCCESS:
      return {
        loading: false,
        recipeNames: action.payload,
      }
    case RECIPE_NAMES_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

export const recipeListAdvancedSearchReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_LIST_ADVANCED_SEARCH_REQUEST:
      return { loading: true, recipes: [] }
    case RECIPE_LIST_ADVANCED_SEARCH_SUCCESS:
      return {
        loading: false,
        recipes: action.payload.recipes,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case RECIPE_LIST_ADVANCED_SEARCH_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

export const recipeMyListReducer = (state = { myRecipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_MYLIST_REQUEST:
      return { loading: true, myRecipes: [] }
    case RECIPE_MYLIST_SUCCESS:
      return { loading: false, myRecipes: action.payload }
    case RECIPE_MYLIST_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

export const recipeMySavedReducer = (state = { savedRecipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_MYSAVED_REQUEST:
      return { loading: true, savedRecipes: [] }
    case RECIPE_MYSAVED_SUCCESS:
      return {
        loading: false,
        savedRecipes: action.payload.mySavedRecipes,
        chefNames: action.payload.chefNames
      }
    case RECIPE_MYSAVED_FAILURE:
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
      return {
        loading: false,
        recipe: action.payload.recipe,
        chefUsername: action.payload.chefUsername,
        chefId: action.payload.chefId
      }
    case RECIPE_DETAILS_FAILURE:
      return { loading: false, error: action.payload}
    case RECIPE_DETAILS_RESET:
      return { recipe: {} }
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

export const recipeUpvoteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_CREATE_UPVOTE_REQUEST:
      return { loading: true }
    case RECIPE_CREATE_UPVOTE_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_CREATE_UPVOTE_FAILURE:
      return { loading: false, error: action.payload }
    case RECIPE_CREATE_UPVOTE_RESET:
      return {}
    default:
      return state
  }
}

export const recipeDownvoteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_CREATE_DOWNVOTE_REQUEST:
      return { loading: true }
    case RECIPE_CREATE_DOWNVOTE_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_CREATE_DOWNVOTE_FAILURE:
      return { loading: false, error: action.payload }
    case RECIPE_CREATE_DOWNVOTE_RESET:
      return {}
    default:
      return state
  }
}

export const recipeSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_SAVE_REQUEST:
      return { loading: true }
    case RECIPE_SAVE_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_SAVE_FAILURE:
      return { loading: false, error: action.payload }
    case RECIPE_SAVE_RESET:
      return {}
    default:
      return state
  }
}

export const recipeUnsaveReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_UNSAVE_REQUEST:
      return { loading: true }
    case RECIPE_UNSAVE_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_UNSAVE_FAILURE:
      return { loading: false, error: action.payload }
    case RECIPE_UNSAVE_RESET:
      return {}
    default:
      return state
  }
}

export const recipeSaveIngredientsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_SAVE_INGREDIENTS_REQUEST:
      return { loading: true }
    case RECIPE_SAVE_INGREDIENTS_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_SAVE_INGREDIENTS_FAILURE:
      return { loading: false, error: action.payload }
    case RECIPE_SAVE_INGREDIENTS_RESET:
      return {}
    default:
      return state
  }
}

export const recipeSaveToCookbookReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_SAVE_TO_COOKBOOK_REQUEST:
      return { loading: true }
    case RECIPE_SAVE_TO_COOKBOOK_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_SAVE_TO_COOKBOOK_FAILURE:
      return { loading: false, error: action.payload }
    case RECIPE_SAVE_TO_COOKBOOK_RESET:
      return {}
    default:
      return state
  }
}

export const recipeRemoveFromCookbookReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_REMOVE_FROM_COOKBOOK_REQUEST:
      return { loading: true }
    case RECIPE_REMOVE_FROM_COOKBOOK_SUCCESS:
      return { 
        loading: false, 
        success: true, 
      }
    case RECIPE_REMOVE_FROM_COOKBOOK_FAILURE:
      return { loading: false, error: action.payload }
    case RECIPE_REMOVE_FROM_COOKBOOK_RESET:
      return {}
    default:
      return state
  }
}

// Returning the 20 most recent recipes for mobile
export const recipeListMostRecentReducer = (state = { mostRecentRecipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_LIST_MOST_RECENT_REQUEST:
      return { loading: true, mostRecentRecipes: [] }
    case RECIPE_LIST_MOST_RECENT_SUCCESS:
      return {
        loading: false,
        mostRecentRecipes: action.payload
      }
    case RECIPE_LIST_MOST_RECENT_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

// Returning the 20 highest rated recipes for mobile
export const recipeListHighestRatedLimitedReducer = (state = { highestRatedRecipesLimited: [] }, action) => {
  switch (action.type) {
    case RECIPE_LIST_HIGHEST_RATED_LIMITED_REQUEST:
      return { loading: true, highestRatedRecipesLimited: [] }
    case RECIPE_LIST_HIGHEST_RATED_LIMITED_SUCCESS:
      return {
        loading: false,
        highestRatedRecipesLimited: action.payload
      }
    case RECIPE_LIST_HIGHEST_RATED_LIMITED_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

// Returning the highest rated recipes and sorted
export const recipeListHighestRatedReducer = (state = { highestRatedRecipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_LIST_HIGHEST_RATED_REQUEST:
      return { loading: true, highestRatedRecipes: [] }
    case RECIPE_LIST_HIGHEST_RATED_SUCCESS:
      return {
        loading: false,
        success: true,
        highestRatedRecipes: action.payload
      }
    case RECIPE_LIST_HIGHEST_RATED_FAILURE:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}