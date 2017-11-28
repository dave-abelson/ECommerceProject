var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.route('/addItem')
  .post(function(req, res){
    con.connect(function(err){
      if(err) throw err;
      console.log("Connected!");
    });
    var name = req.body.name;
    var price = req.body.price;
    var category = req.body.category;
    var sql = "INSERT INTO Item (Name, Price, Category) VALUES (?, ?, ?)"
    con.query(sql, [name, price, category], function(err, result){
	if (err) throw err;
        console.log("1 item inserted")
    });
  });
module.exports = router;
