require("dotenv").config();

var axios = require("axios");
var moment = require("moment");

// connects to the keys.js file to retrieve api keys
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var request = require("request");

var spotify = new Spotify(keys.spotify);

var pickAppToRun = function (app, param) {
    switch (app) {
        case "spotify-this-song":
            spotifySong(param);
            break;
        case "movie-this":
            getMovie(param);
            break;
        case "concert-this":
            getConcert(param);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Usage is spotify-this-song, movie-this, concert-this, or do-what-it-says");
    }
}

var runApp = function (argOne, argTwo) {
    pickAppToRun(argOne, argTwo);
};

// process.argv[2] is the the case statements like "movie-this" or "spotify-this-song"
// process.argv[3] is the mpvie title or song title


var spotifySong = function (param) {
    spotify.search({ type: 'track', query: param }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(data);
        var songs = data.tracks.items;
        // var songName = data.tracks.items.name;
        // var artist = data.tracks.items.artists.name;
        // var album = data.tracks.items.album.name;
        // var previewURL = data.tracks.items.preview_url;



        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Artist: " + songs[i].artists[0].name);
            console.log("Song Name: " + songs[i].name);
            console.log("Album: " + songs[i].album.name);
            console.log("Preview on Spotify: " + songs[i].preview_url);
            console.log("--------------------------------");
        }
    });
}

var getMovie = function (movieName) {
    //example: https://www.omdbapi.com/?t=titanic&apikey=trilogy
    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);

            console.log("Title: " + jsonData.Title);
            console.log("Year of release: " + jsonData.Year);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[2].Value);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("------------------------------")
        }
    });
}

/*
Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")
*/

var getConcert = function (artist) {
    //https://rest.bandsintown.com/artists/incubus/events?app_id=codingbootcamp
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);

            console.log("Venue: " + jsonData[0].venue.name);
            console.log("Venue Location: " + jsonData[0].venue.city + ", " + jsonData[0].venue.region + ", " + jsonData[0].venue.country);
            console.log("Event Date: " + moment(jsonData[0].datetime).format("MM-DD-YYYY"));
            console.log("-----------------------");
        }
    });
}

var doWhatItSays = function () {
    //read more about nodeJS readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
            //console.log(data);
        }

        // if a comma exists, split data by the comma and put into an array
        var dataArr = data.split(',');

        var app = dataArr[0];

        if (dataArr[1]) {
            var param = dataArr[1];
        }

        switch (app) {
            case "spotify-this-song":
                spotifySong(param);
                break;
            case "movie-this":
                getMovie(param);
                break;
            case "concert-this":
                getConcert(param);
                break;
            case "do-what-it-says":
                doWhatItSays();
                break;
            default:
                console.log("Usage is spotify-this-song, movie-this, concert-this, or do-what-it-says");
        }
    });
}


runApp(process.argv[2], process.argv.slice(3).join(" "));
