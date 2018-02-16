const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');

//since we're using in both routes
let friends = require(path.join(__dirname, '../data/friends.json'));

router.get('/api/friends', (req, res) => {
	//send back the json output of the json file with data
	res.json(friends);
});

router.post('/api/friends', (req, res) => {
	const match = findMatch(req.body)

	//push the data being passed
	friends.push(req.body);

	//send back best match
	res.json();
});

const findMatch = (inputScores) => {
	let bestMatch = {};
	friends.forEach( person => {
		
	});
}

module.exports = router;