//on click for submit
$('#submit').on('click', (e) => {
    e.preventDefault();
    //collect the data from the form
    const newBurger = {
        name : $('#new-burger').val().trim()
    }

    //create post request on db
    $.ajax('/burger', {
            type : 'POST',
            data : newBurger
        });

    location.reload();
});

//onclick for the button in each non-devoured burger
//no need for document listener since we reload every time a db change happens
$('.not-devoured').on('click', function (e){
    e.preventDefault();

    //get the id of the burger
    const id = $(this).data('id');

    //we actually just send the id to make the db change, we only need to send it once
    $.ajax(`/burger/${id}`, {
        type: 'PUT'
    });

    //refresh the page to reflect the change
    location.reload();
});
