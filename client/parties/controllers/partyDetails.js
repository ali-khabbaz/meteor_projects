angular.module('socially').controller('PartyDetailsCtrl', PartyDetailsCtrl);
PartyDetailsCtrl.$inject = ['$meteor', '$stateParams'];

function PartyDetailsCtrl($meteor, $stateParams) {
	var vm = this;
	vm.reset = reset;
	vm.save = save;

	function save() {
		vm.party.save().then(function (num) {
			console.log('save success doc affected ', num);
		}, function (err) {
			console.log('save error', err);
		});
	}

	function reset() {
		vm.party.reset();
	}
	vm.party_id = $stateParams.party_id;
	vm.party = $meteor.object(Parties, $stateParams.party_id, false);
	console.log('>>>>>>', vm.party);
}