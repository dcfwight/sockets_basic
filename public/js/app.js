var socket = io(); <!--this is a function defined when we loaded in the io library.-->

socket.on('connect', function() {
    console.log('connected to socket.io server');
    })

// this listens to the specific event that you named in server.js (remember, it can be named anything.)
socket.on('message', function(message){
    console.log('New message');
    console.log(message.text);
    })