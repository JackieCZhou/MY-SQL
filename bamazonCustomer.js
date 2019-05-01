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
});

var listProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
            colWidths: [10, 15, 15, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
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
            message: "Welcome to bAamazon! What is the item's ID for your purchase?",
            filter: Number
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
            filter: Number
        }
    ]).then(function (answers) {
        var quantityNeeded = answers.quantity;
        var IDrequested = answers.item_id;
        finishOrder(IDrequested, quantityNeeded);
    })
        .catch(function (error) {
            console.log(error);
        })
};

function finishOrder(ID, amtNeeded) {
    connection.query('Select * FROM products WHERE item_id = ' + ID, function (err, res) {
        if (amtNeeded <= res[0].stock_quantity) {
            var totalCost = res[0].price * amtNeeded;

            console.log(amtNeeded);
            console.log(res[0].stock_quantity);

            console.log("Congratulations! your item is in stock!");
            console.log("Your total cost for " + amtNeeded + " " + res[0].product_name + " is $" + totalCost + " Thank you for your order!");

            var updateQuery = "UPDATE products SET stock_quantity = " + (res[0].stock_quantity - amtNeeded  ) + " WHERE item_id = " + ID;
            connection.query(updateQuery, function (err, res) {
                if (err) { console.log(err) };

            });
        } else {
            console.log("So sorry, there's not enough available! Select less " + res[0].product_name + " to complete your order.");
        };
        listProducts();
    });
}

listProducts();