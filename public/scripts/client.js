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
    const $avatar = $("<img>").addClass("tweet-avatar")
    const $name = $("<span>").addClass("tweet-name")
    const $handle = $("<span>").addClass("tweet-handle");
    const $body = $("<p>").addClass("tweet-body");
    const $footer = $("<footer>").addClass("tweet-footer");
    const $createdAt = $("<span>").addClass("created-at");
    const $tweetIcons = $("<span>").addClass("tweet-icons");
    const $flag = $("<i>").addClass("material-icons");
    const $repeat = $("<i>").addClass("material-icons");
    const $favorite = $("<i>").addClass("material-icons");

    $avatar.attr("src", tweet.user.avatars);
    $name.append(tweet.user.name);
    $handle.append(tweet.user.handle);
    $header.append($avatar, $name, $handle);
    $body.append(tweet.content.text);
    $flag.append("flag");
    $repeat.append("repeat");
    $favorite.append("favorite");
    $tweetIcons.append($flag, $repeat, $favorite);
    $createdAt.append(tweet.created_at);
    $footer.append($createdAt, $tweetIcons);



    const $theTweet = $($tweet).append($header).append($body).append($footer);
  
    return $theTweet;
  };

  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('.tweets-container').append($tweet);
});



