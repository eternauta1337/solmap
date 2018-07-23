import * as ActionTypes from '../actions/ActionTypes';

const initialState = { 
  name: 'CompilationReducer',
  output: '',
  srcmap: ''
};

const CompilationReducer = (state = initialState, action) => {
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

export default CompilationReducer;
