import * as ActionTypes from './ActionTypes';
import Store from '../store';
import SourcemapUtil from '../utils/SourcemapUtil';

const MappingActions = {

  mapSelectionOnSource(content, range) {

    // Selecting on the output will trigger a mapped
    // selection on the source.
    const srcmap = Store.getState().CompilationReducer.srcmap;
    const sourceRange = SourcemapUtil.disassemblerRangeToSourceRange(
      content, 
      range,
      srcmap
    );

    // Also, selecting on the output will trigger
    // a modified solection on itself.
    range = SourcemapUtil.expandDisassemblerRange(content, range);

    return dispatch => {
      dispatch(MappingActions.sourceSelected(sourceRange));
      dispatch(MappingActions.outputSelected(range));
    }
  },

  // mapSelectionOnOutput(sourceSelectionRange) {
  //   return dispatch => {
  //     // dispatch(MappingActions.outputSelected(output));
  //   }
  // },

  outputSelected(range) {
    return { type: ActionTypes.OUTPUT_SELECTED, range }
  },

  sourceSelected(range) {
    return { type: ActionTypes.SOURCE_SELECTED, range }
  }
}

export default MappingActions;
