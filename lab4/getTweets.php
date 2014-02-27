<?php

require('TwitterAPIExchange.php');
require('credential.php');

$settings = array(
    'oauth_access_token' => $access_token,
    'oauth_access_token_secret' => $access_secret,
    'consumer_key' => $API_key,
    'consumer_secret' => $API_secret
);

$requestMethod = 'GET';
$url = 'https://api.twitter.com/1.1/statuses/home_timeline';

$twitter = new TwitterAPIExchange($settings);
$data = "";
try {
    $data = $twitter->buildOauth($url,$requestMethod)->performRequest(true);
} catch (Exception $e) {
    $data = "Failed.";
}

?>
