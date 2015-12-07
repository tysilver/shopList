myAppModule.controller('usersController', ['$scope', '$location', 'userFactory', function ($scope, $location, userFactory) {
	// $scope.users = [];
	$scope.current_user = {}

	userFactory.getCurrentUser(function (data){
        $scope.current_user = data;
        if ($scope.current_user.hasOwnProperty("created_at")) {
        	console.log("Created at: " + $scope.current_user.created_at)
        	console.log("WARNING: USER MUST LOG OUT BEFORE VIEWING HOME PAGE AGAIN.")
            $location.path('/profile')
        }
    });

    $scope.getJohn = function(){
    	userFactory.getJohn(function (data) {
    		// $scope.current_user = data
			$location.path('/profile')
		});
	}

	$scope.getJane = function(){
    	userFactory.getJane(function (data) {
    		// $scope.current_user = data
			$location.path('/profile')
		});
	}

	// userFactory.getUsers(function (data){
	// 	$scope.users = data;
	// });

	$scope.addUser = function (){
		$scope.newUser.created_at = new Date();
		userFactory.addUser($scope.newUser, function (data) {
			$scope.current_user = data;
			$scope.newUser = {};
			$location.path('/profile')
		});
	};
}]);