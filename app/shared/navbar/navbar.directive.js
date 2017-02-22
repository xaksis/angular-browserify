'use strict';

module.exports = function() {
	return{
		scope: {
			title: '='
		}, 
		restrict: 'A',
		controller: function($scope){
			$scope.logout = function(){
		        var formHTML = [
		          '<form action="/logout/" method="post">',
		          csrfToken,
		          "'>",
		          '</form>'
		        ].join('');

		        var form = $(formHTML);
		        $('body').append(form);
		        form.submit();
		    }
		},
		//controller: 'NavbarCtrl' //in case we need it
		link: function(scope, elem, attrs){
		},
		templateUrl: '/static/shared/navbar/navbar.tpl.html'
	};
};