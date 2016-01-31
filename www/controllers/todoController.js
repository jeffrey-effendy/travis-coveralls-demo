(function() {
  angular.module('todoApp.controllers')
    .controller('todoController', function(modelService, $http) {
      var viewmodel = this;      
      viewmodel.tasks = [];
      viewmodel.newTaskDescription = "";
      viewmodel.addTask = function() {
        modelService.addOneTask(viewmodel.tasks, viewmodel.newTaskDescription).then(function(tasks) {
          viewmodel.tasks = tasks;
        });
        viewmodel.newTaskDescription  = "";
      };
      viewmodel.deleteTask = function(id) {
        viewmodel.tasks = modelService.deleteOneTask(viewmodel.tasks, id).then(function(tasks) {
          viewmodel.tasks = tasks;
        });
      }
      $http({
        method: 'GET',
        url: '/api/todos'
      }).then(function(res) {
        viewmodel.tasks = res.data.response;
      });
    });
})();