var Connection = require('../connection');
var Properties = require('../../properties');

var env = process.env.NODE_ENV;
var table = env === 'test' ? Properties.datasource.testtable : Properties.datasource.table; 

module.exports.fetchOne = function(id, cb, errcb) {
  var statement = "SELECT * FROM " + table + " WHERE id=" + id + " limit 1;";
  return Connection.query(statement, function(rows, fields) {
    cb(rows, fields);
  }, function(err) {
    errcb(err);
  });  
}

module.exports.fetchAll = function(cb, errcb) {
  var statement = "SELECT * FROM " + table + ";";
  return Connection.query(statement, function(rows, fields) {
    cb(rows, fields);
  }, function(err) {
    errcb(err);
  });  
}

module.exports.insert = function(description, cb, errcb) {
  var statement = "INSERT INTO " + table + "(description) VALUES (\"" + description + "\") ;";
  return Connection.query(statement, function(rows, fields) {
    cb(rows, fields);
  }, function(err) {
    errcb(err);
  });  
}

module.exports.deleteOne = function(id, cb, errcb) {
  var statement = "DELETE FROM " + table + " WHERE id=" + id + ";";
  return Connection.query(statement, function(rows, fields) {
    cb(rows, fields);
  }, function(err) {
    errcb(err);
  });  
}