require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var selection = process.argv[2];
var searchItem = process.argv.slice(3).join(" ");
var divider = "\n------------------------------------------------------------\n\n";


function whatSelection() {
    switch (selection) {
        case 'concert-this':
            getConcert(searchItem);
            break;
        case 'movie-this':
            if (searchItem === "") {
                searchItem = "Mr. Nobody";
            }
            getMovie(searchItem);
            break;
        case 'spotify-this-song':
            if (searchItem === "") {
                searchItem = "Ace of Base The Sign";
            }
            getSpotify(searchItem);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Please choose one of the following commands: concert-this, spotify-this-song, or movie-this");
    }
}


//     if (selection == "concert-this") {
//         getConcert(searchItem);
//     } else if (selection == "spotify-this-song") {
//
//     } else if (selection == "movie-this") {
//         if (searchItem === "") {
//             searchItem = "Mr. Nobody";
//         }
//         getMovie(searchItem)
//     } else if (selection == "do-what-it-says") {
//         doWhatItSays();
//     } else console.log("Please choose one of the following commands: concert-this, spotify-this-song, or movie-this");
// }

whatSelection();

// pass in the band or artist and call API to get dates
function getConcert(searchItem) {
    console.log("Concert function");
    var URL = "https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function (response) {
        var jsonData = response.data;

        jsonData.forEach(function (entry) {
            var showData =
                "Venue: " + entry.venue.name +
                " Location: " + entry.venue.city + ", " + entry.venue.country +
                "Date: " + moment(entry.datetime).format("MM/DD/YYYY");
            console.log(showData);
            writeToFile(showData);
        })
    })
}

// pass in the song to search for
function getSpotify(searchItem) {
    console.log("Spotify function");

    spotify.search({type: 'track', query: searchItem, limit: 1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var showData = "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Song Preview: " + data.tracks.items[0].preview_url + "\n" +
            "Album: " + data.tracks.items[0].album.name;
        console.log(showData);

        writeToFile(showData);

    });
}

// pass in the movie to search for
function getMovie(searchItem) {
    console.log("Movie function");

    var URL = "https://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";

    axios.get(URL).then(function (response) {
        var jsonData = response.data;

        var showData = "Movie Title: " + jsonData.Title + "\n" +
            "Year of Release: " + jsonData.Released + "\n" +
            "IMDB Rating: " + jsonData.imdbRating + "\n" +
            "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value + "\n" +
            "Country: " + jsonData.Country + "\n" +
            "Language: " + jsonData.Language + "\n" +
            "Plot: " + jsonData.Plot + "\n" +
            "Actors: " + jsonData.Actors + "\n";
        console.log(showData);

        writeToFile(showData);

    })

}

function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (err, response) {
        console.log("File " + response);
        var randomArray = response.toString().split(",");
        selection = randomArray[0];
        searchItem = randomArray[1];

        whatSelection();
    });
}

function writeToFile(showData) {
    fs.appendFile("log.txt", showData + divider, function (err) {
        if (err) throw err;
    });
}




