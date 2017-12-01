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
    var row = {FirstName: firstName, LastName: lastName, EmailAddress: emailAddress, Password: password}
    utils.insertRow('Customer', row)
  })

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
	var whereClauses = ["FirstName = 'dave'"]
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

module.exports = router;
