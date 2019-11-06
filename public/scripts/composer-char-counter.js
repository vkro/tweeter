$(document).ready(function() {

  $("#text").keyup(function() {
    let counter = $(this).parent().children("span");
    let count = ($(this).context.value).length;
    let charsLeft = 140 - count;
    if (charsLeft < 0) {
      counter.attr("id", "negative");
    } else {
      counter.attr("id", "positive")
    }
    $(counter).text(charsLeft);
  });

});