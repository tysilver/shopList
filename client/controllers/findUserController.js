myAppModule.controller('findUserController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory){
	$scope.users = [];
	$scope.current_user = {};

	userFactory.getCurrentUser(function (data){
        $scope.current_user = data;
        console.log($scope.current_user)
        if (!$scope.current_user.hasOwnProperty("created_at")) {
        	console.log("WARNING: USER MUST LOG IN BEFORE VIEWING PROFILE PAGE AGAIN.")
            $location.path('/')
        } else {
        	userFactory.getUsers(function (data1) {
				for (var i = 0; i < data1.length; i++) {
					console.log("We entered the for loop " + i + " times")
					console.log(data1[i])
					if ($scope.current_user.users.indexOf(data1[i]._id) > 0) {
						console.log($scope.current_user.users.indexOf(data1[i]))
						console.log("The first if was run")
					} else if ($scope.current_user._id == data1[i]._id) {
						console.log("The second if was run")
					} else {
						$scope.users.push(data1[i])
						console.log("Data pushed")
					}
				};
			});
        }
    });

	$scope.addShopper = function(userId){
		userFactory.createFriendship(userId, $scope.current_user, function (data){
			$scope.current_user = data;
			for (var i = 0; i < $scope.users.length; i++) {
				if ($scope.users[i]._id == userId) {
					$scope.users.splice(i, 1)
					break;
				}
			}
		})
	};

	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	};
	
}]);