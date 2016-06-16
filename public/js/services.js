(function () {

  angular.module('convedex.services', [])

    .factory('convenioService', ['$http', '$q', '$filter', '$window', function ($http, $q, $filter, $window) {
      var normalize = $filter('normalize');
      var localStorage = $window.localStorage;

      function all() {
        var deferred = $q.defer();

        $http.get('/convenios.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }

       function byName(name) {
        name = normalize(name);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (convenio) {
            return normalize(convenio.name) === name;
          });

          if (results.length > 0) {
            deferred.resolve(results[0]);
          } else {
            deferred.reject();
          }

        });

        return deferred.promise;
      }

      function byType(type) {
        type = normalize(type);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (convenio) {
            return convenio.type.some(function (t) {
              return normalize(t) === type;
            });
          });

          deferred.resolve(results);
        });

        return deferred.promise;
      }

      function saveSolicitud(convenio, solicitud) {
        var solicitudes = getSolicitudes(convenio);

        solicitudes.push(solicitud);
        localStorage.setItem(convenio, JSON.stringify(solicitudes));
      }

      function getSolicitudes(convenio) {
        var solicitudes = localStorage.getItem(convenio);

        if (!solicitudes) {
          solicitudes = [];
        } else {
          solicitudes = JSON.parse(solicitudes);
        }

        return solicitudes;
      }


      return {
        all: all,
        byName: byName,
        byType: byType,
        saveSolicitud: saveSolicitud,
        getSolicitudes: getSolicitudes
      };

    }]);

})();
