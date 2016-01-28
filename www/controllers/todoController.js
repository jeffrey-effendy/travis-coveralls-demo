(function() {
  angular.module('todoApp.controllers')
    .controller('todoController', function(modelService, $http) {
      var viewmodel = this;      
      viewmodel.tasks = [];
      viewmodel.newTaskDescription = "";
      viewmodel.addTask = function() {
        modelService.addOneTask(viewmodel.tasks, viewmodel.newTaskDescription);
        viewmodel.newTaskDescription  = "";
      };
      viewmodel.deleteTask = function(id) {
        modelService.deleteOneTask(viewmodel.tasks, id);
      }
      $http({
        method: 'GET',
        url: '/api/todos'
      }).then(function(res) {
        viewmodel.tasks = res.data.response;
      });
    });
})();