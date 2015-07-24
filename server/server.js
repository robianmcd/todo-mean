/// <reference path="../typings/tsd.d.ts"/>

var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var port = process.env.PORT || 8080; // set the port for our app

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../client'));

var nextId = 3;

var todos = [
	{id: '0', text: 'learn express', done: false },
	{id: '1', text: 'do a barrel roll', done: false },
	{id: '2', text: 'drink a beer', done: true }
];

//Get Todos Route
app.get('/api/todos', function (req, res) {
	res.send(todos);
});

//Create Todo Route
app.post('/api/todos', function (req, res) {
	var todo = req.body;
	todo.id = nextId.toString();
	nextId++;
	todos.push(req.body);
	res.send(todos);
});

//Delete Todo Route
app.delete('/api/todos/:id', function(req, res) {
	todos = todos.filter(function(todo) {
		return todo.id !== req.params.id;
	});
	
	res.send(todos);
});


//Start Server
app.listen(port);
console.log('Listening on port ' + port);

// //Express starter
// var express = require('express');
// var app = express();
// app.use(express.static('../client'));
// app.listen(8080);