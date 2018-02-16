myapp.controller("loginController", function ($scope, authService,$location, $rootScope) {
	$scope.onLoginIn = function () {
		let user = {
			username: $scope.login_username,
			password: $scope.login_pwd
		};
		let result = authService.authUser(user);
		if (result.message == "success") {
			let token = "token_" + user.username + "_" + user.password;
			localStorage.setItem("token_session", token);
			let login_user = {};
			login_user = authService.findUser(user);
			localStorage.setItem("active_user", JSON.stringify(login_user));
			$location.path('/');
			$rootScope.authVal = true;
		}
	}
});