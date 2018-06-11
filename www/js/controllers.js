angular.module('starter.controllers', ['ngCordova.plugins.fileTransfer'])

  .controller('LockCtrl', function ($scope, ApiService, $ionicLoading) {
    // Loading
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-light"></ion-spinner><br>Loading...',
        duration: 10000
      });
    };

    $scope.getStatus = function () {
      $scope.showLoading();
      ApiService.getLockStatus({}, function (res) {
        console.log(res);
        $ionicLoading.hide();
        if (res.data.data.data.stateName === "locked") {
          $scope.title = 'unlock';
          $scope.locked = true;
        } else if (res.data.data.data.stateName === "unlocked") {
          $scope.title = 'lock';
          $scope.locked = false;
        }
      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
    };

    $scope.getStatus();

    $scope.lockAPI = function () {
      ApiService.lock(null, function (res) {
        console.log(res);
        $ionicLoading.hide();
        $scope.title = 'unlock';
        $scope.locked = true;
      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
    };

    $scope.unlockAPI = function () {
      ApiService.unlock(null, function (res) {
        console.log(res);
        $ionicLoading.hide();
        $scope.title = 'lock';
        $scope.locked = false;
      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
    };

    $scope.toggleLock = function () {
      $scope.showLoading();
      if (!$scope.locked) {
        $scope.lockAPI();
      } else {
        $scope.unlockAPI();
      }
    };
  })

  .controller('LockSettingCtrl', function ($scope, $ionicLoading) {
    // Loading
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-light"></ion-spinner><br>Loading...',
        duration: 10000
      });
    };
    // $scope.showLoading();

    var serverIP = localStorage.getItem('serverIP');
    $scope.serverIP = serverIP ? serverIP : '';
    $scope.setupServer = function (data) {
      if (data) localStorage.setItem('serverIP', data);
    };

    var bridgeIP = localStorage.getItem('bridgeIP');
    $scope.bridgeIP = bridgeIP ? bridgeIP : '';
    $scope.setupBridge = function (data) {
      if (data) localStorage.setItem('bridgeIP', data);
    };

  })

  .controller('UsersCtrl', function ($scope, ApiService, $ionicLoading) {
    // Loading
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-light"></ion-spinner><br>Loading...',
        duration: 10000
      });
    };
    // $scope.showLoading();
    $scope.users = [];

    $scope.getUsers = function () {
      ApiService.getUsers({}, function (res) {
        console.log(res.data.data);
        $scope.users = res.data.data;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getUsers();

    $scope.updateUsers = function (data) {
      console.log(data);
    };
  })

  .controller('AddUserCtrl', function ($scope, $stateParams, ApiService, $ionicActionSheet, $ionicLoading) {
    // Loading
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-light"></ion-spinner><br>Loading...',
        duration: 10000
      });
    };
    // $scope.showLoading();

    $scope.runCamera = function (sourceType) {
      var cameraOptions = {};

      if (Camera) {
        cameraOptions = {
          quality: 70,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: sourceType, // Camera.PictureSourceType.CAMERA or PHOTOLIBRARY
          encodingType: Camera.EncodingType.JPEG,
          targetItemWidth: 900,
          correctOrientation: true
        };
      }

      if (navigator) {
        navigator.camera.getPicture(
          function (imageData) {
            console.log(imageData);
            $scope.userImage = imageData;
            $scope.$apply();
          },
          function (err) {
            console.log(err);
          },
          cameraOptions
        );
      }

    };

    $scope.faceData = {};
    $scope.shareAccess = function (data) {

      if ($scope.userImage) {
        ApiService.FileTransfer($scope.userImage, function (res) {
          // Success
          var _id = JSON.parse(res.response);
          console.log(_id);
          ApiService.addUser({
            _id: _id,
            name: data.name
          }, function (res) {
            console.log(res);
          }, function (err) {
            console.log(err);
          });
        }, function (err) {
          // Error
          console.log(err);
        }, function (progress) {
          // constant progress updates
          // console.log(progress);
        });
      }

    };

    // Show the action sheet
    $scope.showOptions = function () {
      // Show the action sheet
      $ionicActionSheet.show({
        buttons: [{
            text: 'Open Camera'
          },
          {
            text: 'Photo Album'
          }
        ],
        titleText: 'Please choose your preference',
        cancelText: 'Cancel',
        buttonClicked: function (index) {
          if (index == 0) {
            if (Camera) {
              $scope.runCamera(Camera.PictureSourceType.CAMERA);
            }
          } else if (index == 1) {
            if (Camera) {
              $scope.runCamera(Camera.PictureSourceType.PHOTOLIBRARY);
            }
          }
          return true;
        }
      });

    };

  })

  .controller('BluetoothCtrl', function ($scope, ApiService, $ionicLoading) {
    // Loading
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-light"></ion-spinner><br>Loading...',
        duration: 10000
      });
    };

    $scope.bluetoothUsers = [];

    $scope.getUsers = function () {
      ApiService.getBluetoothUsers({}, function (res) {
        console.log(res.data.data);
        $scope.bluetoothUsers = res.data.data;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getUsers();

    $scope.btForm = {};
    $scope.addMore = function (data) {
      $scope.showLoading();
      ApiService.addBluetoothUser(data, function (res) {
        console.log(res);
        $ionicLoading.hide();
        $scope.getUsers();
        $scope.btForm = {};
      }, function (err) {
        console.log(err);
        $ionicLoading.hide();
      });
    };

  });
