var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var utils = require('../dbutils')

router.post('/updateInventory', function(req, res, next) {
    console.log(req.body)
    var tableName = req.body.tableName
    var columnNames = req.body.columnNames
    var vals = req.body.values
    var whereClause = req.body.whereClause
    utils.update(tableName, columnNames, vals, whereClause)
    console.log("Called update")
})

router.post('/displayShoppingCart', function(req, res, next){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "cse305"
	});

	con.connect(function(err) {
  		if (err) throw err;
  		var sql = "SELECT Item.Name, Item.price, ShoppingCart.ItemQuantity FROM Item INNER JOIN ShoppingCart ON Item.ID = ShoppingCart.ItemID";
  		con.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log(result);
		return res.send({status: 'OK', result: result})
  	});
});
	var customerID = req.body.user.ID
	var tableNames = ["ShoppingCart"]
	var columnNames = ['ItemID', 'ItemQuantity']
	var whereClauses = ["CustomerID = ?"]
	var fillerVals = [customerID]
	var shoppingCart = []
	var returnARR = []
	utils.select(tableNames, columnNames, whereClauses, fillerVals, function(result){
		for(var i=0; i < result.length; i++){
			console.log(result[i])
		}
	})

	
})

router.post('/addToShoppingCart', function(req, res, next){
	console.log(req.body)
	var itemID = req.body.item.ID
	var customerID = req.body.user.ID
	var quantity = 1
	
	utils.select('ShoppingCart', ['*'], ['CustomerID = ?'], [customerID], function(result){
                if (result.length == 0){
                        console.log("Creating New Shopping Cart")
                        var row = {ItemQuantity: quantity, CustomerID: customerID, ItemID: itemID}
			console.log(row)
                        utils.insertRow('ShoppingCart', row)
                        return res.send({status: 'OK'})
                }else{
                        console.log("Update Shopping Cart")
			console.log(result)
			var current = result[0]
			for(var i = 0; i < result.length; i++) {
				current = result[i]
				if(current.ItemID == itemID){
                        		newValue = current.ItemQuantity + quantity
                        		var tableName = 'ShoppingCart'
                        		var columnNames = ['ItemQuantity']
                        		var newVals = [newValue]
                        		var whereClause = 'ShoppingCartID = ?'
                        		var filler = current.ShoppingCartID
                        		utils.update(tableName, columnNames, newVals, whereClause, filler)
                        		return res.send({status: 'OK'})
				}
			}
			var ShoppingCartID = current.ShoppingCartID
			var CustomerID = current.CustomerID
			var row = {ItemQuantity: quantity, CustomerID: CustomerID, ItemID: itemID}
                        console.log(row)
                        utils.insertRow('ShoppingCart', row)
                        return res.send({status: 'OK'})
              } 
        })

});

router.post('/itemSearch', function(req, res, next){
        console.log(req.body)
        var query = req.body.query;
        if(query == ''){
                utils.selectAll('Item', function(result){
                        console.log(result)
                        return res.send({status: 'OK', result: result})
                });
        }else{
		var results
                var tableNames = ["Item"]
                var columnNames = ['*']
                var whereClauses = ["Name = ?"]
                var fillerVals = [query]
                utils.select(tableNames, columnNames, whereClauses, fillerVals, function(result){
                	results = result
                	console.log(result)
                	return res.send({status: 'OK', result: result})
                });
        }
});

module.exports = router;

