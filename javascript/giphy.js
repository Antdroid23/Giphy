// Initial array of GIFS
var giphy = ["cat", "dog", "snake", "bird"];
console.log(giphy);

// Function for displaying GIPHY data
function renderButtons() {

// Deleting the GIPHY buttons prior to adding new GIPHY buttons
// (this is necessary otherwise we will have repeat buttons)
$("#gifBtn").empty();

// Looping through the array of GIPHY's
for (var i = 0; i < giphy.length; i++) {

  // dynamically generating buttons for each GIF in the array.
  var a = $("<button>");
  // Adding a class
  a.addClass("giphySearch");
  // Adding a data-attribute with a value of the GIPHY at index i
  a.attr("data-person", giphy[i]);
  // Providing the button's text with a value of the GIPHY at index i
  a.text(giphy[i]);
  // Adding the button to the HTML
  $("#gifBtn").append(a);
  console.log(a);
}
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {
// event.preventDefault() prevents the form from trying to submit itself.
// We're using a form so that the user can hit enter instead of clicking the button if they want
event.preventDefault();

// This line will grab the text from the input box
var gifs = $("#giphy-input").val().trim();
// The GIPHY from the text box is then added to our array
giphy.push(gifs);

// calling renderButtons which handles the processing of our movie array
renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of GIPHY's
renderButtons();
$(document).on('click','button', function(){
//$("button").on("click", function() {
var person = $(this).attr("data-person");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var personImage = $("<img>");
      personImage.attr("src", results[i].images.fixed_height_still.url);
      personImage.attr("data-still", results[i].images.fixed_height_still.url);
      personImage.attr("data-animate", results[i].images.fixed_height.url);
      personImage.attr("data-state", "still");
      personImage.attr("class", "gif");

      gifDiv.prepend(p);
      gifDiv.prepend(personImage);

      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
});

$(document).on("click", ".gif", function() {

  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});