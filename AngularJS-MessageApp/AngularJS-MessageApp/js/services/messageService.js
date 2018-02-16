myapp.service("msgService",function(){

	let messages = JSON.parse(localStorage.getItem("messages"));
	function getMsgIndex(msg) {
		let index = 0;
		let active_user = JSON.parse(localStorage.getItem("active_user"));
		let messages = JSON.parse(localStorage.getItem("messages"));
		for (let i = 0; i < messages.length; i++) {
			if (messages[i].recipient == active_user.username && messages[i].title == msg.title && messages[i].description == msg.description) {
				index = i;
			}
		}
		return index;
	}

	this.deleteMessage = function (msg) {
		let index = getMsgIndex(msg);
		messages.splice(index, 1);
		localStorage.removeItem("messages");
		localStorage.setItem("messages", JSON.stringify(messages));
	}
	this.setAsImportant = function(msg){
		//find remove update insert to the top 
		// delete unshift();
		let index = getMsgIndex(msg);
		messages.splice(index, 1);
		messages.unshift(msg);
		localStorage.removeItem("messages");
		localStorage.setItem("messages", JSON.stringify(messages));
	}
	this.setAsNonImportant = function(msg){
		//find remove update insert to the botton
		// delete push
		let index = getMsgIndex(msg);
		messages.splice(index, 1);
		messages.push(msg);
		localStorage.removeItem("messages");
		localStorage.setItem("messages", JSON.stringify(messages));
	}
});