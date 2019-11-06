$(document).ready(function() {

  $("#text").keyup(function() {
    let counter = $(".counter").text();
    let count = ($(this).context.value).length;
    $(".counter").text((140 - count));
  });

});