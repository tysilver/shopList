myAppModule.controller('profileController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory){
	$scope.topics = [];
	$scope.current_user;

	userFactory.getOneUser($routeParams.userId, function (data) {
		$scope.current_user = data;
	});

	// userFactory.getTopics(function (data){
	// 	$scope.topics = data;
	// });

	// $scope.addTopic = function(){
	// 	userFactory.getCurrentUser(function (data){
	// 		$scope.current_user = data;
	// 		$scope.newTopic.created_at = new Date();
	// 		$scope.newTopic.user_id = $scope.current_user._id;
	// 		userFactory.addTopic($scope.newTopic);
	// 		$scope.newTopic = {};
	// 	});
	// };

	// $scope.removeTopic = function(topic){
	// 	userFactory.removeTopic(topic);
	// }

	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	}
	
}]);