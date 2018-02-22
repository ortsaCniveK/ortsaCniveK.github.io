const orm = require('../config/orm.js');

const burgers = {
    selectBurgers : (callback) => {
        //get the callback to return the result array
        orm.selectAll('burgers', (result) => {
            console.log(result)
            //do something with the result
            callback(result);
        });
    },
    insertBurger : (name, callback) => {
        orm.insertOne('burgers', 'burger_name', name, (result) => {
            //do something with the result
            callback(result);
        })
    },
    updateBurger : (id, callback) => {
        orm.updateOne('burgers', 'devoured', 1, id, (result) => {
            //return a bool which will determine if there was a successful update
            //since if the number is 0, it will default to false, we can just return the number
            callback(result.affectedRows);
        })
    }
}

module.exports = burgers
