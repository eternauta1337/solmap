import * as ActionTypes from './ActionTypes';
import Store from '../store';

const SelectionActions = {

  // Selecting on the output will trigger a mapped
  // selection on the source.
  mapSelectionOnSource(content, range) {

    // Transalete output text selection range
    // to instruction number range.
    function findInstructionNum(content, pos) {

      // Sweep back from pos looking for returns.
      // Remember where spaces are found.
      // When a return is found, read the instruction number.
      let prevChar = "";
      let spaceIdx = 1;
      let char = content.charAt(pos);
      while(pos !== 0 && prevChar !== "\n") {
        char = content.charAt(pos);
        if(char === " ") spaceIdx = pos;
        pos--;
        prevChar = content.charAt(pos - 1);
      }
      return parseInt(content.substring(pos, spaceIdx));
    }
    const start = findInstructionNum(content, range.start);
    const end = findInstructionNum(content, range.end);
    console.log(start, end);

    // Use the sourcemap to translate instruction number range
    // to source coordinates.
    const srcmap = Store.getState().OutputReducer.srcmap;
    console.log(srcmap);
    const sourceRange = {
      start: 0,
      end: 100
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
