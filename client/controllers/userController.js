myAppModule.controller('usersController', ['$scope', '$location', 'userFactory', function ($scope, $location, userFactory) {
	$scope.users = [];
	$scope.current_user;

	userFactory.getCurrentUser(function (data) {
		$scope.current_user = data;
	});

	// userFactory.getUsers(function (data){
	// 	$scope.users = data;
	// });

	$scope.addUser = function (){
		// var has = false;
		// for (var i=0; i < $scope.users.length; i++) {
		// 	if ($scope.newUser.name == $scope.users[i].name) {
		// 		$scope.errors = {error: 'User already exists.'}
		// 		has = true;
		// 		break;
		// 	} else {
		// 		has = false;
		// 	}
		// }
		// if (has == false) {
			// $scope.errors = {}
			$scope.newUser.created_at = new Date();
			userFactory.addUser($scope.newUser, function (data) {
				$scope.current_user = data;
			});
			$location.path('/profile')
		// }
		$scope.newUser = {};
	};
}]);