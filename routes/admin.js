var express     = require('express');
var router      = express.Router();
var mysql = require('mysql');
var utils = require('../dbutils')

var con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'cse305'
});

router.get('/', function(req, res, next){
        res.render('admin', {title: "E-Commerce Administration"});
});

router.post('/addItem', function(req, res, next){
	console.log(req.body)
	var name = req.body.name;
    	var price = req.body.price;
    	var category = req.body.category;
    	var row = {Name: name, Price: price, Category: category}
    	utils.insertRow('Item', row)	
	return res.send({status: 'OK', name: name})
});

router.post('/itemSearch', function(req, res, next){
	console.log(req.body)
	var query = req.body.name;
	//result = utils.selectAll('Item')
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT * FROM Item", function (err, result) {
    			if (err) throw err;
			return res.send({status: 'OK', result: result})
    			console.log(result);
		});
	});	


});
module.exports = router;
