const db = require('../models/');
//routes
module.exports = function (app) {
    //home
    app.get('/', (req, res) => {
        //get all entries from the db
        //need to get the customer list before the burgers since the customers own the burgers
        db.customer.findAll().then(customers => {
            db.burger.findAll().then(burgers => {
                //render with handlebars
                res.render('index', {
                    //using singular for clarity in handlebars
                    burger : burgers,
                    customer : customers
                });
            });
        });
    });

    //sending new burger to db
    app.post('/burger', (req, res) => {
        //get request infomation being sent
        const name = req.body.name;

        //insert into the db, use request obj body
        //return back the burger as good practice
        db.burger.create({burger_name : name}).then(burger => res.json(burger));
    });

    app.post('/customer', (req, res) => {
        //get the name sent from the customer
        const newName = req.body.name;

        //insert into customers table
        //reflect back data
        db.customer.create({name: newName}).then(customer => res.json(customer));
    });

    //eating burgers
    //updating devoured flag
    app.put('/burger/:id/:customer', (req, res) => {
        //get the id for the burger to change on db
        const _id = req.params.id;
        const customer = req.params.customer;

        //change devour from false to true
        //return back updated instance as good practice
        db.burger.update({devoured : true, customerId: customer}, { where : {id : _id} }).then(burger => burger);
    });
}
