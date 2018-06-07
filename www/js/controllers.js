angular.module('starter.controllers', [])

  .controller('LockCtrl', function ($scope, ApiService, $ionicLoading) {
    // Loading
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-light"></ion-spinner><br>Loading...',
        duration: 10000
      });
    };
    // $scope.showLoading();
    $scope.locked = true;
    $scope.title = 'lock';
    $scope.toggleLock = function () {
      $scope.locked = !$scope.locked;
      console.log($scope.locked);
      if ($scope.locked) {
        $scope.title = 'lock';
      } else {
        $scope.title = 'unlock';
      }
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
          destinationType: Camera.DestinationType.DATA_URL,
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
          },
          function (err) {
            console.log(err);
          },
          cameraOptions
        );
      }

    };

    // Show the action sheet
    $scope.showOptions = function () {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
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
