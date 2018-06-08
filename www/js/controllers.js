angular.module('starter.controllers', [])

  .controller('LockCtrl', function ($scope, ApiService, $ionicLoading) {
    // Loading
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-light"></ion-spinner><br>Loading...',
        duration: 10000
      });
    };
    $scope.locked = true;

    $scope.lockAPI = function () {
      ApiService.lock(null, function (res) {
        console.log(res);
        $scope.title = 'unlock';
      }, function (err) {
        console.log(err);
      });
    };

    $scope.unlockAPI = function () {
      ApiService.unlock(null, function (res) {
        console.log(res);
        $scope.title = 'lock';
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getStatus = function () {
      $scope.showLoading();
      ApiService.getLockStatus(null, function (res) {
        console.log(res);
        $ionicLoading.hide();
      }, function (err) {
        console.log(err);
        $ionicLoading.hide();
      });
    };

    $scope.title = 'unlock';
    $scope.toggleLock = function () {
      $scope.locked = !$scope.locked;
      console.log($scope.locked);
      if ($scope.locked) {
        $scope.lockAPI();
      } else {
        $scope.unlockAPI();
      }
    };
  })

  .controller('LockSettingCtrl', function ($scope, ApiService, $ionicLoading) {
    // Loading
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-light"></ion-spinner><br>Loading...',
        duration: 10000
      });
    };
    // $scope.showLoading();

    $scope.serverIP = '';
    $scope.setupServer = function () {
      localStorage.setItem('serverIP', $scope.serverIP);
    };

    $scope.bridgeIP = '';
    $scope.setupBridge = function () {
      localStorage.setItem('bridgeIP', $scope.bridgeIP);
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
    $scope.users = [{
      name: "Tushar",
      enabled: true
    }, {
      name: "Chintan",
      enabled: false
    }];

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

    $scope.uploadImage = function (data) {
      ApiService.FileTransfer(data, function (res) {
        // Success
      }, function (err) {
        // Error
      }, function (progress) {
        // constant progress updates
      });
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
    // $scope.showLoading();

    $scope.bluetoothUsers = [{
      name: "Tushar",
      mac: "E1:F6:FA:88:C3:36"
    }];
  });
