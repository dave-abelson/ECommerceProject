var mysql = require('mysql')

var connection;

function dbutils(){

}

function getConnection(){
    if (connection == null){
    	connection = mysql.createConnection({
	     host: '127.0.0.1',
	     user: 'root',
	     password: '2016dc',
	     database: 'cse305'
        });
    }

    return connection;
}

dbutils.insertRow = function (tableName, row){
    var sql = "INSERT INTO " + tableName
    var values = "VALUES("
    var columns = "("
    var insertVals = []
    for (var key in row){
        columns += key
	columns += ","
	values += "?,"
	insertVals.push(row[key])
    } 
    columns = columns.slice(0, -1)
    columns += ") "
    values = values.slice(0, -1)
    values += ")"

    sql += columns
    sql += values
    console.log(sql)
    console.log(insertVals)
	
    getConnection().query(sql, insertVals, function (err, result) { if (err) throw err }) 
}

dbutils.deleteRow = function (tableName, keyValPair) {
    var primaryKey
    var value
    for (key in keyValPair){
        primaryKey = key
	value = keyValPair[key]
    }
    var sql = "DELETE FROM " + tableName + " WHERE " + primaryKey + "=?";
    getConnection().query(sql, value, function (err, result) { if (err) console.log("Unable to delete row")})
}

dbutils.selectAll = function (tableName, callback) {
    var sql = "SELECT * FROM " + tableName 
    console.log(sql)
    var resultSet
    getConnection().query(sql, function (err, result) { 
        if (err) console.log(err)
	else return callback(result)
    })
}

dbutils.execQuery = function(qry, callback) {
    var sql = qry
    var resultSet
    getConnection().query(sql, function (err, result) {
        if (err) console.log(err)
	else return callback(result)
    })
}

dbutils.select = function(tableName, columnNames, whereClauses, callback) {
    var sql = "SELECT "
    for (var i = 0; i < columnNames.length; i++){
        sql+= columnNames[i] + ", "
    }

    sql = sql.slice(0,-1)
    sql = sql.slice(0,-1)
    sql += " FROM " + tableName + " "
    if (whereClauses != undefined && whereClauses.length >= 1){
    	sql += "WHERE "
	sql += whereClauses[0]
	for(var i = 1; i < whereClauses.length; i++){
	    sql += " AND " + whereClauses[i] 
	}
    }

    console.log("SQL " + sql)
    getConnection().query(sql, function (err, result) {
        if (err) console.log(err)
	else return callback(result)
    })    
}

module.exports = dbutils
