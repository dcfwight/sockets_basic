var PORT = process.env.PORT || 3000;
var express = require('express');

var app = express(); // don't need to pass arguments - just use defaults.
var http = require('http').Server(app); // this is a new module tells node to start a new server and to use Express app as the boiler plate
var io = require('socket.io')(http); // this is the format that socket expects - it expects to be passed in the server.

app.use(express.static(__dirname + '/public')) // tells where the server should look for files.

io.on('connection', function(){
    console.log('user connected via socket.io');    
}); // this allows you to listen for events. First argument is the name of the event.

http.listen(PORT, function(){
    console.log('Server started on Port: ' + PORT);
});

