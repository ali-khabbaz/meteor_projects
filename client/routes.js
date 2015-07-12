angular.module('socially').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
	function ($urlRouterProvider, $stateProvider, $locationProvider) {

		$locationProvider.html5Mode(true);

		$stateProvider
			.state('parties', {
				url: '/parties',
				templateUrl: 'client/parties/views/parties-list.ng.html',
				controller: 'partiesListCtrl'
			})
			.state('partyDetails', {
				url: '/parties/:party_id',
				templateUrl: 'client/parties/views/party-details.ng.html',
				controller: 'PartyDetailsCtrl'
			});

		$urlRouterProvider.otherwise('/parties');
	}
]);