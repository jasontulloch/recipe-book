import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  chefLoginReducer,
  chefRegisterReducer,
  chefDetailsReducer,
  chefUpdateProfileReducer,
  chefFollowReducer,
  chefUnfollowReducer,
  chefMyFollowedReducer,
} from './reducers/chefReducers';
import {
  recipeListReducer,
  recipeNamesReducer,
  recipeListAdvancedSearchReducer,
  recipeMyListReducer,
  recipeDetailsReducer,
  recipeUpdateReducer,
  recipeCreateReducer,
  recipeDeleteReducer,
  recipeUpvoteCreateReducer,
  recipeDownvoteCreateReducer,
  recipeSaveReducer,
  recipeUnsaveReducer,
  recipeMySavedReducer,
  recipeSaveIngredientsReducer,
  recipeSaveToCookbookReducer,
  recipeRemoveFromCookbookReducer,
  recipeListMostRecentLimitedReducer,
  recipeListMostRecentReducer,
  recipeListHighestRatedLimitedReducer,
  recipeListHighestRatedReducer,
  recipeListFiveIngredientsOrFewerReducer,
} from './reducers/recipeReducers';
import {
  chefListReducer,
  chefPublicDetailsReducer,
} from './reducers/chefPublicReducers';
import {
  cookbookCreateReducer,
  cookbookMyListReducer,
  cookbookDetailsReducer,
  cookbookUpdateReducer,
  cookbookDeleteReducer,
} from './reducers/cookbookReducers';
import {
  emailGroceryListReducer,
  textGroceryListReducer,
} from './reducers/groceryListReducers';

const reducer = combineReducers({
  chefLogin: chefLoginReducer,
  chefRegister: chefRegisterReducer,
  chefDetails: chefDetailsReducer,
  chefUpdateProfile: chefUpdateProfileReducer,
  chefFollow: chefFollowReducer,
  chefUnfollow: chefUnfollowReducer,
  chefMyFollowed: chefMyFollowedReducer,
  recipeList: recipeListReducer,
  recipeAllNames: recipeNamesReducer,
  recipeListAdvancedSearch: recipeListAdvancedSearchReducer,
  recipeMyList: recipeMyListReducer,
  recipeDetails: recipeDetailsReducer,
  recipeUpdate: recipeUpdateReducer,
  recipeCreate: recipeCreateReducer,
  recipeDelete: recipeDeleteReducer,
  recipeUpvoteCreate: recipeUpvoteCreateReducer,
  recipeDownvoteCreate: recipeDownvoteCreateReducer,
  recipeSave: recipeSaveReducer,
  recipeUnsave: recipeUnsaveReducer,
  recipeMySaved: recipeMySavedReducer,
  recipeSaveIngredients: recipeSaveIngredientsReducer,
  recipeSaveToCookbook: recipeSaveToCookbookReducer,
  recipeRemoveFromCookbook: recipeRemoveFromCookbookReducer,
  recipeListMostRecentLimited: recipeListMostRecentLimitedReducer,
  recipeListMostRecent: recipeListMostRecentReducer,
  recipeListHighestRatedLimited: recipeListHighestRatedLimitedReducer,
  recipeListHighestRated: recipeListHighestRatedReducer,
  recipeListFiveIngredientsOrFewer: recipeListFiveIngredientsOrFewerReducer,
  chefList: chefListReducer,
  chefPublicDetails: chefPublicDetailsReducer,
  cookbookCreate: cookbookCreateReducer,
  cookbookMyList: cookbookMyListReducer,
  cookbookDetails: cookbookDetailsReducer,
  cookbookUpdate: cookbookUpdateReducer,
  cookbookDelete: cookbookDeleteReducer,
  emailGroceryList: emailGroceryListReducer,
  textGroceryList: textGroceryListReducer
})

const chefInfoFromStorage = localStorage.getItem('chefInfo')
  ? JSON.parse(localStorage.getItem('chefInfo'))
  : null

const initialState = {
  chefLogin: { chefInfo: chefInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
