const express = require('express');
const burgers = require('../models/burgers.js');

//since we're exporting the router, only need express router
const router = express.Router();

//routes

//home
router.get('/', (req, res) => {
    //get the current burgers in the db
    burgers.selectBurgers( (data) => {
        //testing
        console.log(data)
        router.render('index', {
            //serve them to the index page with proper data
            burger : data
        });
    });
});

//sending new burger to db
router.post('/burger', (req, res) => {
    //get request infomation being sent
    const name = req.body;
    //insert into the db
    burgers.insertBurger(name, (insertId) => {
        //testing
        console.log(insertId)

        //get back the insert id for button to be created
        //redirect to refresh page in html's script
        res.send(insertId);
    });
});

//eating burgers
//updating devoured flag
router.put('/burger/:id', (req, res) => {
    //get the id for the burger to change on db
    const id = req.params.id
    //call update function for the db
    updateBurger(id, (dbChange) => {
        //check to see if there was a change on the db
        //vals passed back are false if no change
        if (!dbChange){
            alert(`No id found: ${id}`);
        }

        //else, we refresh the page to display the change
        res.redirect('/');
    })
});

module.exports = router;
