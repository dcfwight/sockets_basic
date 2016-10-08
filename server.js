var PORT = process.env.PORT || 3000;
var express = require('express');

var app = express(); // don't need to pass arguments - just use defaults.
var http = require('http').Server(app); // this is a new module tells node to start a new server and to use Express app as the boiler plate
var io = require('socket.io')(http); // this is the format that socket expects - it expects to be passed in the server.
var moment = require('moment');

app.use(express.static(__dirname + '/public')) // tells where the server should look for files.

var clientInfo = {}; // this is going to be a set of key-value pairs - a library of rooms that the user has joined.

// this is a listener, which listens out for an individual client connecting to the server. socket in the function is the individual connection
io.on('connection', function(socket){
    console.log('user connected via socket.io');
    
    // disconnect is a built-in method. Takes no arguments
    socket.on('disconnect', function() {
        // first check if there is any data for this user - i.e. if they are part of any chat room
        var userData = clientInfo[socket.id]
        if (typeof userData !== "undefined") {
            socket.leave(userData.room); // clientInfo only stores the room against the ID
            io.to(userData.room).emit('message', {
                name: "System",
                text: userData.name + " has left",
                timestamp: moment().valueOf()
            });
            delete clientInfo[socket.id]; //removes the data from the clientInfo library.
        }
    });
    
    // listen out for the joinRoom event.
    socket.on('joinRoom', function(req) {
        clientInfo[socket.id] = req; // this is storing the socket info into the clientInfo library object.
        socket.join(req.room); // socket.join IS a built-in method - tells the socket io library to add this socket to a specific room.
        socket.broadcast.to(req.room).emit('message', {
            name: "System",
            text: req.name + ' has joined',
            timestamp: moment().valueOf()
        }); // this is now more specialised - broadcasts ONLY to those in that room.
    });
    
    // this makes the server listen for socket emitters - in this case message, so it can emit something to all other connections.
    socket.on('message', function(message) {
        console.log('Message received: '+ message.text);
        console.log('now is: '+ moment().format());
        message.timestamp = moment().valueOf(); // adds the javascript timeStamp as an attribute of the message object.
        io.to(clientInfo[socket.id].room).emit('message', message);
        //io.emit('message', message); // this emits to ALL people - have since changed it, so that it is just to those in the room.
        //socket.broadcast.emit('message', message); // this broadcasts it to everybody BUT the sender. if you wanted to include the sender too, use io.emit
    
    })
    
    // emit takes two arguments - first is the event name, which can be anything you want. Second argument is whatever data you want to emit.
    // in this case it is an object, as you can store lots of different things.
    // when it is just socket.emit (as opposed to socket.broadcast.emit), then it only applies to that individual socket - that individual browser.
    socket.emit('message', {
            name: "System",
            timestamp: moment().valueOf(),
            text: 'Welcome to the chat application!'
        } )
}); // this allows you to listen for events. First argument is the name of the event.

http.listen(PORT, function(){
    console.log('Server started on Port: ' + PORT);
});

