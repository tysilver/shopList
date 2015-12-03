myAppModule.controller('usersController', ['$scope', '$location', 'userFactory', function ($scope, $location, userFactory) {
	// $scope.users = [];
	// $scope.current_user;

	userFactory.getCurrentUser(function (data){
        $scope.current_user = data;
        if ($scope.current_user) {
            $location.path('/users/' + $scope.current_user._id)
        }
    });

	// userFactory.getUsers(function (data){
	// 	$scope.users = data;
	// });

	// $scope.addUser = function (){
	// 	$scope.newUser.created_at = new Date();
	// 	userFactory.addUser($scope.newUser, function (data) {
	// 		$scope.current_user = data;
	// 	});
	// 	$location.path('/profile')
	// 	$scope.newUser = {};
	// };
}]);