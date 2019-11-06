/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

// Recall that you can use jQuery to construct new elements using the $ function, 
// like so: const $tweet = $("<article>").addClass("tweet");

// $( ".inner" ).append( "<p>Test</p>" );


/*
 * Takes in tweet object 
 * Returns tweet <article> containing HTML structure of tweet
*/


$(document).ready(function() {
  
  const createTweetElement = function (tweet) {
    const $tweet = $("<article>").addClass("tweet");
    const $header = $("<header>").addClass("tweet-header");
    const $img = $("<img>").addClass("tweet-avatar");
    const $name = $("<span>").addClass("tweet-name")
    const $handle = $("<span>").addClass("tweet-handl");
    const $body = $("<p>").addClass("tweet-body");
  
    const $theTweet = $($tweet).append($header, $img, $name);
  
    return $theTweet;
  };

  const test = createTweetElement(tweetData);
  console.log(test);
});



