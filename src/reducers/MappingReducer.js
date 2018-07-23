import * as ActionTypes from '../actions/ActionTypes';

const initialState = { 
  name: 'MappingReducer',
  sourceSelRange: {start: 0, end: 0},
  outputSelRange: {start: 0, end: 0}
};

const MappingReducer = (state = initialState, action) => {
  let newState = state;

  if(action.type === ActionTypes.SOURCE_SELECTED) {
    newState = {
      ...state,
      sourceSelRange: action.range
    };
  }

  if(action.type === ActionTypes.OUTPUT_SELECTED) {
    newState = {
      ...state,
      outputSelRange: action.range
    };
  }

  return newState;
};

export default MappingReducer;
