'use strict';

module.exports = function($window, $timeout) {
	return{ 
		restrict: 'A',
		//controller: 'NavbarCtrl' //in case we need it
		link: function(scope, elem, attrs){

			scope.sidebarHeight = 0;
			var sidebar = $(elem);
			var w = angular.element($window);
			var d = $(document);
			var show_link = $('.side-bar__show-link');
			var DEBOUNCE_INTERVAL = 100; //play with this to get a balance of performance/responsiveness
			var timer
			scope.$watch(function() { timer = timer || $timeout(
			    function() {
			       timer = null;
			       var targetHeight = w.height()>d.height()?w.height:d.height();
			       var desiredHeight = targetHeight - sidebar.offset().top;
			       if (scope.sidebarHeight < desiredHeight) {
			           scope.$apply(function() { scope.sidebarHeight = desiredHeight; });
			       }
			    },
			    DEBOUNCE_INTERVAL,
			    false)
			});

			var sidebar_width = 250;

			scope.showSidebar = function(){
				$(elem).css('margin-left', -15);
				$(elem).find('.side-bar__show-link').removeClass('activate');
				$('.content-with-sidebar').css('margin-left', 250);
				$timeout(function(){
					//this is where we do something for main panel
				}, 400);
			};

			scope.hideSidebar = function(){
				$(elem).css('margin-left', (sidebar_width+15)*-1);
				$('.content-with-sidebar').css('margin-left', 55);
				$timeout(function(){
					//this is where we do something for main panel
					$(elem).find('.side-bar__show-link').addClass('activate');
				}, 400);
			}
		}
	};
};