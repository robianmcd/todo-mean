/// <reference path="../typings/tsd.d.ts"/>

var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var port = process.env.PORT || 8080; // set the port for our app

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds041831.mongolab.com:41831/todo-mean');

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Statically serve up the files in the client folder
app.use(express.static(__dirname + '/../client'));

var todoSchema = mongoose.Schema({
    text: String, 
	done: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);

// //Initialize Database
// var todo = new Todo({text: 'learn express', done: false });
// todo.save();
// var todo2 = new Todo({text: 'do a barrel roll', done: false });
// todo2.save();
// var todo3 = new Todo({text: 'drink a beer', done: true });
// todo3.save();

//Get Todos Route
app.get('/api/todos', function (req, res) {
	Todo.find(function (err, todos) {
	  if (err) return res.status(500).send(err);
	  res.send(todos);
	})
});

//Create Todo Route
app.post('/api/todos', function (req, res) {
	var newTodo = new Todo(req.body);
	newTodo.save(function(err, todo) {
		if (err) return res.status(500).send(err);
		res.send(todo);
	});

});

//Delete Todo Route
app.delete('/api/todos/:id', function(req, res) {
	Todo.remove({_id: req.params.id}, function(err) {
		if (err) return res.status(500).send(err);
		res.status(204).send();
	});
});

//Update Todo Route
app.put('/api/todos/:id', function(req, res) {
	Todo.findOne({_id: req.params.id}).exec()
		.then(function(todo) {
			var newTodo = req.body;
			todo.text = newTodo.text;
			todo.done = newTodo.done;
			return todo.save();
		})
		.then(function(todo) {
			res.send(todo);
		})
		//Error handler
		.then(null, function(err) {
			res.status(500).send(err)
		});
});


//Start Server
app.listen(port);
console.log('Listening on port ' + port);

// //Express starter
// var express = require('express');
// var app = express();
// app.use(express.static('../client'));
// app.listen(8080);