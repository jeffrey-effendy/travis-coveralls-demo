var Properties = require('../properties');
var Mysql = require('mysql');

var db = Mysql.createConnection({
  host: Properties.datasource.host,
  user: Properties.datasource.user,
  password: Properties.datasource.password,
  database: Properties.datasource.database
});

module.exports.query = function(statement, cb, errcb) {
  db.query(statement, function(err, rows, fields) {
    if(err) {
      errcb(err);
    } else {
      cb(rows, fields);
    }
  });
}