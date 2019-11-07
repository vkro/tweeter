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
    const $newTweet = `
    <article class="tweet">
      <header class="tweet-header">
        <img class="tweet-avatar" src=${tweet.user.avatars}>
        <span class="tweet-name">${tweet.user.name}</span>
        <span class="tweet-handle">${tweet.user.handle}<span>
      </header>
      <p class="tweet-body">${tweet.content.text}</p>
      <footer class="tweet-footer">
        <span class="created-at">${tweet.created_at}</span>
        <span class="tweet-icons">
        <i class="material-icons">flag</i>
        <i class="material-icons">repeat</i>
        <i class="material-icons">favorite</i>
        </span>
      </footer>
    </article>
    `  
    return $newTweet;
  };

  const $tweet = createTweetElement(tweetData);
  $('.tweets-container').append($tweet);
});



