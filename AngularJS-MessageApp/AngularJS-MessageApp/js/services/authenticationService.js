myapp.service("authService", function () {
	let allusers = JSON.parse(localStorage.getItem("all_users"));
	this.result = {
		message: "error",
		token : "no authorization"
	};
	this.desired_user = {};
	this.authUser = function (user) {
		if (allusers) {
			let username = user.username;
			let userpassword = user.password;
			console.log(allusers.length);
			for (let i = 0; i < allusers.length; i++) {
				if (allusers[i].username == username && allusers[i].password == userpassword) {
					console.log(username + " " + userpassword + "login suc scope");
					this.result.message = "success";
					localStorage.setItem("token_session", "token_" + username + "_" + userpassword);
					let user_token = "token_" + username + "_" + userpassword;
					this.result.token = localStorage.getItem("token_session");
					return this.result;
				} else {
					this.result.message = "error";
					this.result.token = "no authorization";
					console.log(username + " " + userpassword + " not match scope");
				}
			}
			return this.result;
		} else {
			return this.result;
		}
	}
	this.findUser = function (user) {
		let username = user.username;
		let userpassword = user.password;
		for (let i = 0; i < allusers.length; i++) {
			if (allusers[i].username == username && allusers[i].password == userpassword) {
				this.desired_user = allusers[i];
				console.log(this.desired_user);
			} 
		}
		return this.desired_user;
	}
	this.updateUsers = function(newuser){
		let old = JSON.parse(localStorage.getItem("active_user"));
		let username = old.username;
		let userpassword = old.password;
		for (let i = 0; i < allusers.length; i++) {
			if (allusers[i].username == username && allusers[i].password == userpassword) {
				allusers[i] = newuser;
				console.log(allusers[i]);
			} 
		}
		localStorage.removeItem("all_users");
		localStorage.setItem("all_users",JSON.stringify(allusers));
		localStorage.removeItem("active_user");
		localStorage.setItem("active_user",JSON.stringify(newuser));
	}
});