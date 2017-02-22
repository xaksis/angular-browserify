'use strict';

module.exports = function($uibModal) {
	return{
		scope: {
			fleetData: "="
		}, 
		restrict: 'A',
		controller: function($scope){
		},
		link: function(scope, elem, attrs){
			
			var editModal;
			function openEditModal(){
				console.log('opening modal...');
				editModal = $uibModal.open({
					templateUrl: '/static/components/dashboard/shared/fleetProfile/editFleetProfile.modal.html',
					scope: scope,
					backdrop: "static"
				});
			}

			scope.editClicked = function(){
				openEditModal();
			}

			scope.$watch("fleetData", function(data){
				console.log("fleet changing...");
			}, true);
		},
		templateUrl: '/static/components/dashboard/shared/fleetProfile/fleetProfile.tpl.html'
	};
}