import * as ActionTypes from '../actions/ActionTypes';

const defaultSource = 
`pragma solidity ^0.4.21;

contract Sample {
  
  int x;

  function add(int a, int b) public {
    x = a + b;
  }
}`

const initialState = { 
  name: 'SourceReducer',
  source: defaultSource
};

const SourceReducer = (state = initialState, action) => {
  let newState = state;

  if(action.type === ActionTypes.SOURCE_UPDATED) {
    newState = {
      ...state,
      source: action.source
    }
  }

  return newState;
};

export default SourceReducer;
