import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import SourceReducer from './reducers/SourceReducer';
import CompilationReducer from './reducers/CompilationReducer';
import MappingReducer from './reducers/MappingReducer';

const mainReducer = combineReducers({
  SourceReducer,
  CompilationReducer,
  MappingReducer
});

const Store = createStore(
  mainReducer,
  applyMiddleware(thunkMiddleware)
);

export default Store;
