var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var utils = require('../dbutils')

router.route('/addUser')
	.post(function(req, res){
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var emailAddress = req.body.email;
		var password = req.body.password;

		utils.select('Customer', ['*'], ['EmailAddress = ?'], [emailAddress], function(result){
        	        if (result.length == 0){
                	        console.log("Inserting New Customer")
				var row = {FirstName: firstName, LastName: lastName, EmailAddress: emailAddress, Password: password}
                		utils.insertRow('Customer', row)
                		return res.send({status: 'OK', user: row})
                	}else{
                        	console.log("EMAIL ALREADY EXISTS")
				return res.send({status: 'ERROR', error_message: "Email already exists"})
                	}
	        })

	})

router.route('/login')
	.post(function(req, res){
		var email = req.body.email
		var password = req.body.password
		
		var results
	        var tableNames = ["Customer"]
       		var columnNames = ['*']
        	var whereClauses = ["EmailAddress = ?", "Password = ?"]
        	var fillerVals = [email, password]
        	utils.select(tableNames, columnNames, whereClauses, fillerVals, function(result){
            	results = result
            	console.log(results)
		user = results[0]
            	res.send({status: 'OK', user: user})
        })

				
	});

router.route('/allUsers')
    .get(function(req, res){
    	console.log('in all users')
	var customers
	utils.selectAll("Customer", function(result){
	    customers = result
	    console.log(customers)
	    res.send(customers)
	})
    })

router.route('/testWhere')
    .get(function(req, res){
        console.log('in test where')
	var results
	var tableNames = ["Customer"]
	var columnNames = ["FirstName", "LastName"]
	var whereClauses = ["FirstName = ?"]
	var fillerVals = ['dave']
	utils.select(tableNames, columnNames, whereClauses, function(result){
	    results = result
	    console.log(results)
	    res.send(results)
	})
    })

router.route('/deleteUser')
    .post(function(req, res){
	console.log("In delete user")
	utils.deleteRow("Customer", req.body)
	res.sendStatus(200)
    })

router.route('/logout')
	.get(function(req, res){
		console.log("Logging out")
		return res.send({status: 'OK'})
	});
module.exports = router;
