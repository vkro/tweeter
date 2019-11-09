/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // Takes in tweet object 
  // Returns tweet <article> containing HTML structure of tweet

  const createTweetElement = function (tweet) {

    const timeSinceTweet = howLongAgoWasThisTweetCreated(tweet);
    
    // this will prevent XSS before we do anything with the tweet input
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    // make a new tweet article from the user input
    const $newTweet = `
    <article class="tweet">
    <header class="tweet-header">
    <img class="tweet-avatar" src=${tweet.user.avatars}>
        <span class="tweet-name">${tweet.user.name}</span>
        <span class="tweet-handle">${tweet.user.handle}<span>
      </header>
      <p class="tweet-body">${escape(tweet.content.text)}</p>
      <footer class="tweet-footer">
        <span class="created-at">${timeSinceTweet}</span>
        <span class="tweet-icons">
        <i class="material-icons">flag</i>
        <i class="material-icons">repeat</i>
        <i class="material-icons">favorite</i>
        </span>
      </footer>
    </article>
    `;
    return $newTweet;
  };

  // Takes in array of tweets
  // Calls createTweetElement for each tweet
  // Appends tweets to the tweets container

  const renderTweets = function (tweets) {

    const $renderTweetsArray = [];
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $renderTweetsArray.unshift(tweetElement);
    }
    ($('.tweets-container')).prepend($renderTweetsArray);
  };

  // Prevent default submit behaviour
  // Hide validation error (until triggered)
  // Send the tweet to be posted
  // Reset the form and char counter

  const preventFormSubmission = function () {

    $("input").click(function (event) {
      event.preventDefault();
      $(".validation-error").hide(0, "swing");
      postNewTweet($('.tweet-input'));
      $(".tweet-input").trigger("reset");
      $(".counter").text(140);
    });
  };

  preventFormSubmission();

  // Check for valid input (show validation error message to user if invalid)
  // Otherwise add tweets to tweets container and set focus back to text input field

  const postNewTweet = function (input) {

    const inputLength = $("#textArea").val().length;

    if (inputLength === 0) {
      $(".validation-error").text("Oops, you haven't entered any text! Try again.");
      $(".validation-error").slideDown("slow", "swing");
      return;
    } else if (140 < inputLength) {
      $(".validation-error").text("Too many characters! Bring it down to 140.");
      $(".validation-error").slideDown("slow", "swing");
      return;
    } else {
      $.post("/tweets", input.serialize())
      .done(function (result) {
        ($('.tweets-container')).prepend(createTweetElement(result));
        $("#textArea").focus();
      })
      .fail(function (xhr, textStatus, errorThrown) {
        console.log(errorThrown);
      })
      .always(function () {
        console.log("finished");
      })
    }
  };

  // load the tweets without reloading page  

  const loadTweets = function () {
    $.ajax("/tweets", { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    });
  };
  
  loadTweets();

});