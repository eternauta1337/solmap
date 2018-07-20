import * as ActionTypes from './ActionTypes';
import Store from '../store';

const SelectionActions = {

  mapSelectionOnSource(outputSelectionRange) {

    // Selecting on the output will trigger a mapped
    // selection on the source.
    const sourceRange = {
      start: 0,
      end: 1
    }

    return dispatch => {
      dispatch(SelectionActions.sourceSelected(sourceRange));
    }
  },

  // mapSelectionOnOutput(sourceSelectionRange) {
  //   return dispatch => {
  //     // dispatch(SelectionActions.outputSelected(output));
  //   }
  // },

  outputSelected(range) {
    return { type: ActionTypes.OUTPUT_SELECTED, range }
  },

  sourceSelected(range) {
    return { type: ActionTypes.SOURCE_SELECTED, range }
  }
}

export default SelectionActions;
