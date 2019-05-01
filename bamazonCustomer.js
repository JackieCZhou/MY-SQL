var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",

    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // listProducts();
});

var listProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
			colWidths: [10,15,15,10,10]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
		buyItem();
	});
}

    function buyItem() {
        inquirer.prompt([
            {
                type: "input",
                name: "item_id",
                message: "What is the item's ID?",
                filter: Number
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?",
                filter: Number
            }
        ]).then(function(answers){
            var quantityNeeded = answers.quantity;
            var IDrequested = answers.item_id;
            finishOrder(IDrequested, quantityNeeded);
        });
       };
       function finishOrder(ID, amtNeeded){
        connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
            if(err){console.log(err)};
            if(amtNeeded <= res[0].stock_quantity){
                var totalCost = res[0].price * amtNeeded;
                console.log("Congratulations! your item is in stock!");
                console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is $" + totalCost + " Thank you for your order!");
    
                // connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
            } else{
                console.log("So sorry, there's not enough available! Select less " + res[0].product_name + " to complete your order.");
            };
            listProducts();
        });
    };
    
    listProducts(); 
    
        
    //     .then(function (input) {

    //         var item = input.item_id;
    //         var quantity = input.stock_quantity;
    //         var query = "SELECT * FROM products WHERE ?";

    //         connection.query(query, { item_id: item }, function (err, data) {
    //             if (err) throw err;

    //             if (data.length === 0) {
    //                 console.log("ERROR: Invalid Item ID. Please select a valid Item ID.");

    //             } else {
    //                 var productData = data[0];
    //                 if (quantity <= productData.stock_quantity) {
    //                     console.log("Your requested item is available! Placing Order!");

    //                     var updateQuery = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + "WHERE item_id = " + item;

    //                     connection.query(updateQuery, function (err, data) {
    //                         if (err) throw err;

    //                         console.log("Order Placed! Your total is $" + productData.price * quantity);
    //                         console.log("Thank you for shopping with Bamazon!!");
    //                         console.log("\n---------------------------------------------------------------------\n");

    //                         connection.end();
    //                     })
    //                 } else {
    //                     console.log("Sorry, there is not enough product in stock, please select lower quantity");
    //                     console.log("\n---------------------------------------------------------------------\n");

    //                     listProducts();
    //                 }
    //                 buyItem();
    //             }
    //         })
    //     })
    // }
