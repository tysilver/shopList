myAppModule.controller('editListController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory){
	$scope.current_list;
	$scope.current_user = {};
	$scope.items = []
	$scope.count = 0
	$scope.message = ''

	userFactory.getCurrentUser(function (data){
        $scope.current_user = data;
        if (!$scope.current_user.hasOwnProperty("created_at")) {
        	console.log("WARNING: USER MUST LOG IN BEFORE VIEWING  PAGE AGAIN.")
            $location.path('/')
        }
    });

	userFactory.getCurrentList($routeParams.listId, function (data){
		$scope.current_list = data;
		$scope.items = $scope.current_list.items
	});

	$scope.addItem = function(){
    	$scope.count++
    	$scope.message = "When you are finished, please click 'Update List' to save this list."
		$scope.items.unshift({item: $scope.newItem.name, user: $scope.current_user.name})
		console.log($scope.items)
		$scope.newItem = ""
	};

	$scope.delete = function (index) {
		$scope.count += 1
	    $scope.items.splice(index, 1);
	    if ($scope.count > 0) {
	    	$scope.message = "You must click 'Update List' to save changes"
	    }
	}

	$scope.updateList = function() {
		console.log($scope.current_list.title)
		$scope.current_list.items = $scope.items;
		userFactory.updateList($scope.current_list, function (){
			$location.path('/profile')
		})
	}

	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	}
	
}]);