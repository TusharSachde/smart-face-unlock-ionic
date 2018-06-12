var serverURL = localStorage.getItem('serverIP');
var apiURL = serverURL ? serverURL : '';
apiURL = apiURL + '/api/';
angular.module('starter.services', [])
  .factory('ApiService', function ($http, $cordovaFileTransfer) {
    return {
      unlock: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + 'Nukilock/unlockNukilock',
          data: data
        }).then(success).catch(err);
      },
      lock: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + 'Nukilock/lockNukilock',
          data: data
        }).then(success).catch(err);
      },
      getLockStatus: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + 'Nukilock/getNukilockState',
          data: data
        }).then(success).catch(err);
      },
      FileTransfer: function (imageUrl, success, err, progress) {
        console.log(imageUrl, apiURL + 'Upload/index');
        $cordovaFileTransfer.upload(apiURL + 'Upload/index', imageUrl)
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
      },
      addUser: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + 'Face/train',
          data: data
        }).then(success).catch(err);
      },
      updateUser: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + 'Face/update',
          data: data
        }).then(success).catch(err);
      },
      getUsers: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + 'Face/getUsers',
          data: data
        }).then(success).catch(err);
      },
      updateBluetoothUser: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + 'Bluetooth/update',
          data: data
        }).then(success).catch(err);
      },
      addBluetoothUser: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + 'Bluetooth/save',
          data: data
        }).then(success).catch(err);
      },
      getBluetoothUsers: function (data, success, err) {
        $http({
          method: 'POST',
          url: apiURL + 'Bluetooth/getUsers',
          data: data
        }).then(success).catch(err);
      },

    };
  });
