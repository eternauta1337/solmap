// NOTE: BrowserSolc is not used as a regular npm dependency.
// Instead, it is included as a global variable injected from a script in index.html.

const compilerVersion = 'soljson-v0.4.24+commit.e67f0147.js';

const CompilerUtil = {

  compile(source) {
    return new Promise((resolve, reject) => {
    
      if(!CompilerUtil.compiler) {
        reject(`Compiler is not ready yet...`);
        return;
      }

      // Build solc standard json interface object.
      const sources = { "Source": source };
      const options = { optimize: false };
      const json = CompilerUtil.buildStandardJSONInput(sources, options)
      const output = CompilerUtil.compiler.compileStandardWrapper(json);

      resolve(output);
    });
  },

  buildStandardJSONInput(sources, options) {
    const newSources = {};
    for(let contractKey in sources) {
      const contractContent = sources[contractKey];
      newSources[contractKey] = {
        content: contractContent
      };
    }
    const nativeSources = {
      language: "Solidity",
      sources: newSources,
      settings: {
        optmizer: {
          enabled: options.optimize
        },
        outputSelection: {
          "*": {
            "*": [
              "evm.bytecode.opcodes", 
              "evm.bytecode.sourceMap",
              "evm.deployedBytecode.opcodes",
              "evm.deployedBytecode.sourceMap"
            ]
          }
        }
      }
    };
    const nativeSourcesStr = JSON.stringify(nativeSources);
    return nativeSourcesStr;
  },

  parseStandardJSONOutputErrors(errors) {
    if(!errors || errors.length === 0) return errors;
    const newErrors = [];
    for(let i = 0; i < errors.length; i++) {
      newErrors.push(errors[i].formattedMessage);
    }
    return newErrors;
  },

  getCompiler() {
    console.log(`CompilerUtil - getCompiler(${compilerVersion})`);
    return new Promise(resolve => {
      console.log(`  retrieving compiler...`);
      window.BrowserSolc.loadVersion(compilerVersion, compiler => {
        console.log(`  compiler retrieved.`);
        CompilerUtil.compiler = compiler;
        console.log(`  COMPILER: `, compiler);
        resolve();
      })
    });
  },

  getVersions() {
    if(window.BrowserSolc) {
      window.BrowserSolc.getVersions((sources, releases) => {
        console.log(releases);
      });
    }
  }
}

module.exports = CompilerUtil;
