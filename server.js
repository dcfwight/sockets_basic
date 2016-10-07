var PORT = process.env.PORT || 3000;
var express = require('express');

var app = express(); // don't need to pass arguments - just use defaults.
var http = require('http').Server(app); // this is a new module tells node to start a new server and to use Express app as the boiler plate
var io = require('socket.io')(http); // this is the format that socket expects - it expects to be passed in the server.

app.use(express.static(__dirname + '/public')) // tells where the server should look for files.

// this is a listener, which listens out for an individual client connecting to the server. socket in the function is the individual connection
io.on('connection', function(socket){
    console.log('user connected via socket.io');
    
    // this makes the server listen for socket emitters - in this case message, so it can emit something to all other connections.
    socket.on('message', function(message) {
        console.log('Message received: '+ message.text);
        socket.broadcast.emit('message', message); // this broadcasts it to everybody BUT the sender. if you wanted to include the sender too, use io.emit
    
    })
    
    // emit takes two arguments - first is the event name, which can be anything you want. Second argument is whatever data you want to emit.
    // in this case it is an object, as you can store lots of different things.
    socket.emit('message',{
            text: 'Welcome to the chat application!'
        } )
}); // this allows you to listen for events. First argument is the name of the event.

http.listen(PORT, function(){
    console.log('Server started on Port: ' + PORT);
});

