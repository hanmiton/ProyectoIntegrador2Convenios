(function () {

  angular.module('convedex.directives', [])

    .directive('convenioName', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/convenio-name.html'
        };
      })

    .directive('convenioImage', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/convenio-image.html'
        };
      })

    .directive('convenioData', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/convenio-data.html'
        };
      })

     .directive('convenioStats', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/convenio-stats.html'
        };
      })

     .directive('convenioEvolution', function () {
        return {
          retrict: 'E',
          templateUrl: 'partials/convenio-evolution.html'
        };
      })

    .directive('convenioType', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/convenio-type.html'
      };
    })

    .directive('convenioCard', function () {
      return {
        retrict: 'E',
        templateUrl: 'partials/convenio-card.html'
      }
    })

     .directive('convenioSolicitudes', ['convenioService', function (convenioService) {
      return {
        restrict: 'E',
        templateUrl: 'partials/convenio-solicitudes.html',
        scope: {
          name: '@name'
        },
        link: function (scope, element, attributes) {
          attributes.$observe('name', function (value) {
            if (value) {
              scope.name = value;
              scope.solicitudes = convenioService.getSolicitudes(value);
            }
          });
        },
        controller: function ($scope) {
          $scope.solicitudes = convenioService.getSolicitudes($scope.name);
          $scope.solicitud = {};
          $scope.show = false;

          $scope.toggle = function () {
            $scope.show = !$scope.show;
          };

          $scope.anonymousChanged = function () {
            if ($scope.solicitud.anonymous) {
              $scope.solicitud.email = "";
            }
          };

          $scope.addSolicitud = function () {
            $scope.solicitud.date = Date.now();
            convenioService.saveSolicitud($scope.name, $scope.solicitud);
            $scope.solicitudes = convenioService.getSolicitudes($scope.name);
            $scope.solicitud = {};
          };

        }
      };
    }]);

})();
