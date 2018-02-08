const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

const connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : 'root',
	database : 'bamazon'
});

connection.connect((err) => {
	if (err) throw err;

	displayOptions();
});


//switch statement to choose the right function
const displayOptions = () => {
	inquirer.prompt([
		{
			message : 'BAMAZON SUPERVISOR PROGRAM',
			name : 'choice',
			type : 'list',
			choices : ['View Product Sales by Department', 'Create New Department']
		}
		]).then(
			answer => {
				switch(answer.choice){
					case 'View Product Sales by Department':
						viewSales();
						break;
					case 'Create New Department':
						createDept();
						break;
				}
			}
		);
}

const viewSales = () => {
	connection.query(
		`select *,
			(select sum(product_sales)
			from products
			inner join departments
			where departments.department_name = products.department_name) - overhead_costs as total_profits
		from departments`,
		(err, res) => {
			//use console.table for pretty tables
			console.table(res);
		});
}

const createDept = () => {
	inquirer.prompt([
		{
			message : 'Please enter a name for the department: ',
			name : 'name'
		},
		{
			message : 'Please enter the overhead costs of the department: ',
			name : 'cost'
		}
		]).then(answer => {
			connection.query(
				'insert into departments(department_name, overhead_costs)' + 
				'values(?, ?)', [answer.name, answer.cost],
				(err, res) => {
					console.log('Inserted new department into database.  See below for the new department: \n');
					//calling the viewSales function to show the updated db
					viewSales();
				});
		});

}