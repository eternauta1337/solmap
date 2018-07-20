import * as ActionTypes from './ActionTypes';
import Store from '../store';
import axios from 'axios';

const SourceActions = {

  compileSource(target, options = '') {
    console.log(`SourceActions - compileSource(), options: ${options}`);
    const source = Store.getState().SourceReducer.source;
    return dispatch => {
      axios.post(
        'http://localhost:1337',
        { source, options }
      )
      .then(response => {
        const output = response.data
        dispatch(SourceActions.sourceCompiled(target, output));
      })
    }
  },

  sourceUpdated(source) {
    return { type: ActionTypes.SOURCE_UPDATED, source }
  },

  sourceCompiled(target, output) {
    return { type: ActionTypes.SOURCE_COMPILED, target, output }
  }
}

export default SourceActions;
