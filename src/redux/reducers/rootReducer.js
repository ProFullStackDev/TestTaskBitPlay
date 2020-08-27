import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import UserReducer from './userReducer';

const rootReducer = combineReducers ({
  userState: UserReducer,
});

const configureStore = () => {
  return createStore (rootReducer, applyMiddleware (thunk));
};

export default configureStore;
