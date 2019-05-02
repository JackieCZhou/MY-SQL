Bamazon

Description:

This application implements a command lined based storefront using the following packages:
npm inquirer
MYSQL
cli-table

Database Setup:
This application requires MYSQL to run as well as downloading the packages mentioned above.  Once the application is setup you will be able to proceed with running the Bamazon interface.


Customer Interface:
This allows the user to view the current inventory of store items:  Sorted by item IDs, descriptions, department in which the item is located and price. Using the inquirer prompt the user is asked a series of questions to purchase items from the list.  If the selected item and amount of item requested are available, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.
