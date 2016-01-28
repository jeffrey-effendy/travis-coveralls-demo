var TodoDao = require('../daos/todoDao');

var ok = function(res) {
  return {status: "ok", response: res};
}

var fail = function(err) {
  return {status: "fail", error: err};  
}

module.exports = function(app) {
  app.get('/api/todos', function(req, res) {
    TodoDao.fetchAll(function(rows, fields) {
      res.json(ok(rows));
    }, function(err) {
      res.json(fail(err));
    });
  });
  
  app.post('/api/todos', function(req, res) {
    TodoDao.insert(req.body.description, function(rows, fields) {
      TodoDao.fetchOne(rows.insertId, function(rows, fields) {
        return res.json(ok(rows));
      }, function(err) {
        res.json(fail(err));
      });
    }, function(err) {
      res.json(fail(err));
    });
  });
  
  app.delete('/api/todos/del/:id', function(req, res) {
    TodoDao.deleteOne(req.params.id, function(rows, fields) {
      res.json(ok(rows));
    }, function(err) {      
      res.json(fail(err));
    })
  });
};