myapp.directive("updateForm", function (authService) {
	return {
		template:`<form ng-submit="onUpdate()">
			<fieldset>
				<div class="form-group">
					<label class="col-form-label" for="inputusername">UserName</label>
					<input type="text" class="form-control" placeholder="user name" ng-model="username" id="username_input">
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" class="form-control" id="password" ng-model="password" placeholder="Password">
				</div>
				<div class="form-group">
					<label class="col-form-label" for="Firstname">Firstname</label>
					<input type="text" class="form-control" placeholder="Firstname" ng-model="firstname" id="firstname_input">
				</div>
				<div class="form-group">
					<label class="col-form-label" for="Lastname">Lastname</label>
					<input type="text" class="form-control" placeholder="Lastname" ng-model="lastname" id="lastname_input">
				</div>
				<div class="form-group">
					<label class="col-form-label" for="Email">Email</label>
					<input type="email" class="form-control" placeholder="Email" ng-model="email" id="email_input">
				</div>
				<div class="form-group">
					<label class="col-form-label" for="Phone">Phone</label>
					<input type="text" class="form-control" placeholder="Phone" ng-model="phone" id="phone_input">
				</div>
				<div class="form-group">
					<label class="col-form-label" for="Location">Location</label>
					<input type="text" class="form-control" placeholder="Location" ng-model="location" id="location_input">
				</div>
				<button type="button" ng-click="onCancel()" class="btn btn-secondary">Opt-out</button><button type="submit" class="btn btn-warning">Update</button>
			</fieldset>
		</form>`,
		restrict: 'ACE',
		scope: {
			username: '=',
			password:'=',
			firstname: '=',
			lastname: '=',
			email: '=',
			phone: '=',
			location: '=',
			isactive: '='
		},
		link: function ($scope, attr, elem) {
			$scope.onUpdate = function () {
				// change the user details update to the localstorage
			  // update active user
				let newuser = {
					username : $scope.username,
					password : $scope.password,
					firstname : $scope.firstname,
					lastname : $scope.lastname,
					phone : $scope.phone,
					email : $scope.email,
					location : $scope.location
				};
				console.log(newuser);
				authService.updateUsers(newuser);
			}
			$scope.onCancel = function () {
				$scope.isactive = false;
			}
		}
	}
});
myapp.controller("profileController", function ($scope) {
	let user = JSON.parse(localStorage.getItem("active_user"));
	$scope.profile_username = user.username;
	$scope.profile_password = user.password;
	$scope.profile_firstname = user.firstname;
	$scope.profile_lastname = user.lastname;
	$scope.profile_email = user.email;
	$scope.profile_phone = user.phone;
	$scope.profile_location = user.location;
	$scope.active = false;
	$scope.onUpdateProfile = function () {
		// update user info
		$scope.active = true;
	}
});