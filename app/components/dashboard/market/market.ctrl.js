module.exports = function($scope, mService) {
    $scope.message = 'Market works! This should work';

    $scope.moveSlider = {
	  value: 40,
	  options: {
	    floor: 10,
	    ceil: 100,
	    step: 10,
        translate: function(value) {
          return value + ' Moves';
        }
	  }
	};


    mService.getZoneList().then(function(response){
    	$scope.zones = response;
    });

    mService.getFleetProfile().then(function(response){
    	$scope.fleetProfile = response;
    });

    mService.getMetrics().then(function(response){
    	$scope.metricsData = response;
    });

    mService.getMoves().then(function(response){
    	$scope.movesData = response;
    });

    mService.getMap().then(function(mapResponse){
        mService.getMapPods().then(function(mapPodResponse){
            $scope.mapData = mapResponse;
            $scope.mapPods = mapPodResponse;
        });
    });
}