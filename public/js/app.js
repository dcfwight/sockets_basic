var socket = io(); <!--this is a function defined when we loaded in the io library.-->

socket.on('connect', function() {
    console.log('connected to socket.io server');
    })