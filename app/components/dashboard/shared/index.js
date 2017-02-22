'use strict';

module.exports = angular.module('app.shared', [
])
.directive('fleetProfile', ['$uibModal', require('./fleetProfile/fleetProfile.directive')])
.directive('metrics', require('./metrics/metrics.directive'))
.directive('map', require('./map/map.directive'))
.directive('leafletMap', require('./leafletMap/leafletMap.directive'))
.directive('moves', require('./moves/moves.directive'));