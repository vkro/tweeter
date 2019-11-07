$(document).ready(function() {

  $("#textArea").keyup(function() {
    let counter = $(this).parent().children("span");
    let count = ($(this).context.value).length;
    let charsLeft = 140 - count;
    if (charsLeft < 0) {
      counter.addClass("negative");
    } else {
      counter.removeClass("negative")
    }
    $(counter).text(charsLeft);
  });

});