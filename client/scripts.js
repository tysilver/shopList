var myAppModule = angular.module('myApp', ['ngRoute']);

myAppModule.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/',{
			templateUrl: 'views/view1.html',
			controller: 'usersController'
		})
		.when('/profile',{
			templateUrl: 'views/view2.html',
			controller: 'profileController'
		})
		.when('/newlist',{
			templateUrl: 'views/view3.html',
			controller: 'newListController'
		})
		.otherwise({
			redirectTo: '/'
		});
});

myAppModule.controller('viewTopicController', function ($scope, $routeParams, $location, userFactory){
	$scope.current_user = {};
	$scope.current_topic = {};
	$scope.currentTopicPosts = [];
	$scope.comments = [];

	userFactory.getCurrentUser(function (data){
		$scope.current_user = data;
	});

	userFactory.getOneTopic($routeParams.id, function (topic){
		$scope.current_topic = topic;
		userFactory.getCurrentTopicPosts($scope.current_topic, function (data){
			$scope.currentTopicPosts = data;
			userFactory.getComments(function (comments){
				$scope.comments = comments;
				for (var i = 0; i < $scope.currentTopicPosts.length; i ++) {
					// CREATE A LOOP IN HERE THAT ADDS EACH COMMENT TO A POST, AND THEN PUSHES THE POST (output[i])
					// INTO current_topic_posts IN THE FACTORY
					$scope.currentTopicPosts[i].post_comments = [];
					for (var j = 0; j < $scope.comments.length; j++) {
						if ($scope.currentTopicPosts[i]._id == $scope.comments[j]._post) {
							$scope.currentTopicPosts[i].post_comments.push($scope.comments[j]);
						}
					}
				}
			});
		});
	});

	$scope.addPost = function(){
		$scope.newPost.created_at = new Date();
		$scope.newPost.user_name = $scope.current_user.name;
		$scope.newPost.topic_id = $scope.current_topic._id;
		$scope.newPost.userId = $scope.current_user._id;
		userFactory.addPost($scope.newPost, function (newestPost){
			newestPost.post_comments = [];
			$scope.currentTopicPosts.push(newestPost);
		});
		$scope.newPost = {};
	};

	$scope.addComment = function(post, newComment) {
		console.log("This is supposed to be the scope.newComment: ")
		console.log($scope.newComment)
		console.log("And the scope.post is: ")
		console.log($scope.post)
		newComment.created_at = new Date();
		newComment.user_name = $scope.current_user.name;
		newComment.userId = $scope.current_user._id;
		newComment.topic_id = $scope.current_topic._id;
		newComment.post_id = post._id;
		userFactory.addComment(newComment, function (newestComment) {
			// ADDS THE COMMENT TO ITS RESPECTIVE POST IN THE SCOPE VARIABLE currentTopicPosts
			console.log("And once we've come back to the addComment method in our controller, newestComment is: ");
			console.log(newestComment);
			for (var i = 0; i < $scope.currentTopicPosts.length; i ++) {
				if ($scope.currentTopicPosts[i]._id == newestComment._post) {
					$scope.currentTopicPosts[i].post_comments.push(newestComment);
					break;
				}
			}
		})
		newComment = {};
		$scope.newComment = {};
	}

	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	}

});

myAppModule.controller('viewUserController', function ($scope, $routeParams, $location, userFactory){
	userFactory.getCurrentUser(function (data){
		$scope.current_user = data;
	});

	userFactory.getOneUser($routeParams.userId, function (data){
		$scope.profile_user = data;
	});
	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	}
});
