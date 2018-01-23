require('dotenv').config();
//custom files
const keys = require('./keys.js');
//modules
const request = require('request');
const fs = require('fs');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

// put env keys into objs
const spotify = new Spotify(keys.spotify);
const twitter = new Twitter(keys.twitter);

//collect user's command and argument (including spaces for names)
const op = process.argv[2];
const arg = process.argv.slice(3).join(' ');

//create functions to be called

//log function will ONLY run if there is a successful function call -- this is intended
function log(input, output){
	//append the file with input on a separate line from the output
	const divider = '==========================================';
	//first input a divider to clean up and separate call from output
	fs.appendFile('log.txt', (divider + '\n' + input + '\n' + divider + '\n' + output + '\n'), 'utf8', (err) =>{
		if (err) throw err;

		//console log the output as normal
		console.log(output);
	});
}

function myTweets(user = 'niveKmA') {
	// create a parameter object to be passed to the get function
	const params = {screen_name : user};

	//call the get function
	twitter.get('statuses/user_timeline', params, (error, tweets, response) => {
		//if no error message is passed, log the tweets
		if (!error) {
			// by default will provide last 20 tweets
			//establish a counter to link to each tweet
			let tweetCounter = 1;

			//map each tweet to a new object, without the fluff
			const recent = tweets.map( (tweet) => {
				const rObj = {};
				//we can use a date object to hold the information, since they already have it set to a string
				//then we can simply call the toString to make it more readable
				rObj['time'] = new Date(tweet.created_at).toDateString();
				rObj['text'] = tweet.text;
				rObj['num'] = tweetCounter;
				tweetCounter++;
				return rObj;
			});

			console.log('I have looked at your tweets.  You\'re fired. \n')

			//print out the information for each tweet after logging into the log.txt
			recent.forEach( (tweet) => {
				log(('my-tweets ' + user + ' #' + tweet.num), ('Tweet #' + tweet.num + ' Created at: ' + tweet.time + '\n\t' + tweet.text + '\n'));
			});
		}
	})
}

function song(song = 'The Sign') {
	//call spotify search function
	spotify.search({
		type: 'track',
		query: song,
		limit: 10
	}, (err, data) => {
		//error handler
		if (err) {return console.log('Error occurred: ' + err);}

		//get the first result's path
		const input = data.tracks.items[0]

		//get the song name
		const name = input.name;

		//create a list of the artists that contributed to the track
		const artistList = input.artists.map( (artist) => artist.name);
		//smash all of the artist names into a string
		const artists = artistList.join(', ');

		//get the song's album name
		const album = input.album.name;

		//get the song's preview link
		const link = input.preview_url;

		//log the command and log in log.txt
		log(('spotify-this-song ' + song), ('Beep Boop.  Here is your song:\n\tSong: ' + name + '\n\tArtist(s): ' + artists + '\n\tAlbum: ' + album + '\n\tPreview Link: ' + link));
	});
}

function movie(movie = 'Mr. Nobody') {
	//url builder
	url = 'http://www.omdbapi.com/?apikey=trilogy&type=movie&plot=short&t='
	url += movie;
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			//take in the response from OMDB and parse JSON
			const input = JSON.parse(body);

		    //collect data from the input
		    const title = input.Title;
		    const year = input.Year;
		    const rating = input.Rated;
		    const imdbRating = input.imdbRating;
		    const rottenRating = input.Ratings[1].Value;
		    const country = input.Country;
		    const lang = input.Language;
		    const plot = input.Plot;
		    const actors = input.Actors;

		    //print it out
		    // look I know it's ugly, but it looks nice on the other end :P
		    log(('movie-this ' + movie), ('\t' + title + '\n\n\t' + 'Year: \t\t' + year + '\n\t' + 'Actors: \t' + actors + '\n\t' + 'Rating: \t' + rating + '\n\t' + 'Language: \t' + lang + '\n\t' + 'Country: \t' + country + '\n\t' + 'IMDB Rating: \t' + imdbRating + '\n\t' + 'RT Rating: \t' + rottenRating + '\n\n\t' + 'Plot: \n\t' + plot))
		} else {
			console.log(error);
		}
	});
}

function justDoIt(filepath = './random.txt') {
	fs.readFile(filepath, 'utf8', (err, data) => {
		if (err) throw err;

		//parse through the file, assuming the user's file is in the right config
		//will use new line esc char to separate each command with arg
		const commandPairs = data.split('\n');

		//then, create an object to pass in a new array
		//will input a string if no commas found,
		//which is what we want if they try and pass a 'my-tweets' command
		const commands = commandPairs.map( (pair) => {
			//first we split up the pair into a new temp array
			const temp = pair.split(',');

			//we check the type of the split and see if it's still a string
			if (typeof temp === 'string'){
				//if string, we just dump it out with the command key
				return { command : temp };
			}

			//if not a string, we return back an object with a command and arg
			return { command: temp[0], argument: temp[1]};
		})

		//log the initial do-what-it-says call
		log(('do-what-it-says ' + filepath), ('########################################'))

		//now we simply iterate through the commands array, 
		//passing in the appropriate args
		//and calling the appropriate function.
		commands.forEach( (commandObj) => {
			progSwitch(commandObj.command, commandObj.argument);
		});
	});
}


//create general switch function.  Call at end to run program once.
function progSwitch(operation, argument) {
	//create switch statement to handle operation from op const
	switch(operation){
		case "my-tweets":
		//check to see if argument exists
		//will call using param default if not
		(argument) ? myTweets(argument) : myTweets();
		break;

		case "spotify-this-song":
		//check to see if argument exists
		//will call using param default if not
		//additionally will collect full song name, not just first arg passed
		(argument) ? song(argument) : song();
		break;

		case "movie-this":
		//again, check to see if argument exists
		//will call using param default if not
		(argument) ? movie(argument) : movie();
		break;

		case "do-what-it-says":
		//again, check to see if argument exists
		//will call using param default if not
		(argument) ? justDoIt(argument) : justDoIt();
		break;

		//provide some help if they've never used the program before
		default:
		console.log('Please enter a command to run. Commands you can run:  \n\n node liri \t my-tweets[ user] \n\n\t\t spotify-this-song[ song] \n\n\t\t movie-this[ movie] \n\n\t\t do-what-it-says[ filepath]');
	}
}

//call the switch at least once to run the program
//use the op we collected at start
progSwitch(op, arg);