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

      // Attempt compilation more than once if necessary.
      CompilationActions.compileTries = 0;
      while(CompilationActions.compileTries < 3) {
        await CompilationActions.attemptCompilation(source, dispatch);
      }
    }
  },

  attemptCompilation(source, dispatch) {
    CompilationActions.compileTries++;
    console.log(`  attemptCompilation(), try: ${CompilationActions.compileTries}`);
    return new Promise((resolve, reject) => {
      
      // Use solc-js to compile.
      CompilerUtil.compile(source)
        .then(output => {
          console.log(`    Compilation succeeded.`);
          
          // Parse output.
          output = JSON.parse(output);
          console.log(`    OUTPUT: `, output);

          // If there are any errors, display that only.
          let srcmap;
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
        })
        .catch(err => {
          console.log(`  Compilation errored.`);
          CompilationActions.attemptCompilation(source, dispatch);
        })
    });
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
