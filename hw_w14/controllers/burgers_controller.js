const express = require('express');
const path = require('path');
const burgers = require(path.join(__dirname, '../models/burgers.js'));

//since we're exporting the router, only need express router
const router = express.Router();

//routes

//home
router.get('/', (req, res) => {
    //get the current burgers in the db
    burgers.selectBurgers( (data) => {
        //testing
        console.log(data)
        res.render('index', {
            //serve them to the index page with proper data
            burger : data
        });
    });
});

//sending new burger to db
router.post('/burger', (req, res) => {
    //get request infomation being sent
    const name = req.body.name;
    //insert into the db
    burgers.insertBurger(name, (data) => {
        //check to see if the insertId is legit
        if (data.insertId){
            //then send OK, refresh the page
            return res.status(200).redirect('/');
        }
        //else, send back 404
        res.status(404);
    });
});

//eating burgers
//updating devoured flag
router.put('/burger/:id', (req, res) => {
    //get the id for the burger to change on db
    const id = req.params.id
    //call update function for the db
    burgers.updateBurger(id, (dbChange) => {
        //check to see if there was a change on the db
        //vals passed back are false if no change
        if (!dbChange){
            //if no id found, send back 404
            res.status(404);
        }

        //else, we refresh the page to display the change
        res.status(200).redirect('/');
    })
});

module.exports = router;
