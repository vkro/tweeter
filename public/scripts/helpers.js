// Takes in number representing # of seconds
// Converts into minutes, days, hours, weeks, or years

const unitsOfTime = function (seconds) {
  let secondsLeft = seconds;

  const centuries = Math.floor(secondsLeft / (604800 * 52 * 1000))
  secondsLeft = secondsLeft - (centuries * 604800 * 52 * 1000)

  const decades = Math.floor(secondsLeft / (604800 * 52 * 10))
  secondsLeft = secondsLeft - (decades * 604800 * 52 * 10)

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
    let convertToNumber = Number(time[unit]);
    if (convertToNumber !== 0) {
      return `${convertToNumber} ${unit}`
    }
  }
}


let test = unitsOfTime(222);
console.log(timeBreakdown(test));
