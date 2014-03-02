var Stream = require('user-stream'),
    fs = require('fs');

var s = new Stream({
    consumer_key: 'BPnEDXJ4XXqxF6iAmyDoA',
    consumer_secret: 'TInoVD5gSOBhev7HUklis9UbpIYxrp5VWY5BGz2id0',
    access_token_key: '141857613-3uixsysSZ18cf3wJOYBDW7LkZv8u2XcBgKkCG5mK',
    access_token_secret: 'geLPRA97oZfMgYfhkjpJXnApdnWqNt3U4OQl5GplJUsXq'
});

s.stream();

s.on('connected', function(){
    console.log('Connected to Twitter');
});

s.on('error', function(type, data) {
    console.log(type + ':' + data)
});

s.on('data', function(json) {
    console.log(json);
});

s.destroy();
