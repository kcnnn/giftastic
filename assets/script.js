var topics = ["tiger", "leopard", "kangaroo", "bear", "lion",
"badger", "ant", "snake", "dog", "cat",
"puppy", "kitty", "turtle", "horse", "cow",
"monkey"];
var numberOfGIFs = 5;
var cutOffRating = "PG";

function renderButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("one-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".one-button").unbind("click");

	$(".one-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("dotted-border");
		populateGIFContainer($(this).text());
	});

}

function addButton(animal){
	if(topics.indexOf(animal) === -1) {
		topics.push(animal);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(animal){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + animal + 
		"&api_key=ObJpFlBxtMZ8e79ALUzaBrQ7oAv2xdGP&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("dotted-border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#other-gif").val().trim());
		$("#other-gif").val("");
	});
});