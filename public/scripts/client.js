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
    
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

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
  }

  // renderTweets(data);

  const preventFormSubmission = function () {
    $("input").click(function (event) {
      event.preventDefault();
      $(".validation-error").hide(0, "swing");
      postNewTweet($('.tweet-input'));
      $(".tweet-input").trigger("reset");
      $(".counter").text(140);
    })
  }

  preventFormSubmission();

  // if (0 < $(".counter").text() && $(".counter").text() < 141) {
  // } else console.log("nope")

  // if (140 < $(".counter").text()) {
  //     console.log("too many characters!")
  //   }

  // module.exports = (delay = 3000, isRandom = false) => {
  //   const wait = isRandom ? Math.floor(Math.random() * delay) : delay;
  //   return new Promise((resolve, reject) => {
  //     setTimeout(reject, wait);
  //   });
  // };


  const postNewTweet = function (input) {

    const inputLength = $("#textArea").val().length;

    if (inputLength === 0) {
      $(".validation-error").text("Oops, you haven't entered any text! Try again.");
      $(".validation-error").slideDown("slow", "swing");
      return
    } else if (140 < inputLength) {
      $(".validation-error").text("Too many characters! Bring it down to 140.");
      $(".validation-error").slideDown("slow", "swing");
      return
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
        console.log("finished")
      })
    }
  }

  const loadTweets = function () {

  $.ajax("/tweets", { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    })
}

loadTweets();

});