process.env.NODE_ENV = "test";

var Todo = require('../../server/daos/todoDao');
var Properties = require('../../properties');
var Connection = require('../../server/connection');

var expect = require('chai').expect;
var table = Properties.datasource.testtable;
var initDesc = "testing description";

describe('todoDao', function() {
  
  beforeEach(function() {
    Connection.query("CREATE TABLE " + table + "(id INT UNSIGNED NOT NULL AUTO_INCREMENT,description TEXT NOT NULL,`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,completed BIT DEFAULT b'0',PRIMARY KEY (id));");
    Connection.query("INSERT INTO " + table + "(description) VALUES (\"" + initDesc + "\") ;");
    console.log("test database is created");
  });
  
  afterEach(function() {
    Connection.query("DROP TABLE " + table);
    console.log("test database is removed");
  });
  
  it('should start with one data with the right description', function() {
    Todo.fetchAll(function(rows, fields) {
      expect(rows.length).to.equal(1);
      expect(rows[0].description).to.equal(initDesc);
    });
  });
  
});