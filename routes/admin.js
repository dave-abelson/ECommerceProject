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
	var quantity = req.body.quantity;
	// If not in Item add to item
	// if quantity > 0 add to inventory or update inventory count
	
    	var row = {Name: name, Price: price, Category: category}
    	utils.insertRow('Item', row)	
	return res.send({status: 'OK', name: name})
});

router.post('/itemSearch', function(req, res, next){
	console.log(req.body)
	var query = req.body.name;
	if(query == ''){
		utils.selectAll('Item', function(result){
                	console.log(result)
                	return res.send({status: 'OK', result: result})
        	});	
	}else{
		query = '\'' + query + '\''
		utils.select(['Item'], ['*'], ['Name=' + query],function(result){
			console.log(result)		
			return res.send({status: 'OK', result: result})
		});
	}
});

router.post('/userSearch', function(req, res, next){
	console.log(req.body)
	var query = req.body.firstName
	if(query == ''){
		utils.selectAll('Customer', function(result){
			console.log(result)
			return res.send({status: 'OK', result: result})
		});
	}
});
module.exports = router;
