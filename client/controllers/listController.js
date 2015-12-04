myAppModule.controller('listController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory){
	$scope.current_list;
	$scope.current_user = {};

	userFactory.getCurrentUser(function (data){
        $scope.current_user = data;
        if (!$scope.current_user.hasOwnProperty("created_at")) {
        	console.log("WARNING: USER MUST LOG IN BEFORE VIEWING  PAGE AGAIN.")
            $location.path('/')
        }
    });

	userFactory.getCurrentList($routeParams.listId, function (data){
		$scope.current_list = data;
	});

	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	}
	
}]);