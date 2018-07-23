import * as ActionTypes from './ActionTypes';
import Store from '../store';
import Disassembler from '../utils/DisassemblerUtil';
import CompilerUtil from '../utils/CompilerUtil';
import MappingActions from './MappingActions';

const CompilationActions = {

  compileSource() {
    console.log(`CompilationActions - compileSource()`);
    const source = Store.getState().SourceReducer.source;
    return async dispatch => {

      // Use solc-js to compile.
      let output = await CompilerUtil.compile(source);
      let srcmap;

      if(output.errors) output = output.errors.join('\n'); // Just errors.
      else {

        // Assuming there is only one contract, so get any key.
        let contract;
        for(var key in output.contracts) {
          contract = output.contracts[key];
        }
        output = contract['runtimeBytecode'];
        srcmap = contract['srcmapRuntime'];

        // Disassemble.
        output = Disassembler.disassemble(output);
      }

      dispatch(CompilationActions.sourceCompiled(output, srcmap || ''));

      // Compilation resets source mappings.
      dispatch(MappingActions.outputSelected({start: 0, end: 0}));
      dispatch(MappingActions.sourceSelected({start: 0, end: 0}));
    }
  },

  sourceUpdated(source) {
    return { type: ActionTypes.SOURCE_UPDATED, source }
  },

  sourceCompiled(output, srcmap) {
    return { type: ActionTypes.SOURCE_COMPILED, output, srcmap }
  }
}

export default CompilationActions;
