const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon'
});

connection.connect((err) =>{
	if (err) throw err;
	displayOptions();
});

const displayOptions = () => {
	inquirer.prompt([
		{
			message: 'Welcome to the Bamazon Manager.  Please choose an option.',
			name: 'choice',
			type: 'list',
			choices: [
				'View Products for Sale',
				'View Low Inventory',
				'Add to Inventory',
				'Add New Product'
			]
		}
		]).then( (answer) => {
			switch(answer.choice){
				case 'View Products for Sale':
					viewAll();
					break;
				case 'View Low Inventory':
					console.log('test');
					break;
				case 'Add to Inventory':
					console.log('test');
					break;
				case 'Add New Product':
					console.log('test');
					break;
			}
		});
}

const viewAll = () => {
	connection.query(
		'select * from products',
		(err, res) => {
			if (err) throw err;


		});
}

const lowInv = () => {

}

const addInv = () => {

}

const addNew = () => {

}