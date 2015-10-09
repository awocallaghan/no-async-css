$(document).ready(function () {

  $(".banner").show();

  var BOX_WIDTH = 50;
  var width;

  window.addEventListener('resize', updateWidth); // add event to change number of boxes when window resized

  updateWidth(); // manually update width when page is ready

  // Update the current width then update boxes shown
  function updateWidth() {
    width = $(".banner").width();
    console.log("Width = " + width);
    removeBoxes();
    addBoxes();
  }

  // Remove boxes by emptying the .banner
  function removeBoxes() {
    $(".banner").html(" ");
  }

  // Add .banner-box(es) to the .banner using width to calculate number of boxes to add
  function addBoxes() {
    var boxes = Math.floor(width / BOX_WIDTH); // calculate number of boxes to add to banner
    var remainder = Math.floor(width % BOX_WIDTH); // remainder is size of additional first box
    if (remainder != 0) {
      $(".banner").append("<div class=\"banner-box\" style=\"width: " + remainder + "px;\"></div>");
    }
    for (var i = 0; i < boxes; i++) {
      var duration = Math.round(Math.random() * 10) + 5; // get random number between 5 and 15 for length of animation
      $(".banner").append("<div class=\"banner-box\" style=\"animation-duration: " + duration + "s;\"></div>");
    }
  }

});
