myAppModule.controller('profileController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory){
	$scope.lists = [];
	$scope.current_user;

	userFactory.getCurrentUser(function (data){
        $scope.current_user = data;
        if (!$scope.current_user.hasOwnProperty("created_at")) {
        	console.log("WARNING: USER MUST LOG IN BEFORE VIEWING PROFILE PAGE AGAIN.")
            $location.path('/')
        }
    });

	userFactory.getLists(function (data){
		$scope.lists = data;
	});

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