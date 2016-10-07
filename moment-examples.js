var moment = require('moment');

var now = moment();// now variable is now a moment object.

console.log(now.format()); // no arguments defaults to the basic timestamp.

now.subtract(1, 'year') // can subtract any unit of time.has counterpart now.add() 

console.log(now.format());

console.log(now.format("h:mma")); // challenge - print like 6:45 pm - go to moment.js docs to see all the formatting options.

// challeng - add detail to the timestamp - add month and day of the month - Oct 5th 2015, 6:45pm

console.log(now.format("MMM Do YYYY, h:mma"));

console.log('Unix timestamp is: '+now.format('X')); // this is the format for the UNIX timestamp - number of seconds since 1/1/1970.

console.log('Unix timestamp in milliseconds is: '+ now.format('x')); // this is the UNIX format, but in milliseconds.

//these were all strings previously. to get the number value:
console.log('The value of the timestamp - i.e. integer is:')
console.log(now.valueOf());
console.log(typeof now.valueOf());

var timestamp = 1444252073962; // timestamp cut and pasted when working on the course. It is an exact point in time.
var timestampMoment = moment.utc(timestamp); // load that point in time up to a moment object.
console.log(timestampMoment.format("h:mm a")); // format as 11:06am - this is now UTC time - we want local.

console.log(timestampMoment.local().format("h:mm a")); // now formatted as local time.
