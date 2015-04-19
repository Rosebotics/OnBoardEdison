//Type Node.js Here :)

// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;

function puts(error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
}

// executes `pwd`
child = exec("node /home/root/github/OnBoardEdison/learningNode/socketIOTest.js", puts);