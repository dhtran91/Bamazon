const mysql = require("mysql");
const inquirer = require("inquirer");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    queryAllProducts();
});

function queryAllProducts() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        res.map((x) => {
            console.log(`ID: ${x.item_id} | Product Name: ${x.product_name} | Department Name: ${x.department_name} | Price: ${x.price} | Stock Quantity: ${x.stock_quantity}\n`)
        })

        inquirer.prompt([
            {
                message: "What product would you like to buy? (Enter an ID)",
                type: "input",
                name: "buy"
            },
            {
                message: "How many would you like to buy?",
                type: "input",
                name: "amount"
            }

        ]).then(function (answer) {
            checkStockQuantity(answer.buy, answer.amount);
            
        });

    })
};

function checkStockQuantity(itemID, purchaseQuantity) {
    connection.query("SELECT * FROM products WHERE item_id = ?", [itemID], (err, res) => {
        if (err) throw err;
        if (purchaseQuantity <= res[0].stock_quantity) {
            createOrder(res, purchaseQuantity);
        } else {
            return console.log("Insufficient quantity!")
        };
    });
}



function createOrder(item, purchaseQuantity) {
    let product = item[0];
    connection.query("INSERT INTO orders SET ?",
        [
            {
                item_id: product.item_id,
                order_name: product.product_name,
                price: product.price,
                order_quantity: purchaseQuantity,
                total: purchaseQuantity * product.price
            }
        ],
        (err, res) => {
            if (err) throw err;
            console.log(res.affectedRows + " Order created!");
            updateStockQuantity(product.item_id, purchaseQuantity)
        })
        
}

function updateStockQuantity(productID, quantity) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, productID],
        (err, res) => {
            if (err) throw err;
            console.log(res.affectedRows + " Stock quantity updated!");
            connection.end();
        })

}
// function createProducts() {
//     connection.query("INSERT INTO products SET ?",
//         [

//         ],
//         (err, res) => {
//             if (err) throw err;
//             console.log(res.affectedRows + " Song created!");

//         })

// }
// function deleteProducts() {
//     connection.query("DELETE FROM products WHERE ?",
//         [

//         ],
//         (err, res) => {
//             if (err) throw err;
//             console.log(res.affectedRows + " Song(s) deleted!");

//         })

// }