const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const URL = 'http://localhost'
const PORT = 1337;
const app = express();

// Greet
app.listen(PORT, () => {
  console.log(`Listening on ${URL}:${PORT}`);
});

// TODO: review this hack, currently needed for not getting the error "cannot set headers after they are sent to the client"
app.use(function(req,res,next){
    var _send = res.send;
    var sent = false;
    res.send = function(data){
        if(sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `${URL}:3000`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Enable JSON parsing in post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoints
app.post('/', (req, res) => {

  const source = req.body.source;
  let options = req.body.options;

  // Extract non solc options.
  const evmdis = options.includes('--bin') && options.includes('--evmdis');
  if(evmdis) options = options.replace('--evmdis', '');
  const disasm= options.includes('--bin') && options.includes('--disasm');
  if(disasm) options = options.replace('--disasm', '');
  const evmrun= options.includes('--bin') && options.includes('--evmrun');
  if(evmrun) options = options.replace('--evmrun', '');

  const needsFile = evmdis | disasm | evmrun;
  const ext = options.includes(`--bin-runtime`) ? `bin-runtime` : `bin`;

  // Pipe incoming solidity source code to solc...
  exec(
    `echo "${source}" | solc ${options} ${needsFile ? `-o output --overwrite` : ``}`,
    (err, stdout, stderr) => {

      if(evmdis) { // Pipe solc output to evmdis...
        exec(
          `cat output/Sample.${ext} | evmdis`,
          (err, stdout, stderr) => {
            res.send(`${stderr}${stdout}`);
          }
        );
      }
      else if(disasm) { // Pipe solc output to disasm...
        exec(
          `cat output/Sample.${ext} | disasm`,
          (err, stdout, stderr) => {
            res.send(`${stderr}${stdout}`);
          }
        );
      }
      else if(evmrun) { // Pipe solc output to evm...
        exec(
          `evm --debug --code $(cat output/Sample.${ext}) run`,
          (err, stdout, stderr) => {
            res.send(`${stderr}${stdout}`);
          }
        );
      }
      else { // Plain solc output...

        // Send plain solc output.
        res.send(`${stderr}${stdout}`);
      }
    }
  ); 
});
