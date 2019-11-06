$(document).ready(function() {

  $("#text").keypress(function() {
    let counter = $(".counter").text();
    let count = ($(this).context.value).length;
    $(".counter").text((count + 1));
  });

});