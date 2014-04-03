var express = require('express');
var http = require('http');

var Twitter = require('ntwitter'),
    fs = require('fs'),
    assert = require('assert');

var cred = require('./cred.js');

function getTwitterStream(n, f){
  var i = 0;
  var t = new Twitter(cred);
  var r = fs.createWriteStream(f);
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

function str2csv(s) {
  return '"' + s + '"';
}

function arr2csv(arr) {
  var csv = '';
  arr.forEach(function(u,i,a){
    if (!isNaN(u)) {
      csv += u;
    } else if (typeof u === 'string') {
      csv += '"' + u + '"';
    } else if (Array.isArray(u)) {
      csv += arr2csv(u);
    } else if (typeof u === 'object') {
      csv += obj2csv(u);
    }
    csv += ',';
  });
  return csv.slice(0,-1);
}

function json2csv(json) {
  var data = JSON.parse(json);
  // make data an array if not
  if (!Array.isArray(data)) { data = [data]; }
  var header = '';
  for (var prop in data[0]) {
    header += '"' + prop + '",';
  }
  header = header.slice(0,-1) + '\r\n';
  console.log(header);
  var csv = '';
  data.forEach(function(ele, ind, arr) {
    csv += obj2csv(ele);
    csv += "\r\n";
  });
  console.log('Conversion successful.');
  return header + csv;
}

function obj2csv(ele) {
  var csv = '';
  for (var prop in ele) {
    var buf = ele[prop];
    if (!isNaN(buf)) {
      csv += buf;
    } else if (typeof buf === 'string') {
      csv += '"' + buf + '"';
    } else if (Array.isArray(buf)) {
      csv += arr2csv(buf);
    } else if (typeof buf === 'object') {
      csv += obj2csv(buf, csv);
    }
    csv += ',';
  }
  return csv.slice(0,-1);
}


app = express();

app.use(express.static(__dirname + '/'));

app.get('/getTweets', function(req, res) {
  if (isNaN(req.query.n)) {
    throw new Error("Query is not a number.");
  } else {
    getTwitterStream(req.query.n,'testt.json');
  }
  res.redirect('/');
});

app.get('/tweets.csv', function(req, res) {
  fs.readFile('testt.json', function(err, data) {
    if (err) throw err;
    fs.writeFile('test.csv',json2csv(data),function(err){
      if (err) throw err;
      console.log('Conversion saved.');
    });
  });
  res.download('test.csv','test.csv');
});

http.createServer(app).listen(80, function() {
  console.log('Listening on port %d', this.address().port);
});
