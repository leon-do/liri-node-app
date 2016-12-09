//write the code you need to grab the data from keys.js. Then store the keys in a variable
var keys = require('./keys.js');

var twitterConsumerKey = keys.twitterKeys.consumer_key;
var twitterConsumerSecret = keys.twitterKeys.consumer_secret;
var twitterAccessTokenKey = keys.twitterKeys.access_token_key;
var twitterAccessTokenSecret = keys.twitterKeys.access_token_secret;


console.log(twitterConsumerKey)
console.log(twitterConsumerSecret)
console.log(twitterAccessTokenKey)
console.log(twitterAccessTokenSecret)
