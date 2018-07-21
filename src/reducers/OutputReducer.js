import * as ActionTypes from '../actions/ActionTypes';

const initialState = { 
  name: 'OutputReducer',
  output: '',
  srcmap: ''
};

const OutputReducer = (state = initialState, action) => {
  let newState = state;

  if(action.type === ActionTypes.SOURCE_COMPILED) {
    newState = {
      ...state,
      output: action.output,
      srcmap: action.srcmap
    };
  }

  return newState;
};

export default OutputReducer;
