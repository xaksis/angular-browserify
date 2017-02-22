'use strict';

module.exports = function() {
	return{
		scope: {
			metricsData: "="
		}, 
		restrict: 'A',
		controller: function($scope){
		},
		link: function(scope, elem, attrs){
			
		},
		templateUrl: '/static/components/dashboard/shared/metrics/metrics.tpl.html'
	};
}