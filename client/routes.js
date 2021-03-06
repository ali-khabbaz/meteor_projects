angular.module("socially").run(["$rootScope", "$state", function ($rootScope, $state) {
	$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
		// We can catch the error thrown when the $requireUser promise is rejected
		// and redirect the user back to the main page
		if (error === "AUTH_REQUIRED") {
			console.log('not authenticated');
			$state.go('parties');
		}
	});
}]);

angular.module('socially').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
	function ($urlRouterProvider, $stateProvider, $locationProvider) {

		$locationProvider.html5Mode(true);

		$stateProvider
			.state('parties', {
				url: '/parties',
				templateUrl: 'client/parties/views/parties-list.ng.html',
				controller: 'partiesListCtrl',
				resolve: {
					'subscribe': [
						'$meteor',
						function ($meteor) {
							return $meteor.subscribe('parties');
						}
					]
				}
			})
			.state('partyDetails', {
				url: '/parties/:party_id',
				templateUrl: 'client/parties/views/party-details.ng.html',
				controller: 'PartyDetailsCtrl',
				resolve: {
					"currentUser": ["$meteor", function ($meteor) {
						return $meteor.requireUser();
					}]
				}
			});

		$urlRouterProvider.otherwise('/parties');
	}
]);