myApp.controller('MeetingsController', 
	['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', 
	function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);

		auth.$onAuth(function(authUser) {
			if (authUser) {
				var meetingsRef = new Firebase(FIREBASE_URL + 'users/' +
					$rootScope.currentUser.$id + '/meetings');
				var meetingsInfo = $firebaseArray(meetingsRef);

				$scope.meetings = meetingsInfo;

				meetingsInfo.$loaded().then(function(data){
					$rootScope.howManyMeetings = meetingsInfo.length;	
				});

				//to make surethat when length of array changes, change the number of howManyMeetings
				meetingsInfo.$watch(function(data){
					$rootScope.howManyMeetings = meetingsInfo.length;	
				});


				$scope.addMeeting = function() {
					meetingsInfo.$add({
						name: $scope.meetingname,
						date: Firebase.ServerValue.TIMESTAMP
					}).then(function() {
						$scope.meetingname='';
					});
				} // addMeeting

				$scope.deleteMeeting = function(key) {
					meetingsInfo.$remove(key);
				} //deleteMeeting

			} //userAuthenticated
		}) //on Authentication

}]);