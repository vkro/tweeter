$(document).ready(function() {
  $(".write-new-tweet").click(function() {
    $(".validation-error").hide("fast", "swing");
    $(".new-tweet").slideToggle("slow");
  });
});




// $(".write-new-tweet-btn").click(function() {
//   $(".new-tweet").toggleClass("slider");
// })
  