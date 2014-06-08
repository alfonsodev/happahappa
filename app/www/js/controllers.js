angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $location) {
  console.log('this is the login controller .. ');
    $scope.title = 'Happa Happa';

    $scope.loginAction = function() {
      $location.path('/');
    }

})

.controller('DashboardCtrl', function($scope) {
  console.log('this is the Dashboard controller .. ');
})
.controller('DashCtrl', function($scope) {
    console.log('FriendsDetail controller');
})

.controller('FriendsCtrl', function($scope, Friends, $ionicModal) {

})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    console.log('FriendsDetail controller');
    $scope.friend = Friends.get($stateParams.friendId);
})
.controller('AccountCtrl', function($scope) {
    console.log('Account controller');
})

.controller('EventConfirm', function($scope, $state) {
  $scope.back = function() { $state.go('dashboard'); };
  console.log('Confirm controller');
})
.controller('EventRestaurants', function($scope, $state) {
  $scope.back = function() { $state.go('dashboard'); };
  console.log('Account controller');
})
.controller('EventFriends', function($scope, $state, $ionicModal) {
  $scope.back = function() { $state.go('dashboard'); };
  console.log('event friends tabs');
  $scope.friends = [
      { avatar: 'patrick.jpg', name: 'Patrick', line: 'Software Engineer and Web Developer'},
      { avatar: 'manuela.jpg', name: 'Manuela', line: 'science bitch'},
      { avatar: 'marcin.jpg', name: 'Marcin', line: 'science bitch'},
      { avatar: 'szymon.jpg', name: 'Szymon', line: 'Coding'},
      { avatar: 'hendrick.jpg', name: 'Hendrick', line: 'Meeting'},
      { avatar: 'daniel.jpg', name: 'Daniel Javier Martin', line: 'Mergin expert'},
      { avatar: 'marcin.jpg', name: 'Marcin Marcinkowski', line: 'Polifacetic'},
      { avatar: 'mustafa.jpg', name: 'Mustafa', line: 'Zencap developer'},
      { avatar: 'hendrick.jpg', name: 'Hendrick', line: 'in a meetig'},
      { avatar: 'jonatan.jpg', name: 'Jonatan', line: 'science bitch'},
      { avatar: 'barret.jpg', name: 'Barret', line: 'science bitch'},
      { avatar: 'tspengler.jpg', name: 'Tspengler', line: 'science bitch'},
      { avatar: 'marin.jpg', name: 'Marin', line: 'science bitch'},
      { avatar: 'winston.jpg', name: 'Winston', line: 'science bitch'},
      { avatar: 'tully.jpg', name: 'Tully', line: 'science bitch'}
    ];

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openmodal = function() {
      console.log('open modal .. ');
      $scope.modal.show();
    };
    $scope.closemodal = function() {
      $scope.modal.hide();
    };
    //cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
});
