import * as ActionTypes from './ActionTypes';
import Store from '../store';
import SourcemapUtil from '../utils/SourcemapUtil';

const SelectionActions = {

  // Selecting on the output will trigger a mapped
  // selection on the source.
  mapSelectionOnSource(content, range) {

    const srcmap = Store.getState().OutputReducer.srcmap;
    const sourceRange = SourcemapUtil.disassemblerRangeToSourceRange(
      content, 
      range,
      srcmap
    );

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
