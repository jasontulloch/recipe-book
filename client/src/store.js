import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  chefLoginReducer,
  chefRegisterReducer,
  chefDetailsReducer,
  chefUpdateProfileReducer,
} from './reducers/chefReducers';
import {
  recipeListReducer,
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
} from './reducers/recipeReducers';

const reducer = combineReducers({
  chefLogin: chefLoginReducer,
  chefRegister: chefRegisterReducer,
  chefDetails: chefDetailsReducer,
  chefUpdateProfile: chefUpdateProfileReducer,
  recipeList: recipeListReducer,
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
