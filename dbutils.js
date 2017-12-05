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

dbutils.formatStringVars = function(objectArr){
    for (var i = 0; i < objectArr.length; i++){
    	if (typeof objectArr[i] === 'string'){
	    objectArr[i] = formatStringVar(objectArr[i])
	}
    }
}

dbutils.formatStringVar = function(string){
    return '\'' + string + '\''
}

dbutils.doesExist = function(tableName, columnName, keyVal){
    var whereClause = [columnName + " = " + keyVal]
    dbutils.select(tableName, ['*'], whereClause, function(result) {
        if (result.length > 0){
	    console.log("Row does not exist in table " + tableName)
	    return true;
	}
	return false;
    })
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

dbutils.select = function(tableNames, columnNames, whereClauses, callback) {
    var sql = "SELECT "
    for (var i = 0; i < columnNames.length; i++){
        sql+= columnNames[i] + ", "
    }

    sql = sql.slice(0,-2)
    sql += " FROM " 
    for (var i = 0; i < tableNames.length; i++){
       sql += tableNames[i] 	
    }

    if (whereClauses != undefined && whereClauses.length >= 1){
    	sql += " WHERE "
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

//Column names is an array of column names
//newVals is an array of values to set to the corresponding column name
//whereClause is a single string that is WHERE primary_key = some_id
//callback is your callback function
//String vars must be wrapped in single quotes.
dbutils.update = function(tableName, columnNames, newVals, whereClause){
    if (columnNames.length != newVals.length){
	    console.log("ERROR: COLUMN NAMES NOT EQUAL TO NEW VAL LENGTH")
	    return;
    }

    var sql = "UPDATE " + tableName + " SET "
    for (var i = 0; i < columnNames.length; i++){
       sql += columnNames[i] + " = " + newVals[i] + ' ' 	
    }
    sql = sql.slice(0, -1)
    sql += " WHERE " + whereClause
    console.log("SQL Query: " + sql)
    getConnection().query(sql, function(err, result) {
        if (err) console.log(err)
    }) 
}

module.exports = dbutils
