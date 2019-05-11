require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var moment = require("moment");


var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var omdb = require("omdb")
var spotifyInput = require("inquirer");


var spotify = new Spotify(keys.spotify);

var searchItem = process.argv.slice(3).join(" ");


console.log(searchItem);


if (process.argv[2] == "concert-this") {
    getConcert(searchItem);
} else if (process.argv[2] == "spotify-this-song") {
    if (searchItem === "" )
    {
        searchItem = "Ace of Base The Sign";
    }
    getSpotify(searchItem);
} else if (process.argv[2] == "movie-this") {
    if (searchItem === "" )
    {
        searchItem = "Mr. Nobody";
    }
    getMovie(searchItem)
} else console.log("Please choose one of the following commands: concert-this, spotify-this-song, or movie-this");

// pass in the band or artist and call API to get dates
function getConcert(searchItem) {
    console.log("Concert function");
    var URL = "https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function (response) {
        var jsonData = response.data;

        // console.log(jsonData);

            jsonData.forEach(function (entry) {
                var showData =
                    "Venue: " + entry.venue.name +
                    " Location: " + entry.venue.city + ", " + entry.venue.country +
                    "Date: " + moment(entry.datetime).format("MM/DD/YYYY")
                console.log(showData);
            })
    })
}

function getSpotify(searchItem) {
    console.log("Spotify function");

    spotify.search({ type: 'track', query: searchItem, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var showData = "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Song Preview: " + data.tracks.items[0].preview_url + "\n" +
            "Album: " + data.tracks.items[0].album.name;

        console.log(showData);

    });
}



function getMovie(searchItem) {
    console.log("Movie function");

    var URL = "https://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";

    axios.get(URL).then( function (response) {
        var jsonData = response.data;

        // console.log(jsonData);
        //
        // console.log(jsonData.Title);
        // console.log(jsonData.Released);
        // console.log(jsonData.imdbRating);
        // console.log(jsonData.Ratings[1].Source);
        // console.log(jsonData.Ratings[1].Value);
        // console.log(jsonData.Country);
        // console.log(jsonData.Language);
        // console.log(jsonData.Plot);
        // console.log(jsonData.Actors);
        //
        var showData = "Movie Title: " + jsonData.Title + "\n" +
            "Year of Release: " + jsonData.Released + "\n" +
            "IMDB Rating: " + jsonData.imdbRating + "\n" +
            "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value + "\n" +
            "Country: " + jsonData.Country + "\n" +
            "Language: " + jsonData.Language + "\n" +
            "Plot: " + jsonData.Plot + "\n" +
            "Actors: " + jsonData.Actors + "\n";

        console.log(showData);



    })

}




