var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err){
  if(err) throw err;
  console.log("Connected!");
});

router.route('/addUser')
  .post(function(req, res){
    var sql = "INSERT INTO Customer (FirstName, LastName, EmailAddress, Password) VALUES (${req.body.firstName}, ${req.body.lastName}, ${req.body.emailAddress}, ${req.body.password})"
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 customer inserted");
    });
  })

module.exports = router;
