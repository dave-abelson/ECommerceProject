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

router.post('/itemSearch', function(req, res, next){
        console.log(req.body)
        var query = req.body.query;
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

module.exports = router;

