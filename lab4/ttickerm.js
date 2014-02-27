/*
 * Author: Lou Yufan
 * tticker.js:
 *  A simple twitter ticker, automatically displays the tweets.
 */
// Prepare the elements
var tweetscroll = $("<section class=\"tweetscroll\"></section>");
var newTweet = $("<article class=\"tweet\"><aside class=\"avatar\"><img src=\"\" alt=\"\" /></aside><div class=\"twtbody\"><p class=\"text\"></p></div></article>");

var hashscroll = $("<aside class=\"hashscroll\"></aside>");
var newHashtag = $("<a class=\"hashtag\" href=\"\"></a>");

// Get all hashtags from the data beforehand
var hashtags = [];
function getHashtags(tweetdata) {
    var twtwhtg = $.grep(tweetdata, function(tweet, twi){
        return tweet.entities.hashtags.length;
    });
    console.log(twtwhtg);
    $.each(twtwhtg, function(index, tweet){
        hashtags = hashtags.concat(tweet.entities.hashtags);
    });
    console.log(hashtags);
}

// Helper functions to make elements
function fillHashtag(httxt, addht){
    // sets a hashtag anchor's link and text
    console.log(httxt.text);
    addht.attr({
        href: "https://twitter.com/search?q=%23"+httxt.text
    });
    addht.html("#" + httxt.text);
}
function fillTweet(tweetdata, tweetblock) {
    // sets the avatar and text of a tweet
    console.log(tweetdata.text);
    tweetblock.find("img").attr({
        src: tweetdata.user.profile_image_url,
        alt: tweetdata.user.name
    });
    tweetblock.find(".text").text(tweetdata.text);
}

// Initialization function
function initialize(tweetdata) {
    // Initialize by generating the first five elements
    tweetscroll.appendTo(".twittertick");
    for (i = 0; i < 5; i++) {
        var addTweet = newTweet.clone();
        fillTweet(tweetdata[i], addTweet);
        addTweet.appendTo(".tweetscroll");
    }
    hashscroll.appendTo(".twittertick");
    for (i = 0; i < 5; i++) {
        var nht = newHashtag.clone();
        fillHashtag(hashtags[i], nht);
        nht.appendTo(".hashscroll");
    }
    // and generate the sixth empty element
    newTweet.clone().appendTo(".tweetscroll");
    newHashtag.clone().appendTo(".hashscroll");
}

// Generate later elements starting from the 5th data
var twti = 5, hti = 5;

// Scrolls the elements
function scroll(tweetdata) {
    // slide everything down first
    $(".tweet").addClass("slidedown");
    $(".hashtag").addClass("slidedown");
    // then remove the last element
    var addTweet = $(".tweet:last-child").remove();
    var addht = $(".hashtag:last-child").remove();
    // track the remaining of data
    if (twti >= tweetdata.length-1) {
        twti = 0;
    } else {
        ++twti;
    }
    if (hti >= hashtags.length-1) {
        hti = 0;
    } else {
        ++hti;
    }

    // generate the elements to be added
    fillTweet(tweetdata[twti], addTweet);
    fillHashtag(hashtags[hti], addht);
    addTweet.addClass("hidden");
    addht.addClass("hidden");
    addTweet.removeClass("slidedown");
    addht.removeClass("slidedown");

    // insert the new elements into document
    $(".tweet").one("transitionend", function(){
            addTweet.prependTo(".tweetscroll");
            setTimeout(function(){
                addTweet.addClass("fadeIn").removeClass("hidden");
                }, 10);
            $(".tweet").removeClass("slidedown");
            });
    $(".hashtag").one("transitionend", function(){
            addht.prependTo(".hashscroll");
            setTimeout(function(){
                addht.addClass("fadeIn").removeClass("hidden");
                }, 10);
            $(".hashtag").removeClass("slidedown");
            });
    addTweet.one("transitionend", function(){
            addTweet.removeClass("fadeIn");
            });
    addht.one("transitionend", function(){
            addht.removeClass("fadeIn");
            });
}

function scroll() {
    // slide everything down first
    $(".tweet").addClass("slidedown");
    $(".hashtag").addClass("slidedown");
    // then remove the last element
    var addTweet = $(".tweet:last-child").remove();
    var addht = $(".hashtag:last-child").remove();

    addTweet.addClass("hidden");
    addht.addClass("hidden");
    addTweet.removeClass("slidedown");
    addht.removeClass("slidedown");

    // insert the new elements into document
    $(".tweet").one("transitionend", function(){
            addTweet.prependTo(".tweetscroll");
            setTimeout(function(){
                addTweet.addClass("fadeIn").removeClass("hidden");
                }, 10);
            $(".tweet").removeClass("slidedown");
    });
    $(".hashtag").one("transitionend", function(){
            addht.prependTo(".hashscroll");
            setTimeout(function(){
                addht.addClass("fadeIn").removeClass("hidden");
                }, 10);
            $(".hashtag").removeClass("slidedown");
    });
    addTweet.one("transitionend", function(){
            addTweet.removeClass("fadeIn");
    });
    addht.one("transitionend", function(){
            addht.removeClass("fadeIn");
    });
}

// Start everything after document is loaded
$(document).ready(function() {
    /*$.ajax({
        dataType: "json",
        url: "tweets.json",
        success: function(data, textStatus, xhr) {
            getHashtags(data);
            initialize(data);
            setInterval(function(){scroll(data);}, 3000);
        }
    });*/
    setInterval(function(){scroll();}, 3000);
});
