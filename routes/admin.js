var express     = require('express');
var router      = express.Router();
var mysql = require('mysql');
var utils = require('../dbutils')

router.get('/', function(req, res, next){
        res.render('admin', {title: "E-Commerce Administration"});
});

router.post('/addItem', function(req, res, next){
	console.log(req.body)
	var name = req.body.name;
    	var price = req.body.price;
    	var category = req.body.category;
        utils.select('Item', ['*'], ['Name = ?'], [name], function(result){
		if (result.length == 0){	
			console.log("Inserting New Item")
			var row = {Name: name, Price: price, Category: category}
    	     		utils.insertRow('Item', row)	
			return res.send({status: 'OK', name: name})
		}else{
			console.log("ITEM ALREADY EXISTS")
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

router.post('/updateInventory', function(req, res, next){
	console.log(req.body)
	var id = req.body.id
	var quantity = req.body.quantity	
	
	// first check if item is in the inventory
	// if it exists update count with new quantity
	// if it doesn't exist, enter it into the inventory with ID and Quantity
	utils.select('Inventory', ['*'], ['ItemID = ?'], [id], function(result){
                if (result.length == 0){
                        console.log("Inserting Item ID")
                        var row = {ItemQuantity: quantity, ItemID: id}
                        utils.insertRow('Inventory', row)
                        return res.send({status: 'OK'})
                }else{
			console.log("Updating Inventory")
			var current = result[0].ItemQuantity
			newValue = current + quantity
			var tableName = 'Inventory'
			var columnNames = ['ItemQuantity']
			var newVals = [newValue]
			var whereClause = 'ItemID = ?'
			var filler = id
			utils.update(tableName, columnNames, newVals, whereClause, filler)
			return res.send({status: 'OK'})
                }
        })
	
});

router.post('/userSearch', function(req, res, next){
	console.log(req.body)
	var query = req.body.firstName
	if(query == ''){
		utils.selectAll('Customer', function(result){
			console.log(result)
			return res.send({status: 'OK', result: result})
		});
	} else{
                var results
                var tableNames = ["Customer"]
                var columnNames = ['*']
                var whereClauses = ["FirstName = ?"]
                var fillerVals = [query]
                utils.select(tableNames, columnNames, whereClauses, fillerVals, function(result){
                        results = result
                        console.log(result)
                        return res.send({status: 'OK', result: result})
                });

        }
});
module.exports = router;
