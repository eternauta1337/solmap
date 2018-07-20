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

        const resp = response.data

        // Parse output.
        let output; 
        if(resp.errors) output = resp.errors;
        else {
          output = resp.output;

          // Trim non hex data from the output.
          const matches = output.match(/[A-Fa-f0-9]+/g, 'xx');
          output = matches[matches.length - 1];
        }

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
