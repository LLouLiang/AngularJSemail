myapp.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('!');
	$routeProvider.when("/", {
		templateUrl: '../Clients/login.html',
		controller: 'loginController'
	})
	.when("/home", {
		templateUrl: '../Clients/home.html',
		controller: 'homeController'
	})
    .when("/signup",{
        templateUrl:'../Clients/signup.html',
        controller:'signupController'
    })
    .when("/message",{
        templateUrl:'../Clients/message/message.html',
        controller:'messageController'
    })
    .when("/profile",{
        templateUrl:'../Clients/profile.html',
        controller:'profileController'
    });
});

myapp.controller("rootCtrl", function ($scope, $location, $rootScope) {
	if ($rootScope.authVal == undefined) {
		$rootScope.authVal = false;
		$location.path('/');
	} 
	if (localStorage.getItem("token_session")) {
		$rootScope.authVal = true;
	}
	// user token
	let current_user_token = localStorage.getItem("token_session");

	$scope.onSignOut = function () {
		// remove all user sessions
		localStorage.removeItem("token_session");
		localStorage.removeItem("active_user");
		$location.path('/');
		$rootScope.authVal = false;
	}
});