const orm = require('../config/orm.js');

const burgers = {
    selectBurgers : () => {
        //get the callback to return the result array
        orm.selectAll('burgers', (result) => {
            //do something with the result
            return result;
        });
    },
    insertBurger : (name) => {
        orm.insertOne('burgers', 'burger_name', name, (result) => {
            //return back the insertId for button to be created
            return result.insertId;
        })
    },
    updateBurger : (id) => {
        orm.updateOne('burgers', 'devoured', 1, id, (result) => {
            //return a bool which will determine if there was a successful update
            //since if the number is 0, it will default to false, we can just return the number
            return result.affectedRows;
        })
    }
}

module.exports = burgers
