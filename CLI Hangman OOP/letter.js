const Letter = function(letter){
	this.letter = letter;
	this.guessed = false;

	//outputs the letter
	this.getLetter = function(){
		if (this.guessed){
			return this.letter;
		}

		//else give back placeholder
		return '_';
	};

	//checks the letter
	this.checkLetter = function(char){
		if ((typeof char === 'string' && char.length === 1) && char === this.letter){
			//return true and set guessed marker to true
			return this.guessed = true;
		}
		//else return false;
		return false;
	}
}

module.exports = Letter;