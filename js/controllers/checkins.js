myApp.controller('CheckInsController', 
	['$scope', '$rootScope', '$firebaseObject', '$routeParams', '$firebaseArray', 'FIREBASE_URL', 
	function($scope, $rootScope, $firebaseObject, $routeParams, $firebaseArray, FIREBASE_URL) {

		$scope.whichmeeting = $routeParams.mId;
		$scope.whichuser = $routeParams.uId;

		var ref = new Firebase(FIREBASE_URL + 'users/' + 
			$scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins');

		$scope.addCheckin = function() {
			var checkinsInfo = $firebaseArray(ref);
			var myData = {
				firstname: $scope.user.firstname,
				lastname: $scope.user.lastname,
				email: $scope.user.email,
				date: Firebase.ServerValue.TIMESTAMP
			};

			checkinsInfo.$add(myData);
		} //AddCheckin
		//checkin -> go to a newpage.

}]);