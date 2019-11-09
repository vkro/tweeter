// Takes in number representing # of seconds
// Converts into minutes, days, hours, weeks, years, decades, centuries
// Reference: stackoverflow @ https://stackoverflow.com/questions/11792726/turn-seconds-into-hms-format-using-jquery
// Takes in number representing # of seconds
// Converts into minutes, days, hours, weeks, and years
// Returns these values in an object

const unitsOfTime = function (seconds) {

  let secondsLeft = seconds;
  // how many centuries does this # of seconds contain?
  const centuries = Math.floor(secondsLeft / (604800 * 52000))
  secondsLeft = secondsLeft - (centuries * 604800 * 52000)
  // with what's left, how many decades?
  const decades = Math.floor(secondsLeft / (604800 * 520))
  secondsLeft = secondsLeft - (decades * 604800 * 520)
  // then how many years
  const years = Math.floor(secondsLeft / (604800 * 52));
  secondsLeft = secondsLeft - (years * 604800 * 52);
  // and months
  const months = Math.floor(secondsLeft / (68400 * 30));
  secondsLeft = secondsLeft - (months * 68400 * 30);
  // days
  const days = Math.floor(secondsLeft / 68400);
  secondsLeft = secondsLeft - (days * 68400);
  // hours
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft - (hours * 3600);
  // minutes
  const minutes = Math.floor(secondsLeft / 60);
  // and finally, this is how many seconds are left over
  secondsLeft = secondsLeft - (minutes * 60)
  // make an object for timeBreakdown to use
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
// as keys with corresponding values.
// When it reaches the first key with a non-zero value,
// returns a string indicating the number of the largest unit of time.

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