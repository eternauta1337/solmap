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
      console.log(`  OUTPUT: `, output);
      let srcmap;

      // If there are any errors, display that only.
      if(output.errors) output = CompilerUtil.parseStandardJSONOutputErrors(output.errors).join('\n');
      // Otherwise parse opcodes and source map.
      else {

        // Assuming there is only one contract, so get any key.
        let contract = CompilationActions.getFirstKeyInObject(output.contracts); // Gets object under "Source"
        contract = CompilationActions.getFirstKeyInObject(contract); // Gets object under "<ContractName>"
        let bytecode = contract.evm.bytecode.object;
        let deployedBytecode = contract.evm.deployedBytecode.object;
        srcmap = contract.evm.bytecode.sourceMap + ';' + contract.evm.deployedBytecode.sourceMap;

        // Disassemble.
        output = Disassembler.disassemble(bytecode, deployedBytecode);
      }

      dispatch(CompilationActions.sourceCompiled(output, srcmap || ''));

      // Compilation resets source mappings.
      dispatch(MappingActions.outputSelected({start: 0, end: 0}));
      dispatch(MappingActions.sourceSelected({start: 0, end: 0}));
    }
  },

  getFirstKeyInObject(object) {
    for(var key in object) {
      return object[key];
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
