import * as ActionTypes from './ActionTypes';
import Store from '../store';
import axios from 'axios';

const SourceActions = {

  compileSource() {
    console.log(`SourceActions - compileSource()`);
    const source = Store.getState().SourceReducer.source;
    return dispatch => {
      axios.post(
        'http://localhost:1337',
        { source }
      )
      .then(response => {
        const output = response.data
        dispatch(SourceActions.sourceCompiled(output));
      })
    }
  },

  sourceUpdated(source) {
    return { type: ActionTypes.SOURCE_UPDATED, source }
  },

  sourceCompiled(output) {
    return { type: ActionTypes.SOURCE_COMPILED, output }
  }
}

export default SourceActions;
