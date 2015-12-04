myAppModule.controller('newListController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory){
	$scope.items = [];
	$scope.current_user;

	userFactory.getCurrentUser(function (data){
        $scope.current_user = data;
        if (!$scope.current_user.hasOwnProperty("created_at")) {
        	console.log("WARNING: USER MUST LOG IN BEFORE VIEWING LIST CREATION PAGE AGAIN.")
            $location.path('/')
        }
    });

    $scope.addItem = function(){
		$scope.items.push({item: $scope.newItem.name, user: $scope.current_user.name})
		console.log($scope.items)
		$scope.newItem = ""
	};

	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	}

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
	
}]);