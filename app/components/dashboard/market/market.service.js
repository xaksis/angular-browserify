module.exports = function($http, $q, $timeout){
	var service = {};

	service.getZoneList = function(){
		var deferred = $q.defer();
		$http({
			//url : '../request_clients',
			url : '/static/temp/zoneList.json',
			params: {},
			method : 'GET'
		}).success(function(response){
			deferred.resolve(response);
		}).error(function(){
			deferred.reject('An unexpected error occured');
		});
		return deferred.promise;
	}

	service.getFleetProfile = function(){
		var deferred = $q.defer();
		$http({
			//url : '../request_clients',
			url : '/static/temp/fleetProfile.json',
			params: {},
			method : 'GET'
		}).success(function(response){
			deferred.resolve(response);
		}).error(function(){
			deferred.reject('An unexpected error occured');
		});
		return deferred.promise;
	}

	service.getMetrics = function(){
		var deferred = $q.defer();
		$http({
			//url : '../request_clients',
			url : '/static/temp/metrics.json',
			params: {},
			method : 'GET'
		}).success(function(response){
			deferred.resolve(response);
		}).error(function(){
			deferred.reject('An unexpected error occured');
		});
		return deferred.promise;
	}

	service.getMoves = function(){
		var deferred = $q.defer();
		$http({
			//url : '../request_clients',
			url : '/static/temp/moves.json',
			params: {},
			method : 'GET'
		}).success(function(response){
			deferred.resolve(response);
		}).error(function(){
			deferred.reject('An unexpected error occured');
		});
		return deferred.promise;
	}

	service.getMap = function(){
		var deferred = $q.defer();
		$http({
			//url : '../request_clients',
			url : '/static/temp/philadelphia.json',
			params: {},
			method : 'GET'
		}).success(function(response){
			deferred.resolve(response);
		}).error(function(){
			deferred.reject('An unexpected error occured');
		});
		return deferred.promise;
	}

	service.getMapPods = function(){
		var deferred = $q.defer();
		$http({
			//url : '../request_clients',
			url : '/static/temp/pods.json',
			params: {},
			method : 'GET'
		}).success(function(response){
			deferred.resolve(response);
		}).error(function(){
			deferred.reject('An unexpected error occured');
		});
		return deferred.promise;
	}

	return service;
}