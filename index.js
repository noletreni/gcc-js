var spawn = require('child_process').spawn;

// spawn gcc
var compile = spawn('gcc', ['./test.c']);

compile.stdout.on('data', function(data) {
  console.log(String(data));
});

compile.stderr.on('data', function(data) {
  console.log(String(data));
});
