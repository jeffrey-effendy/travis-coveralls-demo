(function() {
  angular.module('todoApp', ['ngRoute', 'todoApp.controllers'])
    .config(function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: '/www/partials/todoPartial.html',
        controller: 'todoController',
        controllerAs: 'viewmodel'
      });
    });
})();