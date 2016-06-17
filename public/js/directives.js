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

})();
