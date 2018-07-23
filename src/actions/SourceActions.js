import * as ActionTypes from './ActionTypes';
import Store from '../store';
import axios from 'axios';
import Disassembler from '../utils/DisassemblerUtil';
import CompilerUtil from '../utils/CompilerUtil';
import SelectionActions from './SelectionActions';

const SourceActions = {

  compileSource() {
    console.log(`SourceActions - compileSource()`);
    const source = Store.getState().SourceReducer.source;
    return async dispatch => {

      // Compile using solc-js.
      const output = CompilerUtil.compile(sources);

      // Parse output.
      let output; 
      let srcmap;
      if(resp.errors) output = resp.errors; // Just errors.
      else {

        // Parse json compilation results for binary and sourcemap.
        output = JSON.parse(resp.output);
        
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

      //   dispatch(SourceActions.sourceCompiled(output, srcmap || ''));

      //   // Compilation resets source mappings.
      //   dispatch(SelectionActions.outputSelected({start: 0, end: 0}));
      //   dispatch(SelectionActions.sourceSelected({start: 0, end: 0}));
      // Compile using native solc.
      // (Requires server running).
      // return;
      // axios.post(
      //   'http://localhost:1337',
      //   { source }
      // )
      // .then(response => {

      //   const resp = response.data

      //   // Parse output.
      //   let output; 
      //   let srcmap;
      //   if(resp.errors) output = resp.errors; // Just errors.
      //   else {

      //     // Parse json compilation results for binary and sourcemap.
      //     output = JSON.parse(resp.output);
          
      //     // Assuming there is only one contract, so get any key.
      //     let contract;
      //     for(var key in output.contracts) {
      //       contract = output.contracts[key];
      //     }
      //     output = contract['bin-runtime'];
      //     srcmap = contract['srcmap-runtime'];

      //     // Disassemble.
      //     output = Disassembler.disassemble(output);
      //   }

      //   dispatch(SourceActions.sourceCompiled(output, srcmap || ''));

      //   // Compilation resets source mappings.
      //   dispatch(SelectionActions.outputSelected({start: 0, end: 0}));
      //   dispatch(SelectionActions.sourceSelected({start: 0, end: 0}));
      // })
    }
  },

  sourceUpdated(source) {
    return { type: ActionTypes.SOURCE_UPDATED, source }
  },

  sourceCompiled(output, srcmap) {
    return { type: ActionTypes.SOURCE_COMPILED, output, srcmap }
  }
}

export default SourceActions;
