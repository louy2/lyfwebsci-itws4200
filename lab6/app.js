//var express = require('express');
//var http = require('http');

var Twitter = require('ntwitter'),
    fs = require('fs'),
    assert = require('assert');

//var cred = require('./cred.js');

//function getTwitterStream(n){
  //var i = 0;
  //var t = new Twitter(cred);
  //var r = fs.createWriteStream('./tweets.json');
  //r.write('[');

  //t.stream('statuses/sample', function(stream) {
    //stream.on('data', function(data) {
      //r.write(JSON.stringify(data));
      //console.log(i);
      //if (i++ < n) {
        //r.write(',');
      //} else {
        //stream.destroy();
      //}
    //});
    //stream.on('destroy', function(res) {
      //console.log('Destroyed.');
      //console.log(res);
      //r.end(']');
    //});
    //r.on('finish', function() {
      //console.log('Twitter stream fetched.');
    //});
  //});
//}

function json2csv(json) {
  data = JSON.parse(json);
  header = Object.getOwnPropertyNames(data[0]);
  header.foreach(function(ele, ind, arr) {
    ele = "\"" + ele + "\"";
  });
  header = header.toString();
  console.log(header);
  csv = header + "\n";
  data.foreach(function(ele, ind, arr) {
    obj2csv(ele, csv);
  });
  return csv;
}

function obj2csv(ele, csv) {
  for (var prop in ele) {
    if (ele.hasOwnProperty(prop)) {
      buf = ele[prop];
      if (typeof buf == 'string') {
        csv += buf;
        return;
      } else if (Array.isArray(buf)) {
        csv += buf.toString();
        return;
      } else if (typeof buf == 'object') {
        obj2csv(ele, csv);
      }
    }
  }
}

fs.readFile('test.json', function(err, data) {
  if (err) throw err;
  fs.writeFile('test.txt',json2csv(data),function(err){
    if (err) throw err;
    console.log('Conversion successful.');
  });
});

//app = express();

//app.use(express.static(__dirname + '/'));

//http.createServer(app).listen(80, function() {
  //console.log('Listening on port %d', this.address().port);
//});
