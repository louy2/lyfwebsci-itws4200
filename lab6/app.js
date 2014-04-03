//var express = require('express');
//var http = require('http');

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

function json2csv(json) {
  var data = JSON.parse(json);
  // make data an array if not
  if (!Array.isArray(data)) { data = [data]; }
  var header = Object.getOwnPropertyNames(data[0]);
  var headstr = "";
  header.forEach(function(ele, ind, arr) {
    headstr += '"' + ele + '",';
  });
  headstr = headstr.slice(0,-1); // rid of last comma
  var csv = header + "\r\n";
  data.forEach(function(ele, ind, arr) {
    csv += obj2csv(ele, csv);
    csv += "\r\n";
  });
  console.log('Conversion successful.');
  return csv;
}

function obj2csv(ele, csv) {
  for (var prop in ele) {
    var buf = ele[prop];
    csv += '"';
    if (!isNaN(buf)) {
      csv += buf + ',';
    } else if (typeof buf === 'string') {
      csv += '"' + buf + '"';
    } else if (Array.isArray(buf)) {
      buf.forEach(function(ele, ind, arr) {
        csv += '"' + ele + '",';
      });
      csv = headstr.slice(0,-1); // rid of last comma
    } else if (typeof buf === 'object') {
      csv += obj2csv(buf, csv);
    }
    csv += '",';
  }
  csv = csv.slice(0,-1); // rid of last comma
  return csv;
}

//getTwitterStream(10, './testt.json');

fs.readFile('testt.json', function(err, data) {
  if (err) throw err;
  json2csv(data);
  //fs.writeFile('test.csv',json2csv(data),function(err){
    //if (err) throw err;
    //console.log('Conversion saved.');
  //});
});

//app = express();

//app.use(express.static(__dirname + '/'));

//http.createServer(app).listen(80, function() {
  //console.log('Listening on port %d', this.address().port);
//});
