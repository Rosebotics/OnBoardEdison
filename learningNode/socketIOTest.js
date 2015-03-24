var app = require('http').createServer(handler)
var io = require('socket.io')(app, {
  log: false,
  agent: false,
  origins: '*:*'
});
var fs = require('fs');
var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion());
var myOnboardLed = new mraa.Gpio(13);

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    // Trying to fix an access control origin error message.
    // None of this helped, my issue was solved by modifying the client code.
//    res.statusCode = 200;
//    res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.end(data);
  });
}


io.on('connection', function (socket) {
  socket.emit('greeting', { message: 'You are now connected.  -- server' });
  socket.on('btn-control', function (data) {
    console.log(data);
    if (data.msg === "On") {
      console.log("TODO: Turn the LED On");
	 myOnboardLed.write(1);
      socket.emit('real-btn', { message: 'You want the LED on.  I hear you.  -- server' });
    } else if (data.msg === "Off") {
      console.log("TODO: Turn the LED Off");
 	myOnboardLed.write(0);
      socket.emit('real-btn', { message: 'You want the LED OFF.  I hear you.  -- server' });
    } else if (data.msg === "Hello") {
      socket.emit('real-btn', { message: 'Hello back.  -- server' });
    } 
  });
});
