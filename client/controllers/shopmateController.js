myAppModule.controller('shopmateController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory){
	$scope.users = [];
	$scope.current_user = {};

	userFactory.getCurrentUser(function (data){
        $scope.current_user = data;
        if (!$scope.current_user.hasOwnProperty("created_at")) {
        	console.log("WARNING: USER MUST LOG IN BEFORE VIEWING PROFILE PAGE AGAIN.")
            $location.path('/')
        } else {
        	userFactory.getUsers(function (data1) {
		    	for (var i = 0; i < data1.length; i++) {
		    		console.log("User i: " + data1[i]._id)
					for (var j = 0; j < $scope.current_user.users.length; j++) {
						console.log("User j: " + $scope.current_user.users[j])
						if (data1[i]._id == $scope.current_user.users[j]) {
							$scope.users.push(data1[i])
							break;
						}
					}
				};
		    })
        }
    });

	$scope.removeUser = function (userId) {
		console.log(userId)
		userFactory.unfriendUsers(userId, function (data){
			$scope.users.splice($scope.users.indexOf(data), 1)
		})
	};

	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	}
	
}]);