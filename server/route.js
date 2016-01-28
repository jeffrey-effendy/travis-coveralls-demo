module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('/web/todo');
  });
  
  app.get('/web/todo', function(req, res) {
    res.sendFile('app.html', {root: 'www'});
  });
};