(function () {
	'use strict';
	var Parties = new Mongo.Collection("parties");
	if (Meteor.isClient) {
		angular.module('socially', ['angular-meteor', 'ui.router']);

		var partiesListCtrl = function ($meteor) {
			var vm = this;
			vm.parties = $meteor.collection(Parties);
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

		angular.module('socially').controller('partiesListCtrl', partiesListCtrl);
		partiesListCtrl.$inject = ['$meteor'];


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