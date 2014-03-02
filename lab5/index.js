var Twitter = require('ntwitter');
var fs = require('fs');
var cred = require('./cred.js');

var t = new Twitter(cred);

twit.stream('statuses/sample', function(stream) {
  stream.on('data', function(data) {
    console.log(data);
  })
});
