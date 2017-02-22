'use strict';

module.exports = function() {
	return{
		scope: {
			movesData: "="
		}, 
		restrict: 'A',
		controller: function($scope){
		},
		link: function(scope, elem, attrs){
		},
		templateUrl: '/static/components/dashboard/shared/moves/moves.tpl.html'
	};
}