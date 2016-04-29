var myApp = angular.module('myApp', ['backand']);

myApp.config(function (BackandProvider) {
    BackandProvider.setAppName('backandtodoapp');
    BackandProvider.setSignUpToken('76a0ed19-c9d4-405a-9e20-493d637b131c');
    BackandProvider.setAnonymousToken('6adbc622-36b5-496c-b288-19ea28816f10');
})

myApp.controller('DemoCtrl', ['$scope', '$http', 'Backand', DemoCtrl]);

function DemoCtrl($scope, $http, Backand) {
  
  //clear the current user logged in
  $scope.currentUser = null;
  //get the list of social providers
  $scope.socialProviders = Backand.getSocialProviders();
  
  //Use Backand SDK to get the user name, email and more
  $scope.getUserDetails = function() {
    var user = Backand.getUserDetails();
    if(user.$$state.value !== null){
      $scope.currentUser = user.$$state.value.username;
    }
    else {
      $scope.currentUser = null;
    }
  }
  
  //Simple method that calls signin or signup based on the newUser checkbox
  $scope.authenticate = function(form){
    if(form.newUser){
      $scope.signup(form);
    }
    else {
      $scope.signin(form);
    }
  }
  
  //Sign in to Backand
  $scope.signin = function (form) {
    return Backand.signin(form.username, form.password)
      .then(function (response) {
        $scope.getUserDetails();
        return response;
    });
  };
  
  //Sign up to Backand
  $scope.signup = function (form) {
    return Backand.signup(form.firstName, form.lastName, 
                   form.username, form.password, 
                   form.password,
                   {company: form.company})
      .then(function (response) {
        $scope.getUserDetails();
        return response;
    });
  };
  
  //Make a social signin or signup - Backand SDK take care of the signup in case the user
  //isn't signed up
  $scope.socialSignin = function (provider) {
        alert('Due to permission settings in codepen - you need to close the social dialog manully. In your app it will be closed automatictlly');
    return Backand.socialSignin(provider)
      .then(function (response) {
        $scope.getUserDetails();
        return response;
    });
  };
  
  //Sign out from Backand
  $scope.signout = function () {
    return Backand.signout()
      .then(function (response) {
        $scope.getUserDetails();
        return response;
    });
  };
}