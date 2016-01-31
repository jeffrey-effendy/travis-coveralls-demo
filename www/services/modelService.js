(function() {
  angular.module('todoApp.services')
    .factory('modelService', function($http) {
      return {
        
        addOneTask: function(tasks, tdesc) {
          return $http({
            method: 'POST',
            url: '/api/todos',
            data: {description: tdesc}
          }).then(function(res) {
            tasks.push(res.data.response[0]);
            return tasks;
          });
        },
        
        deleteOneTask: function(tasks, id) {
          return $http({
            method: 'DELETE',
            url: '/api/todos/del/' + id
          }).then(function(res) {            
            for(var i = 0; i < tasks.length; i++) {
              if(id === tasks[i].id) {
                tasks.splice(i,1);
              }
            }
            return tasks;
          });
        }
                
      };
    });
})();