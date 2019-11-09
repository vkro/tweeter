// Takes in number representing seconds
// Converts into units of time: minutes, days, hours, weeks, years, decades, & centuries
// Returns an object of units with correspoding values
// Reference: stackoverflow @ https://stackoverflow.com/questions/11792726/turn-seconds-into-hms-format-using-jquery


const unitsOfTime = function(seconds) {

  let secondsLeft = seconds;
  // how many centuries does this # of seconds contain?
  const century = Math.floor(secondsLeft / (604800 * 52000));
  secondsLeft = secondsLeft - (century * 604800 * 52000);
  // with what's left, how many decades?
  const decade = Math.floor(secondsLeft / (604800 * 520));
  secondsLeft = secondsLeft - (decade * 604800 * 520);
  // then how many years
  const year = Math.floor(secondsLeft / (604800 * 52));
  secondsLeft = secondsLeft - (year * 604800 * 52);
  // and months
  const month = Math.floor(secondsLeft / (68400 * 30));
  secondsLeft = secondsLeft - (month * 68400 * 30);
  // days
  const day = Math.floor(secondsLeft / 68400);
  secondsLeft = secondsLeft - (day * 68400);
  // hours
  const hour = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft - (hour * 3600);
  // minutes
  const minute = Math.floor(secondsLeft / 60);
  // and finally, how many seconds are left over
  secondsLeft = secondsLeft - (minute * 60);
  // make an object for timeBreakdown to use
  const timeBreakdown = {
    century,
    decade,
    year,
    month,
    day,
    hour,
    minute,
    second: secondsLeft
  };
  return timeBreakdown;
};

// Takes in an object of time with years, months, days, hours, minutes, and seconds
// as keys with corresponding values.
// When it reaches the first key with a non-zero value,
// returns a string indicating the number of the largest unit of time.

const timeBreakdown = function(time) {

  for (const unit of Object.keys(time)) {
    let count = Number(time[unit]);
    if (count === 1) {
      return `${count} ${unit}`;
    }
    if (1 < count) {
      if (unit === "century") {
        return `${count} centuries`;
      } else {
        return `${count} ${unit}s`;
      }
    }
  }
};

// Takes in tweet object
// Returns amount of time elapsed since date created up to current time

const howLongAgoWasThisTweetCreated = function(tweet) {
  
  const currentTime = new Date().getTime();
  const timeTweeted = tweet.created_at;
  const timeSinceTweet = currentTime - timeTweeted;
  const howLong = timeBreakdown(unitsOfTime(timeSinceTweet));

  return `${howLong} ago`;
};