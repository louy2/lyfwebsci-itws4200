var express = require('express');

var Twitter = require('ntwitter'),
    fs = require('fs'),
    assert = require('assert');

var cred = require('./cred.js');

function getTwitterStream(n){
  var i = 0;
  var t = new Twitter(cred);
  var r = fs.createWriteStream('./tweets.json');
  r.write('[');

  t.stream('statuses/sample', function(stream) {
    stream.on('data', function(data) {
      r.write(JSON.stringify(data));
      console.log(i);
      if (i++ < n) {
        r.write(',');
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
}

function json2csv(json) {
  data = JSON.parse(json);
  header = Object.getOwnPropertyNames(data[0]);
  //header.foreach(function(ele, ind, arr) {
    //ele = "\"" + ele + "\"";
  //});
  header = header.toString();
  csv = header + "\n";
  data.foreach(function(ele, ind, arr) {
    for (var prop in ele) {
      if (ele.hasOwnProperty(prop)) {
        buf = ele[prop];
        if (typeof buf == 'string') {
          csv += buf;
          continue;
        } else if (Array.isArray(buf)) {
          csv += buf.toString();
        } else if (typeof buf == 'object') {
        }
        csv += ele[prop].toString;
      }
    }
  });
}

app = express();

app.get('/', function(req, res) {
  app.use(express.static('view.html'));
});

var server = app.listen(4000, function() {
  console.log('Listening on port %d', server.address().port);
});

