/*

Instructions:
$ node liri.js latest-tweets
$ node liri.js movie-this Forrest Gump
$ node liri.js spofity-this-song Like a Rolling Stone
$ node liri.js do-what-it-says


*/
//=============================================================
// ================ REQUIRE ===================================
//=============================================================
var request = require('request');
var latestTweets = require('latest-tweets')
var open = require('open');
var fs = require('fs');


//=============================================================
// ================ CODE FOR TWITTER ==========================
//=============================================================

//note npm install latest-tweets does not require deez crazy keys

if (process.argv[2] === 'my-tweets'){
    latestTweets('_leondo_', function (err, tweets) {
        for (var i = 0; i < 20; i++){
            console.log(i+1)
            console.log(tweets[i].content)
            console.log(tweets[i].date)
            console.log('\n')
        }//for
    })//latestTweets
}//if



//=============================================================
// ================ CODE FOR MOVIES ===========================
//=============================================================

var movieName = '';

// if user types movie-this ____ (without a movie), then they're a jerk
if (process.argv[2] === 'movie-this' && process.argv[3] === undefined){
    movieName = "Mr+Nobody"
    consoleMovieInfo();
}

//if user types movie with multiple words...
 else if (process.argv[2] === 'movie-this' && process.argv[4] !== undefined){
    //then put a %20 in between each argument
    for (var i=3; i < process.argv.length; i++){
        movieName = movieName + process.argv[i] + "%20";
        consoleMovieInfo()
    }

}

//if movie is one word
else if (process.argv[2] === 'movie-this' && process.argv[4] === undefined) {

    movieName = process.argv[3];
    consoleMovieInfo()

}



function consoleMovieInfo(){

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";

    request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body)['Title'])
        console.log(JSON.parse(body)['Year'])
        console.log(JSON.parse(body)['Rated'])
        console.log(JSON.parse(body)['Country'])
        console.log(JSON.parse(body)['Language'])
        console.log(JSON.parse(body)['Plot'])
        console.log(JSON.parse(body)['Actors'])
        console.log(JSON.parse(body)['tomatoRating'])
        console.log(JSON.parse(body)['tomatoURL'])
      }
    })
}






//=============================================================
// ================ CODE FOR SPOTIFY ==========================
//=============================================================

var trackName = '';

// https://api.spotify.com/v1/search?q=starboy&type=track

//if track has multiple words...
if (process.argv[2] === 'spofity-this-song' && process.argv[4] !== undefined){
    //...then put them together
    for (var i = 3; i < process.argv.length; i++){
        trackName = trackName + process.argv[i] + "%20";
    }
    consoleSpotifyInfo(trackName)
}

if (process.argv[2] === 'spofity-this-song' && process.argv[4] === undefined){
    trackName = process.argv[3]
    consoleSpotifyInfo(trackName)
}


function consoleSpotifyInfo(trackName){
    var queryUrl = "https://api.spotify.com/v1/search?q=" + trackName + "&type=track";

    request(queryUrl, function (error, response, body) {

        // if no results found
        if (JSON.parse(body).tracks.total == 0){
            //I don't get the joke...
            console.log('"The Sign" by Ace of Base')

        //else display the info
        } else{

        //artist
        console.log(JSON.parse(body).tracks.items[0].artists[0].name)
        //song name
        console.log(JSON.parse(body).tracks.items[0].name)
        //link to track
        console.log(JSON.parse(body).tracks.items[0].external_urls.spotify)
        //album
        console.log(JSON.parse(body).tracks.items[0].album.name)

        //open browser
        open(JSON.parse(body).tracks.items[0].external_urls.spotify);
        }

    });//request

}//consoleSpotifyInfo






//=============================================================
// ================ CODE FOR DO-WHAT-IT-SAYS ==================
//=============================================================

if (process.argv[2] === 'do-what-it-says'){
    fs.readFile('random.txt', 'utf8', function(error, data){
        var dataArray = data.split(",");
        var randomSong = dataArray[Math.floor(Math.random()*dataArray.length)];

        consoleSpotifyInfo(randomSong)
    });

}
