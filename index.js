var http = require('http');
var fs = require('fs');
var spawn = require('child_process').spawn;
var answers = require('./answers.js');

var server = http.createServer(function(req, res) {
  if (req.method === 'POST') {
    console.log('POST');
  } else {
    console.log('GET');
  }
});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening');


// spawn gcc
var compile = spawn('gcc', ['-std=c11', './test.c']);

compile.stdout.on('data', function(data) {
  console.log(String(data));
});
compile.stderr.on('data', function(data) {
  console.log(String(data));
});

compile.on('close', function(data) {
  if (data === 0) {
    var run = spawn('./a.out', []);
    var result;

    run.stdout.on('data', function(output) {
      result = String(output);
      console.log(result);
    });
    run.stderr.on('data', function(output) {
      console.log(String(output));
    });
    run.on('close', function(output) {
      console.log('Exited with code ' + output);
      if (result === answers.out[0]) {
        console.log('TEST PASSED');
      } else {
        console.log('TEST FAILED');
      }
    });
  }
});
