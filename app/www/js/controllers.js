
var makeid = function()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var appData;
angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $location) {
    console.log('this is the login controller .. ');
    $scope.title = 'Happa Happa';
    $scope.linkAuth = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77znf4cik69ira&scope=r_basicprofile%20r_emailaddress%20r_network&state=" + makeid() +"&redirect_uri=http://localhost:3000/api/auth/linkedin/callback"
})

.controller('DashboardCtrl', function($scope, $http, DataStore) {
  $http.get('http://localhost:3000/api/linked/connections')
  .success(function(data, status, headers, config) {
    var i = data.connections.person.length;
    var friend;
    var avatar;
    appData = DataStore.getData();

    while(i--) {
      avatar = (data.connections.person[i]['picture-url']) ? data.connections.person[i]['picture-url'][0] : '';
      friend = {
        name: data.connections.person[i]['first-name'] + ' ' + data.connections.person[i]['last-name'],
        avatar: avatar,
        line: data.connections.person[i].headline
      }
      appData.friends.push(friend);
    }
    $scope.friends = appData.friends;
    DataStore.setData(appData);
    console.log('friends completed ');
  })
  console.log('this is the Dashboard controller .. ');

})

.controller('DashCtrl', function($scope) {
    console.log('FriendsDetail controller');
})

.controller('EventConfirm', function($scope, $state) {
  $scope.back = function() { $state.go('dashboard'); };
  console.log('Confirm controller');
})
.controller('EventRestaurants', function($scope, $state, DataStore) {
  appData = DataStore.getData();
  $scope.restaurants = appData.restaurants;
  $scope.back = function() { $state.go('dashboard'); };
  console.log('Account controller');
})
.controller('EventFriends', function($scope, $state, $ionicModal, DataStore) {
  $scope.back = function() { $state.go('dashboard'); };
  appData = DataStore.getData();
  $scope.friends = appData.friends;
  $scope.diners = appData.events[0].diners;
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

    $scope.addFriend = function(friend) {
      $scope.diners.push(friend);
      appData.events[0].diners = $scope.diners;
      DataStore.setData(appData);
      console.log('add friend!');
    };
});
