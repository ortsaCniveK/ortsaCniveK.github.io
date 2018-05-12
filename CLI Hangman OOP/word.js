const Letter = require('./letter.js');

const Word = function(word){
	//call the word as an array of letters
	let splitWord = word.split('');

	//create an array of Letter Objects
	this.word = splitWord.map( (letter) => {
		//create a new Letter object
		return new Letter(letter);
	});

	this.guess = function(letter){
		//create a marker to see if there was a change in the
		let returnVal = false;
		//check through the word array
		this.word.forEach( (letterObj) => {
			//check each letterObj with the guess.
			//the function returns true or false if the guess matches the letter,
			//so then we set the marker to true
			if (letterObj.checkLetter(letter)){
				returnVal = true;
			}
		});

		return returnVal;
	};

	this.status = function(){
		let status = true;

		this.word.forEach( letter => {
			//if the letter has not been guessed
			if (!letter.guessed){
				//set the status to false
				status = false;
			}
			//else do nothing.
		})

		return status;
	}

	//toggles the word for display at the end of the game
	//getting the word correct will do that as well 
	this.toggle = function(){
		this.word.forEach( letter => {
			letter.guessed = true
		});
	}
}

//create toString
Word.prototype.toString = function() {
	//create blank string
	let returnWord = '';
	this.word.forEach( (letterObj) => {
		//add each letter if they're available
		returnWord += letterObj.getLetter();
	});
	//return the word
	return returnWord;
}

module.exports = Word;