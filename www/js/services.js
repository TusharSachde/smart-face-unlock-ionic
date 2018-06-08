var serverURL = localStorage.getItem('serverIP');
var apiURL = serverURL ? serverURL : '';
angular.module('starter.services', [])
  .factory('ApiService', function ($http) {
    return {
      unlock: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + '',
          params: data
        }).then(success).catch(err);
      },
      lock: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + '',
          params: data
        }).then(success).catch(err);
      },
      getLockStatus: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + '',
          params: data
        }).then(success).catch(err);
      },
      updateUser: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + '',
          params: data
        }).then(success).catch(err);
      },
      getUsers: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + '',
          params: data
        }).then(success).catch(err);
      },
      addUser: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + '',
          params: data
        }).then(success).catch(err);
      },
      updateBluetoothUser: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + '',
          params: data
        }).then(success).catch(err);
      },
      addBluetoothUser: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + '',
          params: data
        }).then(success).catch(err);
      },
      getBluetoothUser: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + '',
          params: data
        }).then(success).catch(err);
      },
      FileTransfer: function (data, success, err, progress) {
        $cordovaFileTransfer.upload(apiURL + '', data.imageURL)
          .then(function (s) {
            // Success!
            success(s);
          }, function (e) {
            // Error
            err(e);
          }, function (p) {
            // constant progress updates
            progress(p);
          });
      }
    };
  });
