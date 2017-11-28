var mysql = require('mysql')

var connection;

function getConnection(){
    if (connection == null){
    	connection = mysql.createConnection({
	     host: '127.0.0.1',
	     user: 'root',
	     password: '',
	     database: 'cse305'
        });
    }

    return connection;
}

this.insertRow = function (tableName, row){
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
