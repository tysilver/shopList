myAppModule.controller('profileController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory){
	$scope.lists = [];
	$scope.current_user = {};

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

	$scope.deleteList = function (list) {
		console.log(list.title)
		$scope.lists.splice($scope.lists.indexOf(list), 1)
		userFactory.deleteList(list);
	};

	$scope.logout = function(){
		userFactory.logout();
		$scope.current_user = {};
		$location.path('/');
	}
	
}]);
