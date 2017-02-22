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
			var svg, projection, pins;

			function drawMap(data){
				//console.log(data);
				//get the element we wanna draw the map on
				var dom = $(elem).find("#map-container");
				var w = dom.width();
				var h = dom.height();
				//console.log(dom, w, h);
				//lets attach the svg
				svg = d3.select("#map-container").append("svg")
          			.attr("width", w)
          			.attr("height", h);
          		//lets find the center
          		var center = d3.geo.centroid(data);
    			//Define map projection
    			//projection = d3.geo.albersUsa().scale(1100)
                //         .translate([w / 2, h / 2]);

		      var scale  = 51000;
		      var offset = [w/2, (h+150)/2];
		       projection = d3.geo.mercator().scale(scale).center(center)
		          .translate(offset)
                //Define path generator
			    var path = d3.geo.path()
			                     .projection(projection);
			    //Paint the path
			    svg.selectAll("path")
                   .data(data.features)
                   .enter()
                   .append("path")
                   .attr("d", path)
                   .attr("class", "map-boundary")
                   .style("fill", "#edf1f3");
			}

			function removePins(){
				if(pins){
					pins.selectAll("circle").remove();
					pins = null;
				}
			}

			function drawPins(data){
				removePins();

				pins = svg.append("g");
    			
    			pins.selectAll("circle")
	               .data(data.features.filter(function(d){ 
	               		return true;
                    }))
	                .enter()
	                .append("circle")
	                .attr("r", 2)
	                .attr("transform", function(d) {  
	                    if(projection([d.geometry.coordinates[1],d.geometry.coordinates[0]]) == null){
	                        console.log(d);
	                    }
	                    return "translate(" + projection([d.geometry.coordinates[1],d.geometry.coordinates[0]]) + ")"; 
	                })
	                .style("fill", function(d){
	                    //return scope.colors[d.properties.cluster];
	                    return "#a31f34";
	                })
	                .style("opacity", 0.9)
	                .classed("pin", true);

// 	            pins.selectAll("text")
// 	            	.data(data.features)
// 	            	.enter()
// 	            	.append("text")
// 	            	.attr("transform", function(d) {  
// 	                    if(projection([d.geometry.coordinates[1],d.geometry.coordinates[0]]) == null){
// 	                        console.log(d);
// 	                    }
// 	                    return "translate(" + projection([d.geometry.coordinates[1],d.geometry.coordinates[0]]) + ")"; 
// 	                })
// 	                .text(function(d){
// 	                	return d.properties["Location ID"];
// 	                })
// 	                .attr("font-family", "sans-serif")
// 7                 	.attr("font-size", "8px")
// 8                 	.attr("fill", "red");
			}

			scope.$watch("mapData", function(data){
				if(data){
					drawMap(scope.mapData);
					drawPins(scope.podData);
				}
			});

		},
		templateUrl: '/static/components/dashboard/shared/map/map.tpl.html'
	};
};