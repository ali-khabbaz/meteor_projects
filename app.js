(function () {
	'use strict';
	var Parties = new Mongo.Collection("parties");
	if (Meteor.isClient) {
		angular.module('socially', ['angular-meteor', 'ui.router']);


		var partiesListCtrl = function ($meteor) {
			var vm = this;
			vm.parties = $meteor.collection(Parties);
			console.log('parties', vm.parties);
			vm.add = add;
			vm.remove = remove;

			function remove() {
				vm.parties.splice(0, 1);
				//vm.parties.remove(); remove all or remove an item
			}

			function add() {
				vm.parties.push({
					"name": vm.name,
					"description": vm.description
				});
				/*vm.parties.save({
					"name": vm.name,
					"description": vm.description
				});*/
			}
		};

		var PartyDetailsCtrl = function ($stateParams) {
			var vm = this;
			console.log('id', $stateParams.partyId);
			vm.partyId = $stateParams.partyId;
		};

		angular.module('socially').controller('partiesListCtrl', partiesListCtrl);
		partiesListCtrl.$inject = ['$meteor'];

		angular.module('socially').controller('PartyDetailsCtrl', PartyDetailsCtrl);
		PartyDetailsCtrl.$inject = ['$stateParams'];

		angular.module('socially').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
			function ($urlRouterProvider, $stateProvider, $locationProvider) {

				$locationProvider.html5Mode(true);

				$stateProvider
					.state('parties', {
						url: '/parties',
						templateUrl: 'parties-list.ng.html',
						controller: 'partiesListCtrl'
					})
					.state('partyDetails', {
						url: '/parties/:partyId',
						templateUrl: 'party-details.ng.html',
						controller: 'PartyDetailsCtrl'
					});

				$urlRouterProvider.otherwise('/parties');
			}
		]);



	}

	if (Meteor.isServer) {
		Meteor.startup(function () {
			if (Parties.find().count() === 0) {

				var parties = [{
					'name': 'Dubstep-Free Zone',
					'description': 'Can we please just for an evening not listen to dubstep.'
				}, {
					'name': 'All dubstep all the time',
					'description': 'Get it on!'
				}, {
					'name': 'Savage lounging',
					'description': 'Leisure suit required. And only fiercest manners.'
				}];
				parties.forEach(function (val) {
					Parties.insert(val);
				});
			}
		});
	}
})();