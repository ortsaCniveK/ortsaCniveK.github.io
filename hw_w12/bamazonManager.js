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

//generalized validate func
const validateNum = (input) => {
	if (parseInt(input)){
		return true;
	}
	return 'Please enter a valid number';
}

//really only used by the add
const validateFloat = (input) => {
	if (parseFloat(input)){
		return true;
	}
	return 'Please enter a valid number'
}

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
				'Add New Product',
				'Logout'
			]
		}
		]).then( (answer) => {
			switch(answer.choice){
				case 'View Products for Sale':
					viewAll();
					break;
				case 'View Low Inventory':
					lowInv();
					break;
				case 'Add to Inventory':
					addInv();
					break;
				case 'Add New Product':
					addNew();
					break;
				case 'Logout':
					connection.end();
					break;
			}
		});
}

//creating a generalized equation for logging the results
const printResults = (results) => {
	console.log('\tID\t|\tSTOCK\t|\tPRICE\t|\tDEPARTMENT\t|\tPRODUCT NAME\n');
	results.forEach((product) => {
		//alias for tags, to make the log more readable
		const id = product.item_id;
		const stock = product.stock_quantity;
		const price = product.price;
		const dept = product.department_name;
		const name = product.product_name;

		console.log('\t' + id + '\t|\t' + stock + '\t|\t' + price + '\t|\t' + dept + '\t|\t' + name + '\n');
	})
}


//view all information has an optional param that can be passed
//which prints all of the information for a specific id
//used by addInv()
const viewAll = (id) => {
	//if id is passed
	if (id) {
		connection.query(
			'select * from products where item_id = ?',
			[id],
			(err, res) => {
				if (err) throw err;

				printResults(res);
				displayOptions();
			});
	} else {
		connection.query(
		'select * from products',
		(err, res) => {
			if (err) throw err;

			printResults(res);
			displayOptions();
		});
	}
}

const lowInv = () => {
	connection.query(
		'select * from products where stock_quantity < 5',
		(err, res)=>{
			if (err) throw err;

			printResults(res);
			displayOptions();
		});

}

const addInv = () => {
	inquirer.prompt([
		{
			message : 'Please enter an ID to add stock to: ',
			name : 'id',
			validate: validateNum
		}
		]).then( answer => {
			connection.query(
				'select * from products where item_id = ?', 
				[answer.id], 
				(err, res) =>{
					if (err) throw err;

					//print the information before prompting 
					printResults(res);

					inquirer.prompt([
						{
							message : 'Enter the amount to increase the stock by: ',
							name : 'increase',
							validate: validateNum	
						}
						]).then( update => {
							connection.query(
								'update products set stock_quantity = stock_quantity + ? where item_id = ?',
								[update.increase, answer.id],
								(error, result) => {
									if (error) throw error;

									console.log('Update success.\n');

									//call the viewAll function with the optional param
									//also calls the displayOptions() function
									viewAll(answer.id);
								});
						})
				})
		})

}

const addNew = () => {
	inquirer.prompt([
		{
			message : 'Please enter the product name: ',
			name : 'name'
		},
		{
			message : 'Please enter the department to which it belongs to: ',
			name : 'dept',
			type : 'list',
			choices : [
			'Books & Audible', 
			'Movies, Music, & Games', 
			'Electronics, Computer, & Office', 
			'Home, Garden, Pets, & Tools', 
			'Restaurants, Food, & Grocery', 
			'Beauty & Health', 
			'Toys, Kids, & Baby', 
			'Clothing, Shoes, & Jewelry', 
			'Handmade', 
			'Sports & Outdoors', 
			'Automotive & Industrial']
		},
		{
			message : 'Please enter the price per product: ',
			name : 'price',
			validate: validateFloat
		},
		{
			message : 'Please enter the stock you currently have: ',
			name : 'stock',
			validate: validateNum
		}]).then(answer => {
			connection.query(
				'insert into products (product_name, department_name, price, stock_quantity)' + 
				'values(?, ?, ?, ?)',
				[answer.name, answer.dept, answer.price, answer.stock],
				(err, res) => {
					if (err) throw err;

					console.log('Product added. \n');

					viewAll();
				});
		});

}