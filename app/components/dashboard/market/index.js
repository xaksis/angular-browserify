'use strict';

module.exports = angular.module('app.dashboard.market', [
		require('../../../shared/sidebar').name,
		require('../shared').name
])
.controller('MarketCtrl', ['$scope', 'MarketService', require('./market.ctrl')])
.factory('MarketService', require('./market.service'));