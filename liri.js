require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var moment = require("moment");


var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
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
    getMovie()
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



function getMovie() {
    console.log("Movie function");
}




