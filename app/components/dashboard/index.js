'use strict';

module.exports = angular.module('app.dashboard', [
		require('../../shared/navbar').name,
		require('./market').name
])
.controller('DashboardCtrl', ['$scope', require('./dashboard.ctrl')])
.factory('DashboardService', require('./dashboard.service'));