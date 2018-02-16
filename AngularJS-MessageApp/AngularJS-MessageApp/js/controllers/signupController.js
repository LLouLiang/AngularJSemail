myapp.controller("signupController", function ($scope,$location) {
	$scope.onSignUp = function () {
		let registered_user = {
			username: $scope.signup_username,
			password: $scope.signup_pwd,
			firstname: $scope.signup_firstname,
			lastname: $scope.signup_lastname,
			email: $scope.signup_email,
			phone: $scope.signup_phone,
			location: $scope.signup_location,
		};
		let users = localStorage.getItem("all_users");
		if (!users) {
			let usersArray = [];
			usersArray.push(registered_user);
			localStorage.setItem("all_users", JSON.stringify(usersArray));
		} else {
			let usersarray = JSON.parse(users);
			usersarray.push(registered_user);
			localStorage.clear();
			localStorage.setItem("all_users", JSON.stringify(usersarray));
			console.log(JSON.parse(localStorage.getItem("all_users")));
		}
		$location.path('/');
	}
});