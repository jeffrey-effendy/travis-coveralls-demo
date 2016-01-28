var Express = require('express');
var Route = require('./server/route');
var TodoApi = require('./server/apis/todoApi');
var Properties = require('./properties');
var Path = require('path');
var BodyParser = require('body-parser');

var app = Express();
var port = Properties.web.port;

//set static files
var root = Path.join(__dirname, '/www');
app.use('/www', Express.static(root));
app.use('/bower_components', Express.static(__dirname + '/bower_components'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

Route(app);
TodoApi(app);

app.listen(port);
console.log("Listening to " + port);