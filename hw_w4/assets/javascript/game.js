// start modal when page loads
$(document).ready(
	function(){
		$('#greeting').modal('toggle')
		$('.fightMsg').hide()
	}
)

var playerChar, enemyChar;
//basic pseudo

//on click for character sections, move that char to the fight section, set to player
	//to move an html element (in base js): https://stackoverflow.com/questions/3357575/how-to-move-html-element
	//note, best to handle this section with a class selector
	//additionally, move the other two to the barracks section, allowing the user to choose their first opponent

//character class listeners
$(document).on('click', '.charBtn', function() {
	//set choice for player
	playerChar = $(this).data('char')
	//hide the chosen player button
	$(this).hide()
	
	//move the other characters to the barracks
	$('.characterCard').each(function (index) {
		if ($(this).attr('id') !== playerChar){
			//if id is not matching playerChar, move to barracks
			$('.barracks').append($(this).remove())
			//also add attribute to mark the button as an enemy choice button
			$('.charBtn').each(function(){
				$(this).removeClass('charBtn')
				$(this).addClass('enemy')
			})
		} else {
			//remove the col-sm-4 class for style
			$(this).removeClass('col-sm-4')
			//move the chosen player to the battle area, remove from current container
			$('#player').append($(this).remove())
		}
	})

	//after all of this is done, hide character selection div
	$('.select').hide()
})

//enemy class listeners
$(document).on('click', '.enemy', function(){
	//just as before, we set the clicked enemy to the variable enemyChar
	enemyChar = $(this).data('char')
	//and hide the button for the selected card
	$(this).hide()

	//then we move the selected card to the enemy side, hiding the last one
	$('.characterCard').each(function (index){
		if($(this).attr('id') !== enemyChar && $(this).attr('id') !== playerChar){
			//if it's not the chosen one, hide it
			$(this).hide()
		} 
		//if it is the chosen enemy card
		else if ($(this).attr('id') !== playerChar){
			//remove the col-sm-4 class
			$(this).removeClass('col-sm-4')
			//remove it to the enemy spot
			$('#opponent').append($(this).remove())
		}
	})

	//after all of this happens, hide the barracks div
	$('.barracks').hide()
	$('.fightMsg').show()
})


$('#fight').click(function(){
	alert('You Win!')
})
//hide the choose buttons on all of the charBtns after enemy choice is made
// $('.charBtn').hide()
//upon choosing their opponents, normal game takes place
	//fight button both lowers opponent hp, but also the players according to each attack power
		//may be good to separate the attack functions to PlayerAttack, and computerAttack
	//keep in mind their base attack power does not ramp up, but the player's does.
	//this should be easy, since we can take in the base, and set it to the adder var (or something like it)

//assure that there are ways for each character to win. (make sure math checks out.)

//upon defeating two enemies (all enemies) give an alert that they won, maybe refresh the page after dismissing to start again.