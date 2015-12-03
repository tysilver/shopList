myAppModule.factory('userFactory', function ($http) {
	var factory = {};
	var users = [];
	var current_user;
	var topics = [];
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
		$http.get('/oneUser/' + userId).success(function (output){
			callback(output)
		});
	};

	// FOR TOPICS:
	factory.getTopics = function(callback){
		$http.get('/topics').success(function (output){
			topics = [];
			for (var i = 0; i < output.length; i++) {
				topics.push(output[i]);
			}
			callback(topics);
		});
	};

	factory.getOneTopic = function(topic_id, callback){
		$http.get('/oneTopic/' + topic_id).success(function (output){
			callback(output)
		});
	};

	factory.addTopic = function(info) {
		$http.post('/newTopic/' + info.user_id, {info}).success(function (output){
			topics.push(output);
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
		$current_user = {};
	}

	return factory;
});