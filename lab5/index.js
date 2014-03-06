var express = require('express');

var Twitter = require('ntwitter'),
    fs = require('fs'),
    assert = require('assert');

var cred = require('./cred.js');

app = express();

app.get('/', function(req, res) {
  res.send('Hello World');
});

var server = app.listen(4000, function() {
  console.log('Listening on port %d', server.address().port);
});

var n = 1000;
/*try {
  n = process.argv[2];
} catch (err) {
  console.log('Usage: node index.js <number of tweets>');
  console.log(err);
  process.exit(1);
}*/

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

