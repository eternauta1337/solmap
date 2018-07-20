import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import SourceReducer from './reducers/SourceReducer';
import OutputReducer from './reducers/OutputReducer';

const mainReducer = combineReducers({
  SourceReducer,
  OutputReducer
});

const Store = createStore(
  mainReducer,
  applyMiddleware(thunkMiddleware)
);

export default Store;
