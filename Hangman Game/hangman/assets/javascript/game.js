//below will be the code for the game to be run -- note the document.ready function, allowing me to link in the head

$(document).ready(function() {
	//make an array of the words to be used in game
	// while testing, will leave placeholders -- add in later

	//making the global variables for jQuery changes to html later
	var winNum = $('#winnum');
	var unknownWord = $('#unknownWord');
	var guessRemain = $('#guessRemain');
	var guessList = $('#guessList');

	//list of words
	var wordList = ["word", "another", "anotherone"];

	//set remaining guesses to 12 at start
	var remainGuess = 12;
	//create placeholder variable for the word to be guessed
	var word = '';
	//create placeholder variable for the display word
	var displayWord = [];

	//create placeholder var for guess to be processed.
	var guessLetter = '';
	//create an empty array for the letters guessed.
	var lettersGuessed = []


	//function that generates new word from wordList, sets to current word
	function newWord(){
		//generate a new index, randomly chose from the wordList -- it's ok to have a zero
		var randIndex = Math.floor(Math.random() * wordList.length);
		console.log(randIndex);

		//assign the word at the random index to the word to be guessed
		word = wordList[randIndex];
		console.log(word);

		//for loop that creates display word, with correct length
		//also adds spacing, allowing direct printing.
		for (var i=0; i < word.length; i++){
			displayWord.push("_ ");
		}

		console.log(displayWord);
	}

	//function that processes the input letter
	function guess(letter){
		if (lettersGuessed.indexOf(letter) !== -1){
			//letter already guessed, do nothing.
			console.log('letter already guessed.');
			return;
		}
		if (word.indexOf(letter) === -1){
			//letter not found in word
			//add letter to letters guess array
			//decrease remaining guesses
			remainGuess -= 1;
			console.log('Guesses remaining ' + remainGuess); 
			lettersGuessed.push(letter);
			console.log('Guess List: ' + lettersGuessed);
			printArray(lettersGuessed, guessList);
		}
		else {
			console.log('processing correct answer...')
			//letter found in word
		}

	}

	//execute on win condition
	function win() {
		//push win image to left sidebar

		//increase win counter
		winNum += 1;

		//generate new word
		newWord();
		//maybe add tracker that modifies the current word list?
	}

	//execute on loss condition.
	function loss() {
		//game over screen
		//timeout for a few seconds
		//restart game
	}

	//general array printer to parent element using jQuery selectors
	function printArray(arr, parent) {
		//then loop through array, appending all entries
		for (var i = 0; i < arr.length; i++){
			console.log('Appending each element in array')
			parent.append(arr[i]);
		}
	}

	//this is where the game will remain on, until game over reached
	// while (guessRemain > 0){

	// }


	//debugging
	newWord();
	console.log('below should print the guesses remaining, then the array of guesses, then the print array functions.')
	guess('s');
	guess('s');
	guess('o');
	guess('t');

});