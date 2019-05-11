require("dotenv").config();

var keys = require("./keys.js");
var spotifyConnection = require("node-spotify-api");
var spotifyInput = require("inquirer");


var spotify = keys.spotifyConnection;


if (process.argv[2] == "concert-this") {
    getConcert();
} else if (process.argv[2] == "spotify-this-song") {
    getSpotify();
} else if (process.argv[2] == "movie-this") {
    getMovie()
} else console.log("Please choose one of the following commands: concert-this, spotify-this-song, or movie-this");

function getConcert() {
    console.log("Concert function");
}

function getSpotify() {
    console.log("Spotify function");
}

function getMovie() {
    console.log("Movie function");
}

