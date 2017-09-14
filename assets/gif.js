$(document).ready(function() {
var gifs = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];



function printbuttons(){
  $("#gif-button").empty()
  for (var i = 0; i < gifs.length; i++) {
      var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("gif-button btn btn-primary");
          // Adding a data-attribute
          a.attr("data-name", gifs[i]);
          // Providing the initial button text
          a.text(gifs[i]);
          a.css({margin: 5})
          // Adding the button to the buttons-view div
          $("#gif-button").append(a);

  }
}

printbuttons();


$(document).on("click", ".gif-button", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).attr("data-name");
      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          $("#gifs-appear-here").empty();
          // Storing an array of results in the results variable
          var results = response.data;
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              
              var gifDiv = $("<div class='item col-md-4'>");
              
              var rating = results[i].rating;
              
              var p = $("<p>").text("Rating: " + rating);
              
              var personImage = $("<img>");
              
              personImage.attr("src", results[i].images.fixed_height_still.url);
              personImage.attr("data-still", results[i].images.fixed_height_still.url);
              personImage.attr("data-animate", results[i].images.fixed_height.url);
              personImage.attr("data-state", "still");
              personImage.css({margin:20});
              
              gifDiv.append(p);
              gifDiv.append(personImage);
              
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });
$(document).on("click", "img", function() {
      
      console.log(this);
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

$("#add-gif").on("click",function(event){
  event.preventDefault();
  var newGif = $("#gif-input").val().trim();
  console.log(newGif)
  gifs.push(newGif)
  $("#gif-input").val("");
  printbuttons()
})
})