var Twitter = require('ntwitter');
var fs = require('fs');
var cred = require('./cred.js');
var assert = require('assert')

var n;
try {
  n = process.argv[2];
} catch (err) {
  console.log('Usage: node index.js <number of tweets>');
  console.log(err);
  process.exit(1);
}

var i = 0;
var t = new Twitter(cred);
var r = fs.createWriteStream('./tweets.json');
r.write('[');

t.stream('statuses/sample', function(stream) {
  stream.on('data', function(data) {
    r.write(JSON.stringify(data));
    console.log(i);
    if (i++ < n) {
      r.write(',')
    } else {
      stream.destroy();
    }
  });
  stream.on('destroy', function(res) {
    console.log('Destroyed.');
    console.log(res);
    r.end(']');
  });
  r.on('finish', function() {
    console.log('Twitter stream fetched.');
  });
});

