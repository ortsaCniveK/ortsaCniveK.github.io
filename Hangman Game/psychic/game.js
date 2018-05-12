$(document).ready(function(){
	var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

	var guessesLeft;
	var guessesSoFar;
	var wins = 0;
	var losses = 0;
	var psychicGuess;

	function startGame() {
		guessesLeft = 9
		guessesSoFar = [];

		//chooses a random letter from the letters array
		psychicGuess = letters[Math.floor(Math.random() * letters.length)];
		console.log(psychicGuess);
		//build the display:
		buildDisplay();
	}

	function buildDisplay() {
		var winsDiv = $('#wins');
		var lossesDiv = $('#losses');
		var guessesLeftDiv = $('#guesses-left');
		var guessesSoFarDiv = $('guesses-so-far');
		winsDiv.text('Wins: ' + wins);
		lossesDiv.text('Losses: ' + losses);
		guessesSoFarDiv.text('Guesses So Far: ' + guessesSoFar.toString());
		guessesLeftDiv.text('Guesses Left: ' + guessesLeft);
	}

	function checkIfAlreadyGuessed(key) {
		if (guessesSoFar.indexOf(key) > -1){
			//if key is found
			return true;
		}
		else {
			return false;
		}
	}

	$(document).on('keyup', function(event) {
		var key = event.key.toUpperCase();

		if (checkIfAlreadyGuessed(key)){
			alert('You have already guessed ' + key);
			return;
		}


		if (key === psychicGuess){
			//if the guess is correct
			//win!
			wins++;
			startGame();
			alert('YOU WIN!');
		} else {
			//guess was not correct, decrease guessesLeft
			guessesLeft--;

			if (guessesLeft === 0){
				//lose!
				startGame();
				losses++;
				alert('You lose!');
			}
			else {
				//push guesses so far to array of Guesses So Far
				guessesSoFar.push(key);
			}
		}
		buildDisplay();
	});

	//calling the game to start on page load

	startGame();
});