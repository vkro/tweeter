$(document).ready(function() {
  $(".write-new-tweet").click(function() {
    $(".validation-error").hide(0, "swing");
    $(".new-tweet").slideToggle("slow");
    $("#textArea").focus();
  });
});




// $(".write-new-tweet-btn").click(function() {
//   $(".new-tweet").toggleClass("slider");
// })
  