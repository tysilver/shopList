myAppModule.factory('userFactory', function ($http) {
	var factory = {};
	var users = [];
	var current_user = {}
	var lists = [];
	var current_topic_posts = [];

	// FOR USERS:
	factory.getUsers = function(callback){
		$http.get('/users').success(function (output){
			users = output;
			// if (users.length < 1) {
			// 	for (var i = 0; i < output.length; i++) {
			// 		users.push(output[i]);
			// 	}
			// }
			callback(users);
		});
	};

	factory.addUser = function(info, callback) {
		console.log("The info before we post to newUser is: ")
		console.log(info)
		$http.post('/newUser', {info}).success(function (output){
			current_user = output;
			console.log("The current user is: " + current_user)
			callback(current_user)
		});
	};

	factory.getCurrentUser = function(callback) {
		callback(current_user);
	}

	factory.getOneUser = function(userId, callback){
		console.log("The userId is: " + userId)
		$http.get('/oneUser/' + userId).success(function (output){
			console.log("The current user chosen is: " + output.name)
			current_user = output
			callback(current_user)
		});
	};
	factory.getJohn = function(callback){
		$http.get('/oneUser/56632e870d4dab4bb1bd86de').success(function (output){
			console.log("The current user chosen is: " + output.name)
			current_user = output
			callback(current_user)
		});
	};
	factory.getJane = function(callback){
		$http.get('/oneUser/56632e8c0d4dab4bb1bd86df').success(function (output){
			console.log("The current user chosen is: " + output.name)
			current_user = output
			callback(current_user)
		});
	};
	factory.createFriendship = function(otherUserId, currentUser, callback){
		$http.post('/friendship/' + otherUserId, {currentUser}).success(function (output){
			current_user = output
			callback(current_user)
		})
	}

	// FOR LISTS:
	factory.getLists = function(callback){
		$http.get('/lists/' + current_user._id).success(function (output){
			lists = [];
			for (var i = 0; i < output.length; i++) {
				var d = new Date(output[i].created_at);
                output[i].dateString = setDate(d);
				lists.push(output[i]);
			}
			callback(lists);
		});
	};

	factory.getCurrentList = function(listId, callback){
		$http.get('/oneList/' + listId).success(function (output){
			callback(output)
		});
	};

	factory.addList = function(info, callback) {
		$http.post('/newList/' + current_user._id, {info}).success(function (output){
			lists.push(output);
			callback()
		});
	};

	factory.updateList = function(info, callback) {
		console.log(info)
		$http.post('/updateList/' + current_user._id, {info}).success(function (output){
			lists = [];
			for (var i = 0; i < output.length; i++) {
				lists.push(output[i])
			}
			callback()
		});
	};

	factory.deleteList = function(list) {
		$http.post('/removeList', {list}).success(function (output){
			console.log("successful deletion!")
		})
	};

	factory.logout = function(){
		current_user = {};
	}

	return factory;
});