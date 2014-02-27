<!DOCTYPE html>
<head>
<title>Twitter Ticker</title>
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
</head>
<body>
<!--place the ticker-->
<section class="twittertick">
</section>
<!--load tticker files-->
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
$data = 'Initialized';
try {
    $data = $twitter->buildOauth($url,$requestMethod)->performRequest(true);
} catch (Exception $e) {
    $data = 'Failed.';
}

?>
<?php
// require('getTweets.php');
echo $data;
?>
<!--jQuery-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<!--jQuery Mobile-->
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.1/jquery.mobile-1.4.1.min.css" />
<script src="http://code.jquery.com/mobile/1.4.1/jquery.mobile-1.4.1.min.js"></script>
<!--tticker mobile-->
<script type="text/javascript">
var data = <?php echo $data; ?>
</script>
<script src="ttickerm.js" type="text/javascript"></script>
<link rel="stylesheet" href="ttickerm.css" type="text/css" media="all" />
</body>
</html>
