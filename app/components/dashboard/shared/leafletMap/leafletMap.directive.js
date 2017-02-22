'use strict';

module.exports = function() {
	return{
		scope: {
			mapData: "=",
			podData: "="
		}, 
		restrict: 'A',
		controller: function($scope){
		},
		link: function(scope, elem, attrs){
			var mymap;
			function drawMap(data){
				//console.log(data);
				//get the element we wanna draw the map on
				var dom = $(elem).find("#map-container");
				mymap = L.map('map-container').setView([39.9526, -75.1652], 10);
				//L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2VsZWN0IiwiYSI6ImNpcnJ0b210cTBpbWxmOW02ODRveHVramoifQ.tscrL77BLh6TMC9ihG_LsA', {
				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2VsZWN0IiwiYSI6ImNpcnJ0b210cTBpbWxmOW02ODRveHVramoifQ.tscrL77BLh6TMC9ihG_LsA', {
			      maxZoom: 18,
			      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			      id: 'mapbox.streets'
			    }).addTo(mymap);
			}

			function removePins(){
			}

			function drawPins(data){
				console.log(data);
				var geojsonLayer = L.geoJson([data], {
					style: function(feature) {
					    return {
					      // "color": "#78c679",
					      // "weight": 5,
					      // "opacity": 0.9
					    }
					  },
					  // Put onEachFeature within the options object, not as 3rd argument.
					  onEachFeature: function(feature, layer) {
					    layer.bindPopup(feature.properties["Street Address"]);
					  },
					  pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, {
							radius: 3,
							fillColor: "#a31f34",
							//color: "#000",
							weight: 0,
							opacity: 0,
							fillOpacity: 0.8
						});
					}

				}).addTo(mymap);
				mymap.fitBounds(geojsonLayer.getBounds());
			}

			scope.$watch("mapData", function(data){
				if(data){
					drawMap(scope.mapData);
					drawPins(scope.podData);
				}
			});

		},
		templateUrl: '/static/components/dashboard/shared/leafletMap/leafletMap.tpl.html'
	};
};