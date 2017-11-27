var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cse305"
});

router.route('/addUser')
  .post(function(req, res){
    con.connect(function(err){
      if(err) throw err;
      console.log("Connected!");
    });
    console.log(req.body.firstName)
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var emailAddress = req.body.email;
    var password = req.body.password;
    var sql = "INSERT INTO Customer (FirstName, LastName, EmailAddress, Password) VALUES (?, ?, ?, ?)"
    console.log(sql);
    con.query(sql, [firstName, lastName, emailAddress, password], function (err, result) {
      if (err) throw err;
      console.log("1 customer inserted");
    });
  })
module.exports = router;
