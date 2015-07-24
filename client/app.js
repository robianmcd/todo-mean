/// <reference path="../typings/tsd.d.ts"/>

var app = angular.module('todoApp', []);

function TodoCtrl($http) {
  var ctrl = this;
  ctrl.$http = $http;
  
  ctrl.todos = [];
  
  $http.get('/api/todos').then(function(response) {
    ctrl.todos = response.data;
  });
  
  ctrl.filters = [
    {label: 'All', showTodo: function(todo) {return true;}},
    {label: 'Active', showTodo: function(todo) {return !todo.done;}},
    {label: 'Complete', showTodo: function(todo) {return todo.done;}}
  ]
  ctrl.selectedFilter = ctrl.filters[0];
}

app.controller('TodoCtrl', TodoCtrl);

TodoCtrl.prototype.addTodo = function() {
  var ctrl = this;
  
  var newTodo = {text: ctrl.newTodoText, done: false};
  
  ctrl.$http.post('/api/todos', newTodo).then(function(response) {
    ctrl.todos = response.data;
    ctrl.newTodoText = '';
  });
  
}

TodoCtrl.prototype.clearComplete = function() {
  var ctrl = this;
  ctrl.todos.forEach(function(todo) {
    if (todo.done) {
      ctrl.$http.delete('/api/todos/' + todo.id).then(function(response) {
        ctrl.todos = response.data;
      });
    }
  });
}

TodoCtrl.prototype.clearCompleteEnabled = function() {
  var completeTodos = this.todos.filter(function(todo) {return todo.done});
  return completeTodos.length > 0;
}