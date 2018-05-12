//on page load, start modal functionality
$( () => {
    $('.modal').modal({
        dismissible : false
    });
})

//declare as undefined for check later
let customerId;

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
//using normal function call since we need _this_
$('.not-devoured').on('click', function (e){
    e.preventDefault();

    //get the id of the burger
    const id = $(this).data('id');

    //check to see if a customerId exists
    //I know alerting is bad practice, but I'm lazy :/
    if(customerId){ return alert(`Please choose a customer.`); }

    //we actually just send the id to make the db change, we only need to send it once
    $.ajax(`/burger/${id}/${customerId}`, {
        type: 'PUT'
    });

    //refresh the page to reflect the change
    location.reload();
});

//choosing customer from collection


//add new customer onclick
$('#customer').on('click', (e) => {
    e.preventDefault();

    //collect data from new customer form
    const newCustomer = {
        name : $('#new-customer').val().trim()
    }

    //send to db
    $.ajax('/customer', {
        type : 'POST',
        data : newCustomer
    }).done((data) => {
        //getting back the data from db and set the customer to what the user inputted
        customerId = data.id;
    });
});
