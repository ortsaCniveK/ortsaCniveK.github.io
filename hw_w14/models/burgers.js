const orm = require('./config/orm.js');

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
            return result;
        })
    },
    updateBurger : (id) => {
        orm.updateOne('burgers', 'devoured', 1, id, (result) => {
            return result;
        })
    }
}

module.exports = burgers
