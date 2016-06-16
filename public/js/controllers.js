(function (_) {

  angular.module('ingedex.controllers', [])
    .controller('IngedexController', ['$rootScope', '$scope', '$routeParams', 'ingenieroService', function ($rootScope, $scope, $routeParams, ingenieroService) {
      var type = $routeParams.type;
       var ingenieros = [];

      $rootScope.title = "";

      if (type) {
        $scope.type = type;

        ingenieroService.byType(type).then(function (data) {
          $scope.ingenieros = ingenieros =data;
          $scope.groupped = partition(data, 4);
        });
      } else {
        ingenieroService.all().then(function (data) {
          $scope.ingenieros = ingenieros =data;
          $scope.groupped = partition(data, 4);
        });
      }

      $scope.search = function () {
        var result = ingenieros;
        if ($scope.searchTerm) {
          result = ingenieros.filter(function (ingeniero) {
            var name = ingeniero && ingeniero.name || "";

            return name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1;
          });
        }

        $scope.ingenieros = result;
        $scope.groupped = partition(result, 4);
      };

      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])

    .controller('IngenieroController', ['$rootScope', '$scope', '$routeParams', 'ingenieroService', function ($rootScope, $scope, $routeParams, ingenieroService) {
      var name = $routeParams.name;
      //$scope.ingeniero = {};

      ingenieroService.byName(name)
      .then(function (data) {
         $rootScope.title = data.name;
        $scope.ingeniero = data;
      });
    }])

    .controller('TabsController', ['$scope', function ($scope) {
      $scope.tab = 1;

      $scope.selectTab = function (tab) {
        $scope.tab = tab;
      };

      $scope.isActive = function (tab) {
        return tab === $scope.tab;
      };
    }]);

})(_);
