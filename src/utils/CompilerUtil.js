// NOTE: BrowserSolc is not used as a regular npm dependency.
// Instead, it is included as a global variable injected from a script in index.html.

// const compilerVersion = 'https://ethereum.github.io/solc-bin/bin/soljson-v0.4.24+commit.e67f0147.js';
const compilerVersion = `https://chriseth.github.io/solc-bin/soljson.js?45678asfdkasdf1234`

const CompilerUtil = {

  compile(source) {
    return new Promise((resolve, reject) => {
    
      if(!CompilerUtil.compiler) {
        reject(`Compiler is not ready yet...`);
        return;
      }

      // Build solc standard json interface object.
      const sources = { "Source": source };
      const json = CompilerUtil.buildStandardJSONInput(sources)
      console.log(`    INPUT: `, JSON.parse(json));
      // console.log(`  INPUT: `, json);
      let output; 
      try {
        output = CompilerUtil.compiler.compileStandardWrapper(json);
      }
      catch(err) {
        reject(err);
      }

      resolve(output);
    });
  },

  buildStandardJSONInput(sources) {
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
        optimizer: {
          enabled: true,
          runs: 200
        },
        outputSelection: {
          "*": {
            "*": [
              "metadata",
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
