myAppModule.controller('newListController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory){
	$scope.items = [];
	$scope.current_user = {};
	$scope.users = []
	$scope.currentUsersFriends = [];

	userFactory.getCurrentUser(function (data){
        $scope.current_user = data;
        if (!$scope.current_user.hasOwnProperty("created_at")) {
        	console.log("WARNING: USER MUST LOG IN BEFORE VIEWING LIST CREATION PAGE AGAIN.")
            $location.path('/')
        } else {
        	userFactory.getUsers(function (data) {
        		$scope.users = data;
        		for (var i = 0; i < $scope.users.length; i++) {
        			for (var j = 0; j < $scope.current_user.users.length; j++) {
        				if ($scope.users[i]._id == $scope.current_user.users[j]) {
        					$scope.users[i].selected = false;
        					$scope.currentUsersFriends.push($scope.users[i])
        					break;
        				}
        			}
        		}
        	})
        }
    });

    $scope.addItem = function(){
		$scope.items.unshift({item: $scope.newItem.name, user: $scope.current_user.name})
		console.log($scope.items)
		$scope.newItem = ""
	};

	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	};

	$scope.saveList = function() {
		$scope.newList.created_at = new Date();
		$scope.newList.items = $scope.items;
		$scope.newList.usersFriends = [];
		for (var i = 0; i < $scope.currentUsersFriends.length; i++) {
			if ($scope.currentUsersFriends[i].selected) {
				$scope.newList.usersFriends.push($scope.currentUsersFriends[i])
			}
		}
		console.log("The user's friends selected are: ")
		console.log($scope.newList.usersFriends)
		userFactory.addList($scope.newList, function (){
			$location.path('/profile')
		})
	};

	$scope.delete = function (index) {
	    $scope.items.splice(index, 1);
	};
	
}]);