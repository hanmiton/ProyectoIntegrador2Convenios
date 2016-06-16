(function (_) {

  angular.module('convedex.controllers', [])
    .controller('ConvedexController', ['$rootScope', '$scope', '$routeParams', 'convenioService', function ($rootScope, $scope, $routeParams, convenioService) {
      var type = $routeParams.type;
       var convenios = [];

      $rootScope.title = "";

      if (type) {
        $scope.type = type;

        convenioService.byType(type).then(function (data) {
          $scope.convenios = convenios =data;
          $scope.groupped = partition(data, 4);
        });
      } else {
        convenioService.all().then(function (data) {
          $scope.convenios = convenios =data;
          $scope.groupped = partition(data, 4);
        });
      }

      $scope.search = function () {
        var result = convenios;
        if ($scope.searchTerm) {
          result = convenios.filter(function (convenio) {
            var name = convenio && convenio.name || "";

            return name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1;
          });
        }

        $scope.convenios = result;
        $scope.groupped = partition(result, 4);
      };

      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])

    .controller('ConvenioController', ['$rootScope', '$scope', '$routeParams', 'convenioService', function ($rootScope, $scope, $routeParams, convenioService) {
      var name = $routeParams.name;
      //$scope.convenio = {};

      convenioService.byName(name)
      .then(function (data) {
         $rootScope.title = data.name;
        $scope.convenio = data;
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
