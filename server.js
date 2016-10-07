var PORT = process.env.PORT || 3000;
var express = require('express');

var app = express(); // don't need to pass arguments - just use defaults.
var http = require('http').Server(app); // this is a new module tells node to start a new server and to use Express app as the boiler plate

app.use(express.static(__dirname + '/public')) // tells where the server should look for files.

http.listen(PORT, function(){
    console.log('Server started on Port: ' + PORT);
});

