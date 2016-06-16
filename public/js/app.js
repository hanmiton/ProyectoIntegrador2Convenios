(function () {

  var app = angular.module('convedex', [
    'ngRoute',
    'angular-md5',
    'convedex.controllers',
    'convedex.directives',
    'convedex.filters',
    'convedex.services'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/convedex.html',
        controller: 'ConvedexController'
      })
       .when('/:type', {
        templateUrl: 'views/convedex.html',
        controller: 'ConvedexController'
      })
      .when('/convenio/:name', {
        templateUrl: 'views/convenio.html',
        controller: 'ConvenioController',
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();