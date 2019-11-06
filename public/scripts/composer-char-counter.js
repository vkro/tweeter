$(document).ready(function() {

  $("#text").keypress(function() {
    let count = $(".counter").text();
    count = Number(count);
    count++;
    $(".counter").text(count);
  });

});