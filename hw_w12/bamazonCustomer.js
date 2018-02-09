const mysql = require('mysql');
const inquirer = require('inquirer');

//create connection with specified params
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon'
});

//connect to db
connection.connect((err) => {
	if (err) throw err;
	displayProducts();
});

const displayProducts = function(){
	connection.query(
		'select item_id, product_name, price from products', 
		(err, res) => {
			if (err) throw err;

			//organize result into nice looking view
			console.log('\tID\tPRICE\tPRODUCT');
			res.forEach( row => {
				console.log('\t' + row.item_id + '\t' + row.price.toFixed(2) + '\t' + row.product_name);
			});
			chooseProductById();
		});
}


const chooseProductById = function(){
	inquirer.prompt([
		{
			message: 'Please enter a product you would like to purchase by entering its ID: ',
			name: 'id',
			validate: function(input){
				//see if parsing as a number is truthy
				if (parseInt(input)){
					return true;
					//check to see if the id exists?
				}
				//else
				return 'Please enter a valid ID.';
			}
		}
		]).then((answer) => {
			//call the pickQuantity function
			//passing id to keep the data
			pickQuantity(answer.id);
		});
}

const pickQuantity = function(id){
	inquirer.prompt([
		{
			message: 'Please enter a quantity of this product: ',
			name: 'quantity',
			validate: function(input){
				//same as before, collect ints
				if (parseInt(input)){
					return true;
				}
				return 'Please enter a number quantity.';
			}
		}
		]).then( (answer) => {
			placeOrder(id, answer.quantity);
		});
}

const placeOrder = function(id, quantity){
	connection.query(
		'update products set stock_quantity = stock_quantity - ?, product_sales = product_sales + (price * ?) where item_id = ? and stock_quantity + 1 > ?',
		//I used stock_quantity+1 to kind of "cheat" >= operator
		[quantity, quantity, id, quantity],
		(err, res) => {
			if (err) throw err;

			//check to see if there was any change on the server
			if (res.affectedRows === 0){
				console.log('Insufficient quantity!');
				//make a call to change the quantity
				pickQuantity(id);
			} else {
				//else simply alert the user the order went through
				//needed to assure async issues don't come up
				console.log('Your order has been placed.');
				connection.end();
			}
		});
}