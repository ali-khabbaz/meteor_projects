angular.module('socially').controller('partiesListCtrl', partiesListCtrl);
partiesListCtrl.$inject = ['$meteor', '$rootScope'];

function partiesListCtrl($meteor, $rootScope) {
	var vm = this;
	vm.parties = $meteor.collection(Parties);
	console.log('parties', vm.parties);
	vm.add = add;
	vm.remove = remove;
	console.log('rootscope', $rootScope);

	function remove() {
		vm.parties.splice(0, 1);
		//vm.parties.remove(); remove all or remove an item
	}

	function add() {
		vm.parties.push({
			"name": vm.name,
			"description": vm.description,
			"owner": $rootScope.currentUser._id
		});
	}
}