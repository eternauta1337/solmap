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
      output = JSON.parse(output);
      let srcmap;

      // If there are any errors, display that only.
      if(output.errors) output = output.errors.join('\n');
      // Otherwise parse opcodes and source map.
      else {

        // Assuming there is only one contract, so get any key.
        let contract;
        for(var key in output.contracts) {
          contract = output.contracts[key][key];
        }
        output = contract.evm.deployedBytecode['object'];
        srcmap = contract.evm.deployedBytecode['sourceMap'];

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
