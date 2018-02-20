const connection = require('./connection.js');


//using callbacks to clean up the calls in the server file
const orm = {
    selectAll: (table, callback) => {
        //for all of these, write out the queries before inputting into mysql query
        //note that for ??s we are avoiding using double quotes, which are strictly for vals
        const query = `select * from ??`;
        connection.query(
            query,
            [table],
            (err, result) => {
                if (err) throw err;
                //callback call
                callback(result);
            }
        );
    },
    insertOne: (table, colName, value, callback) => {
        const query = `
        insert into ?? (??)
        values (?)
        `
        connection.query(
            query,
            [table, colName, value],
            (err, result) => {
                if (err) throw err;
                callback(result);
            }
        )
    },
    updateOne: (table, colName, newVal, id, callback) => {
        const query = `
        update ??
        set ?? = ?
        where id = ?
        `
        connection.query(
            query,
            [table, colName, newVal, id],
            (err, result) => {
                if (err) throw err;
                callback(result);
            }
        )

    }
}

module.exports = orm;
