//iniitalize variables
var themes = ["penguin", "albatross", "hummingbird", "owl", "woodpecker"];
var gifBtn;
var gifImage;

// functionA: create gif buttons
function createButtons() {
  //empty buttons
  $("#gifButtons").empty();
  //empty text form
  $("#inputBird").val("");

  //loop through theme array
  for (var i=0; i < themes.length; i++) {
    //button variable
    var gifBtn = $("<button>");
    //button class
    gifBtn.addClass("gifBtnClass");
    //button data-attribute
    gifBtn.attr("gifBtnAttr", themes[i]);
    //add theme string to button
    gifBtn.text(themes[i]);
    //append button to div
    $("#gifButtons").append(gifBtn);
  } //close loop
} //close functionA

//functionB: populate gifs
function displayImages() {
  //clear gifs
  $("#gifs-appear-here").empty();
  $(".item").empty();
    //click event
    var birdGif = $(this).attr("gifBtnAttr");
    //giphy query
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + birdGif + "&api_key=WtL7a88I6lDSvslFMP2JlDT1WvGXcUET&limit=10";
    //ajax query
    $.ajax({
      url: queryURL,
      method: "GET"
    })//close ajax query

    //functionC:retrieve gif data
    .done(function(response) {
      var results = response.data;
      //loop:10gifs
      for (var i = 0; i < results.length; i++) {
        //gif result variable
        var giphy = $("<div class='item float-left'>");
        //rating variable
        var rating = results[i].rating;
        //display rating in html
        var p = $("<p>").text("Rating: " + rating);
        //gif image variable
        var gifImage = $("<img>");
        //attach results to gif image variable
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        //gif image varaible still state
        gifImage.attr("data-state", "still");
        //gif image still image data
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        //animate gif on click
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        //gif image class
        gifImage.addClass("gif");
        //prepend gif to div 
        gifResults.prepend(gifImage);
        gifResults.prepend(p);
        //put image and image div on browser
        $("#gifResults").prepend(giphy);
      } //close loop:10gifs

      //function C1: animate gif
      $(".gif").on("click", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } //close if loop

        else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        } //close else loop
      }); //close functionC1
    }); //close functionC
  } //close functionB

//functionD:add gif theme
$("#addBtn").on("click", function(event) {
  event.preventDefault();
  //text from submission form
  var newTheme = $("#inputBird").val().trim();
  //push text to array
  themes.push(newTheme);
  // create buttons
  createButtons();
}); //close functionD

//create inital buttons
createButtons();

// click event for button
$(document).on("click", ".gifBtnClass", displayImages);