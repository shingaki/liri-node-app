require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var moment = require("moment");


var keys = require("./keys.js");
var spotifyConnection = require("node-spotify-api");
var spotifyInput = require("inquirer");


var spotify = keys.spotifyConnection;

var searchItem = process.argv.slice(3).join(" ");


console.log(searchItem);


if (process.argv[2] == "concert-this") {
    getConcert(searchItem);
} else if (process.argv[2] == "spotify-this-song") {
    getSpotify();
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

function getSpotify() {
    console.log("Spotify function");

}

function getMovie() {
    console.log("Movie function");
}




