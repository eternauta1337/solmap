import * as ActionTypes from '../actions/ActionTypes';

const initialState = { 
  name: 'SelectionReducer',
  sourceSelRange: {start: 0, end: 0},
  outputSelRange: {start: 0, end: 0}
};

const SelectionReducer = (state = initialState, action) => {
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

export default SelectionReducer;
