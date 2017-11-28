var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var utils = require('../dbutils')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cse305"
});

router.route('/addUser')
  .post(function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var emailAddress = req.body.email;
    var password = req.body.password;
    var row = {FirstName: firstName, LastName: lastName, EmailAddress: emailAddress, Password: password}
    utils.insertRow('Customer', row)
  })
module.exports = router;
