# Bamazon CLI App

#### An application to simulate a server that provides a customer shopping cart, inventory manager, and stock supervisor application

If running this application on a local machine, please be sure to
	`<npm install>`
before running the application.

## Customer CLI
The CLI that faces the customers is a straightforward application that prompts the customer to choose from the available products with an ID, then enter a quantity to purchase.

Below is the view the customer will see upon running the application:

![Customer Login Output](./images/01-Customer-Login-Output.png)

### Successful Orders
Below is a view of a successful order being placed, which will update the table on the server:

![Successful Order](./images/02-Successful-Order.png)

### Failed Orders
If the customer inputs an invalid quantity, the table will not be updated, the customer will be alerted to insufficient quantity, and will be prompted to re-enter a valid quantity:

![Failed Quantity](./images/03-Failed-Quantity.png)

After entering a valid quantity, they will see the success screen as before:

![Successful Order after Fail](./images/04-Successful-Order-After-Fail.png)

## Manager CLI
The CLI that works from the same local server provides added functionality for a product manager to manage and view the products for sale, the stock for each product, as well as track the sales for each product.

Upon login, the manager CLI will display the following:

![Manager Login](./images/05-Manager-Login.png)

### View Products for Sale
Choosing the `View Products for sale` option will display product information:

![Products for Sale View](./images/06-Product-For-Sale-View.png)

### View Low Inventory
Choosing `View Low Inventory` will display products that are below a specified threshold (in this case a stock of 5):

![Low Inventory View](./images/07-Low-Inventory-View.png)

### Add to Inventory
Choosing `Add to Inventory` will prompt the manager to choose a product to increase stock to, then display the updated value:

![Add to Inventory](./images/08-Add-To-Inventory.png)

### Add New Product
Upon choosing `Add New Product` the manager will see below after entering a name for the product.  This list is pulled from the server's master list of departments:

![Add New Product List](./images/09-Add-New-Product-List.png)

After choosing a department to add the product to, they can specify the price per product and the stock they have:

![Successful Product Added](./images/10-Successful-Product-Added.png)