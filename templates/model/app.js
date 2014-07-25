'use strict'

var myApp = myApp || {};

myApp.Controllers = angular.module('myapp.controllers',[]);
myApp.Services = angular.module('myapp.services',[]);

angular.module('myapp',['ngRoute','myapp.controllers','myapp.services'])

	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/api', {
				templateUrl: 'html/slide.html'
			})
			.when('/api/phones', {
				templateUrl: 'html/page1.html',
				controller: 'indexCtrl'
			})
			.when('/api/phones/:phone_id', {
				templateUrl: 'html/item.html',
				controller: 'phoneCtrl'
			})
			.when('/api/cart', {
				templateUrl: 'html/cartitem.html',
				controller: 'CartCtrl'
			})
			.when('/api/wishlist', {
				templateUrl: 'html/wishlist.html',
				controller: 'WishlistCtrl'
			})
			.otherwise({
				redirectTo : '/api'
			});
	}]);