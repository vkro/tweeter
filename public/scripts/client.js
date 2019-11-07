/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

//////////////////////////////////////////////////////
//                                                  //
//   MOVE HELPERS AND LINK AS SCRIPTS IN HTML FILE  //
//                                                  //
//////////////////////////////////////////////////////

// Takes in number representing # of seconds
// Converts into minutes, days, hours, weeks, and years
// Returns these values in an object

const unitsOfTime = function (seconds) {

  let secondsLeft = seconds;

  const centuries = Math.floor(secondsLeft / (604800 * 52000))
  secondsLeft = secondsLeft - (centuries * 604800 * 52000)

  const decades = Math.floor(secondsLeft / (604800 * 520))
  secondsLeft = secondsLeft - (decades * 604800 * 520)

  const years = Math.floor(secondsLeft / (604800 * 52));
  secondsLeft = secondsLeft - (years * 604800 * 52);

  const months = Math.floor(secondsLeft / (68400 * 30));
  secondsLeft = secondsLeft - (months * 68400 * 30);

  const days = Math.floor(secondsLeft / 68400);
  secondsLeft = secondsLeft - (days * 68400);

  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft - (hours * 3600);

  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft - (minutes * 60)

  const timeBreakdown = {
    centuries,
    decades,
    years,
    months,
    days,
    hours,
    minutes,
    seconds: secondsLeft
  }

  return timeBreakdown
}

// Takes in an object of time with years, months, days, hours, minutes, and seconds
// as keys with corresponding values
// Returns a string indicating the number of the largest unit of time

const timeBreakdown = function (time) {

  for (const unit of Object.keys(time)) {
    let count = Number(time[unit]);
    if (count !== 0) {
      return `${count} ${unit}`
    }
  }
}

// Takes in tweet object
// Returns amount of time elapsed since date created to current time

const howLongAgoWasThisTweetCreated = function (tweet) {
  const currentTime = new Date().getTime();
  const tweetCreatedAt = tweet.created_at;
  const timeSinceTweet = currentTime - tweetCreatedAt;

  const howLong = timeBreakdown(unitsOfTime(timeSinceTweet));

  return `${howLong} ago`
}


$(document).ready(function () {

  // Takes in tweet object 
  // Returns tweet <article> containing HTML structure of tweet

  const createTweetElement = function (tweet) {

    const timeSinceTweet = howLongAgoWasThisTweetCreated(tweet);

    const $newTweet = `
    <article class="tweet">
    <header class="tweet-header">
    <img class="tweet-avatar" src=${tweet.user.avatars}>
        <span class="tweet-name">${tweet.user.name}</span>
        <span class="tweet-handle">${tweet.user.handle}<span>
      </header>
      <p class="tweet-body">${tweet.content.text}</p>
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
      postNewTweet($('.tweet-input'));
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
      return alert("no input");
    } else if (140 < inputLength) {
      return alert("too many characters");
    } else {
      $.post("/tweets", input.serialize())
      .done(function (result) {
        ($('.tweets-container')).prepend(createTweetElement(result));
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