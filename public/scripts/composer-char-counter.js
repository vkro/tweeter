// For each key input to text input area,
// Take length of input and update display of characters left
// If count < 0 add negative class to signal CSS change to red text

$(document).ready(function() {

  $("#textArea").keyup(function() {

    let counter = $(this).parent().children("span");
    let count = ($(this).context.value).length;
    let charsLeft = 140 - count;

    if (charsLeft < 0) {
      counter.addClass("negative");
    } else {
      counter.removeClass("negative");
    }
    $(counter).text(charsLeft);
  });

});