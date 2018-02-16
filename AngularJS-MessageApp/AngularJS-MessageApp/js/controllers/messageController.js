myapp.directive("detail", function ($rootScope,msgService) {
	return {
		restrict: 'ACE',
		templateUrl: '../Clients/message/messageDetail.html',
		scope: {
			detail: '='
		},
		link: function ($scope) {
			($scope.detail.important == 0) ? $scope.isImportant = true : $scope.isImportant = false;
			$scope.showreply = false;

			$scope.onReply = function () {
// set the compose box is true, lock the compose box
				$scope.showreply = true;
				$rootScope.isReply = true;
				$rootScope.sendername = $scope.detail.sender;
				angular.element("#replydiv").show();
				
			};
			$scope.onDelete = function () {
				// delete the message 
				msgService.deleteMessage($scope.detail);
			};
			$scope.onSetImportant = function () {
				console.log($scope.detail);	
				// message service set the important to 1
				$scope.detail.important = "1";
				msgService.setAsImportant($scope.detail);
			}
			$scope.onReset = function () {
				// reset the important to 0
				$scope.detail.important = "0";
				msgService.setAsNonImportant($scope.detail);
			}

			$scope.onBack = function () {
// set all reply box is false
				$scope.showreply = false;
				$rootScope.isReply = $scope.showreply;	
				angular.element(".detailcard").hide();
				angular.element("#composediv").hide();
				angular.element("#replydiv").hide();
					
			};
			
		}
	}
});
myapp.directive("compose", function ($rootScope) {
	return {
		restrict: 'ACE',
		templateUrl: '../Clients/message/composeMessage.html',
		scope: {
		},
		link: function ($scope) {
			let messageJSON = localStorage.getItem("messages");
			if(!messageJSON){
				localStorage.setItem("messages","[]");
			}
			
			$scope.onSend = function () {
				$scope.active_user = JSON.parse(localStorage.getItem("active_user"));
				let msg_array = JSON.parse(localStorage.getItem("messages"));				
				$scope.date = new Date();
				// default is a new composed message
				let newMsg = {
						recipient : $scope.compose_recipient,
						recipient_img : "http://simpleicon.com/wp-content/uploads/user1.png",
						sender : $scope.active_user.username,
						sender_img : "http://simpleicon.com/wp-content/uploads/user1.png",
						title : $scope.compose_title,
						description : $scope.compose_description,
						create_at : $scope.date,
						important : "0"
				};
				msg_array.push(newMsg);
				localStorage.removeItem("messages");
				localStorage.setItem("messages",JSON.stringify(msg_array));
				let test_array = JSON.parse(localStorage.getItem("messages"));				
				console.log(test_array);
			}
		}
	}
});
myapp.directive("replysection",function($rootScope){
	return {
			restrict: 'ACE',
			templateUrl: '../Clients/message/messageReply.html',
			scope: {
			},
			link: function ($scope) {
			$scope.doReply = function(){
				$scope.active_user = JSON.parse(localStorage.getItem("active_user"));
				let msg_array = JSON.parse(localStorage.getItem("messages"));				
				let date = new Date();
				// default is a new composed message
				let newMsg = {
						recipient : $rootScope.sendername,
						recipient_img : "http://simpleicon.com/wp-content/uploads/user1.png",
						sender : $scope.active_user.username,
						sender_img : "http://simpleicon.com/wp-content/uploads/user1.png",
						title : $scope.reply_title,
						description : $scope.reply_description,
						create_at : date,
						important : "0"
				};
					msg_array.push(newMsg);
					localStorage.removeItem("messages");
					localStorage.setItem("messages",JSON.stringify(msg_array));
					let test_array = JSON.parse(localStorage.getItem("messages"));				
					console.log(test_array);
				}
			}
	}
});
myapp.controller("messageController", function ($scope,$rootScope,msgService) {
	/**
$scope.messages = [{
			"recipient": "Arun",
            "recipient_img": "http://simpleicon.com/wp-content/uploads/user1.png",
            "sender": "Nanda",
            "sender_img": "http://simpleicon.com/wp-content/uploads/user1.png",
            "title": "This is a sample message to Arun.",
            "description": "This is a sample description to the message which has the above title",
            "created_at": "2017-01-19 09:45:00",
            "important": "0"
	}, {
			"recipient": "Nanda",
            "recipient_img": "http://simpleicon.com/wp-content/uploads/user1.png",
            "sender": "Arun",
            "sender_img": "http://simpleicon.com/wp-content/uploads/user1.png",
            "title": "This is a sample message to Nanda.",
            "description": "This is a sample description to the message which has the above title",
            "created_at": "2017-01-19 09:50:00",
            "important": "0"
		}];
	localStorage.setItem("messages",JSON.stringify($scope.messages));
*/
	let anyItem = localStorage.getItem("messages");
console.log(!anyItem);
	if(!anyItem){
		$scope.messages = [];
	}else{
		let messagelist = [];
		let active_user = JSON.parse(localStorage.getItem("active_user"));
		let messages =JSON.parse(localStorage.getItem("messages"));
		for(let i =0; i< messages.length;i++){
			if(messages[i].recipient == active_user.username){
				messagelist.push(messages[i]);
			}
		}
		$scope.messages = messagelist;
	}

	$scope.active = false;

	$scope.showdiv = false;
	$scope.showDetail = function (index) {
		angular.element(".detailcard").hide();
		angular.element("#" + index + "_detail").show();
	}
	$scope.onDetailHide = function () {
		$scope.showdiv = false;
		angular.element("#replydiv").hide();
		angular.element(".detailcard").hide();
		angular.element("#composediv").hide();
		$rootScope.isReply = false;
	}
	$scope.onCompose = function () {
		$scope.showdiv = true;
		angular.element("#composediv").show();
	}
});