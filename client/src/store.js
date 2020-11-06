import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  chefLoginReducer,
  chefRegisterReducer,
  chefDetailsReducer,
  chefUpdateProfileReducer,
} from './reducers/chefReducers';

const reducer = combineReducers({
  chefLogin: chefLoginReducer,
  chefRegister: chefRegisterReducer,
  chefDetails: chefDetailsReducer,
  chefUpdateProfile: chefUpdateProfileReducer,
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
