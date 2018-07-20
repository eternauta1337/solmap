import * as ActionTypes from '../actions/ActionTypes';

const initialState = { 
  name: 'OutputReducer',
  outputA: '',
  outputB: ''
};

const OutputReducer = (state = initialState, action) => {
  let newState = state;

  if(action.type === ActionTypes.SOURCE_COMPILED) {
    newState = {
      ...state,
      [`output${action.target}`]: action.output
    };
  }

  return newState;
};

export default OutputReducer;
