require("dotenv").config();
const keys = require("keys.js");

//set keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const op = process.argv[2];

switch(op){
	case "my-tweets":
	break;
	case "spotify-this-song":
	break;
	case "movie-this":
	break;
	case "do-what-it-says":
	break;

	default:
	console.log('Please enter a command to run. Commands you can run:  \n\t my-tweets \n\t spotify-this-song \n\t movie-this \n\t do-what-it-says \n');
}
