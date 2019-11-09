// On click of navbar "Write a new tweet" button
// Hide the validation error (in case it was showing)
// Toggle tweet form, and assign focus to text input area

$(document).ready(function() {

  $(".write-new-tweet").click(function() {
    
    $(".validation-error").hide(0, "swing");
    $(".new-tweet").slideToggle("slow");
    $("#textArea").focus();
  });

});