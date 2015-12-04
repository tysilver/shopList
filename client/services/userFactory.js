myAppModule.factory('userFactory', function ($http) {
	var factory = {};
	var users = [];
	var current_user = {}
	var lists = [];
	var current_topic_posts = [];

	// FOR USERS:
	factory.getUsers = function(callback){
		$http.get('/users').success(function (output){
			if (users.length < 1) {
				for (var i = 0; i < output.length; i++) {
					users.push(output[i]);
				}
			}
			callback(users);
		});
		return users;
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
		$http.get('/oneUser/56612be8321ac688a47c7d14').success(function (output){
			console.log("The current user chosen is: " + output.name)
			current_user = output
			callback(current_user)
		});
	};
	factory.getJane = function(callback){
		$http.get('/oneUser/56612bf2321ac688a47c7d15').success(function (output){
			console.log("The current user chosen is: " + output.name)
			current_user = output
			callback(current_user)
		});
	};

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

	factory.addList = function(info, callback) {
		$http.post('/newList/' + current_user._id, {info}).success(function (output){
			lists.push(output);
			callback()
		});
	};

	factory.getOneTopic = function(topic_id, callback){
		$http.get('/oneTopic/' + topic_id).success(function (output){
			callback(output)
		});
	};

	factory.removeTopic = function(info) {
		$http.post('/removeTopic', {info});
		topics.splice(topics.indexOf(info), 1)
	};

	// FOR POSTS:
	factory.addPost = function(info, callback) {
		$http.post('/newPost/' + info.topic_id, {info}).success(function (output){
			callback(output);
		});
	};

	factory.getCurrentTopicPosts = function(info, callback) {
		// grab ALL of the comments with the get request above.
		$http.get('/topicPosts/' + info._id, {info}).success(function (output) {
			current_topic_posts = [];
			for (var i = 0; i < output.length; i ++) {
				// CREATE A LOOP IN HERE THAT ADDS EACH COMMENT TO A POST, AND THEN PUSHES THE POST (output[i])
				// INTO current_topic_posts IN THE FACTORY
				current_topic_posts.push(output[i]);
			}
			callback(current_topic_posts);
		});
	};

	factory.addComment = function(info, callback) {
		$http.post('/addComment', {info}).success(function (output) {
			console.log("This should be the return of the comment after adding to db: ")
			console.log(output)
			callback(output);
		});
	};

	factory.getComments = function(callback) {
		$http.get('/getAllComments').success(function (output) {
			callback(output);
		});
	};

	factory.logout = function(){
		current_user = {};
	}

	return factory;
});