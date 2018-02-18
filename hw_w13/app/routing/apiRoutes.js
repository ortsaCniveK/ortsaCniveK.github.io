const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

//establish the body parser for the post route's use
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


//since we're using in both routes
let friends = require(path.join(__dirname, '../data/friends.json'));

router.get('/api/friends', (req, res) => {
	//send back the json output of the json file with data
	res.json(friends);
});

router.post('/api/friends', (req, res) => {
	const newPerson = req.body;
	
	//create match to be sent back to the page
	const match = findMatch(newPerson);

	//push the data being passed to the data store
	friends.push(newPerson);

	//send back best match
	res.json(match);
});

const findMatch = (inputPerson) => {
	//collect the scores from the input
	const newPersonScores = inputPerson.scores.map(parseFloat);

	//collect all the scores from each person in db
	const dbScores = friends.map( person => {
		return person.scores.map(parseFloat);
	});

	//declare array of the sums of differences
	let diffSums = [];

	dbScores.forEach( dbScore => {
		//as demonstrated by joey this is the most straightforward solution
		const diffs = [];

		//gather the absolute vals of the difference between the input ans and db ans
		dbScore.forEach(function(ans, index) {
		    diffs.push(Math.abs(newPersonScores[index] - ans));
		});

		//reduce the array to its sum
		let diffSum = diffs.reduce(function(sum, score) {
			return sum + score;
		});

		// send to the sums array, which is organized in the same order
		// as the friends array is
		diffSums.push(diffSum);
	});

	//get the index of the lowest value of the output array
	//likely not very scalable from what I've read about the Math.min function
	const lowest = diffSums.indexOf(Math.min.apply(null, diffSums));

	//return the match, the person in the db with the lowest val
	return friends[lowest];
}

module.exports = router;
