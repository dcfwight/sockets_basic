var name = getQueryVariable('name') || "Anonymous"; // this gets the query variable assigned to the key 'name'. See js file queryparams.js for details.
var room = getQueryVariable('room');
console.log(name +' joined ' + room + ' room');

var socket = io(); //this is a function defined when we loaded in the io library.-->

socket.on('connect', function() {
    console.log('connected to socket.io server');
    })

// this listens to the specific event that you named in server.js (remember, it can be named anything.)
socket.on('message', function(message){
    console.log('New message');
    console.log(message.text);
    console.log(message.timeStamp);
    
    var $message = jQuery('.messages');
    var momentTimeStamp = moment.utc(message.timestamp);
    var momentString = momentTimeStamp.local().format("h:mm a");
    
    $message.append('<p><strong>'+ message.name + ' '+ momentString+ '</strong></p>');
    $message.append('<p>'+message.text +'</p>');
    // old way of doing similar to above.
    //jQuery('.messages').append('<p><strong>'+momentString + ':</strong> '+ message.text + '</p>');// target by class - start with a period - will select all elements with class 'messages'
    });

// Handles submitting of new message

// the $ before the variable name means that this variable stores a jQuery instance of an element. Meaning that the variable has access to the methods.
var $form = jQuery('#message-form'); // pass a selector to the jQuery - it will select ALL items with those tags, if an id, use  # first.

$form.on('submit', function(event) {
    event.preventDefault(); // when using sockets or Ajax requests on a form, use preventDefault, because you don't want to submit it the old-fashioned way
    // by refreshing the page - you handle the form submission on your own
    
    var $message = $form.find('input[name=message]')
    
    socket.emit('message', {
        name: name,
        text: $message.val() // this is finding a form item with input and an attribute with name of 'message'
        });
    
    
    
    $message.val(''); // this is the instructor way of clearing the input field.
    //document.getElementById('message-form').reset(); // this is one way to reset the input field.
});