$(document).ready(function() {

  $("#text").keyup(function() {
    let counter = $(this).parent().children("span");
    let count = ($(this).context.value).length;
    if (140 < count) {
      counter.attr("id", "negative");
    } else {
      counter.attr("id", "positive")
    }
    $(counter).text((140 - count));
  });

});