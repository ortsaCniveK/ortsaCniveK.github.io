//basic pseudo

//on click for character sections, move that char to the fight section, set to player
	//to move an html element (in base js): https://stackoverflow.com/questions/3357575/how-to-move-html-element
	//note, best to handle this section with a class selector
	//additionally, move the other two to the barracks section, allowing the user to choose their first opponent

//upon choosing their opponents, normal game takes place
	//fight button both lowers opponent hp, but also the players according to each attack power
		//may be good to separate the attack functions to PlayerAttack, and computerAttack
	//keep in mind their base attack power does not ramp up, but the player's does.
	//this should be easy, since we can take in the base, and set it to the adder var (or something like it)

//assure that there are ways for each character to win. (make sure math checks out.)

//upon defeating two enemies (all enemies) give an alert that they won, maybe refresh the page after dismissing to start again.