angular.module('socially').controller('partiesListCtrl', partiesListCtrl);
partiesListCtrl.$inject = ['$meteor'];

function partiesListCtrl($meteor) {
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
}