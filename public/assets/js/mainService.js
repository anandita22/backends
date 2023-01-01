app.service('mainService', [
  '$http',
  '$q',
  function ($http, $q) {
    return {
      postRequest(url, data) {
        const defer = $q.defer();
        $http.post(url, data).then(
          (res) => {
            defer.resolve(res.data);
          },
          (err) => {
            defer.reject(err);
          }
        );
        return defer.promise;
      },

      getRequest(url) {
        const defer = $q.defer();
        $http.get(url).then(
          (res) => {
            defer.resolve(res.data);
          },
          (err) => {
            defer.reject(err);
          }
        );
        return defer.promise;
      }
    };
  }
]);
