'use strict';
var angular = require('angular');
window._ = require('lodash');
require('bootstrap-ui');
require('angular-sanitize');
require('angular-animate');
require('angularjs-slider');
require('angular-file-upload');
require('infinite-scroll');
require('angular-smart-table');

angular.module ('app', 
[
	require('ui.router'), 
	'ui.bootstrap', 
	'ngSanitize',
	'ngAnimate',
	'rzModule',
	'infinite-scroll',
	'angularFileUpload',
	'smart-table',
	require('./components/dashboard').name
])
.config(['$stateProvider', '$urlRouterProvider', '$interpolateProvider',
	function($stateProvider, $urlRouterProvider, $interpolateProvider){
		$interpolateProvider.startSymbol('[[');
 		$interpolateProvider.endSymbol(']]');

		$stateProvider
			.state("dashboard", {
				url: '',
				templateUrl: '/static/components/dashboard/dashboard.tpl.html',
				controller: 'DashboardCtrl'
			})
				.state("dashboard.market", {
					url: '/market',
					templateUrl: '/static/components/dashboard/market/market.tpl.html',
					controller: 'MarketCtrl'
				});
}]);