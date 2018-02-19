const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'burgers_db'
});

connection.connect( err => {
    if (err){
        return console.log(`error connecting: ${err.stack}`);
    }

    console.log(`connected as id: ${connection.threadId}`);
});

module.exports = connection;
