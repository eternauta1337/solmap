import * as ActionTypes from './ActionTypes';
import Store from '../store';
import Disassembler from '../utils/DisassemblerUtil';
import CompilerUtil from '../utils/CompilerUtil';
import MappingActions from './MappingActions';
const isHex = require('is-hex');

const CompilationActions = {

  compileSource() {
    console.log(`CompilationActions - compileSource()`);
    const source = Store.getState().SourceReducer.source;
    return async dispatch => {

      // Source or bytecode?
      if(isHex(source)) {
        CompilationActions.broadcastCompilation(
          source, 
          ``,
          undefined,
          dispatch,
          undefined
        );
      }
      else {
        CompilationActions.compileTries = 0;
        while(CompilationActions.compileTries < 3) {
          await CompilationActions.attemptCompilation(source, dispatch);
        }
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
          let bytecode = '';
          let deployedBytecode = '';
          if(output.errors) {
            output = CompilerUtil.parseStandardJSONOutputErrors(output.errors).join('\n');
            CompilationActions.broadcastCompilation(
              undefined, 
              ``,
              undefined,
              dispatch,
              output
            );
          }
          // Otherwise parse opcodes and source map.
          else {

            // Assuming there is only one contract, so get any key.
            let contract = CompilationActions.getFirstKeyInObject(output.contracts); // Gets object under "Source"
            contract = CompilationActions.getFirstKeyInObject(contract); // Gets object under "<ContractName>"
            bytecode = contract.evm.bytecode.object;
            deployedBytecode = contract.evm.deployedBytecode.object;
            srcmap = contract.evm.bytecode.sourceMap + ';' + contract.evm.deployedBytecode.sourceMap;

            CompilationActions.broadcastCompilation(
              bytecode, 
              deployedBytecode,
              srcmap,
              dispatch,
              undefined
            );
          }
        })
        .catch(err => {
          console.log(`  Compilation errored.`);
          CompilationActions.attemptCompilation(source, dispatch);
        })
    });
  },

  broadcastCompilation(bytecode, deployedBytecode, srcmap, dispatch, errors) {
    
    // Disassemble.
    let output = errors ? errors : Disassembler.disassemble(bytecode, deployedBytecode);
  
    // Update output.
    dispatch(CompilationActions.sourceCompiled(output, srcmap || ''));

    // Compilation resets source mappings.
    dispatch(MappingActions.outputSelected({start: 0, end: 0}));
    dispatch(MappingActions.sourceSelected({start: 0, end: 0}));
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
