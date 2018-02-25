//on click for submit
$('#submit').on('click', () => {
    //collect the data from the form
    const newBurger = {
        name : $('#new-burger').val().trim()
    }

    console.log(newBurger)

    //create post request on db
    $.ajax('/burger', {
        type : 'POST',
        data : newBurger
    }).then(() => {
        location.reload();
    });
});

//onclick for the button in each non-devoured burger

//on click for a list item, turns it into a form

//after getting information, create put request into db
