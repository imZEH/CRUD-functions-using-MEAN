'use strict'

var URL = 'http://localhost:8080/';

var phoneFactory = function($http){
	var phoneFactory = {};
	phoneFactory.allitems = [];
	phoneFactory.cartItems = [];
	phoneFactory.wishlistItems = [];

		
	phoneFactory.displayall = function(callback){
		$http.get(URL + 'api/phones').success(function(data){
			phoneFactory.allitems = data;
			callback(phoneFactory.allitems);
		});
	}

	phoneFactory.displaySpecific = function(id,callback){
		$http.get(URL + 'api/phones/' + id).success(function(data){
			callback(data);
		});
	}

	phoneFactory.store = function(phone,callback){
		$http.post(URL + 'api/phones',phone).success(function(data){
			phoneFactory.allitems.push(data._data);
			callback(phoneFactory.allitems);
		});
	}

	phoneFactory.Change = function(data,callback){

		$http.put(URL + 'api/phones/'+ data._id, data).success(function(data){
			callback(data._data);
		});
	}

	phoneFactory.Delete = function(id,index){
		$http.delete(URL + 'api/phones/'+ id).success(function(data){
			phoneFactory.allitems.splice(index,1);
		});
	}

	phoneFactory.DisplayCart = function(callback){
		callback(phoneFactory.cartItems);
	}

	phoneFactory.AddToCart = function(item){
		phoneFactory.cartItems.push(item);
	}

	phoneFactory.DeleteFromCart = function(index){
		phoneFactory.cartItems.splice(index,1);
	}

	phoneFactory.DisplayWishlist = function(callback){
		callback(phoneFactory.wishlistItems);
	}

	phoneFactory.AddToWishlist = function(item){
		phoneFactory.wishlistItems.push(item);
	}

	phoneFactory.DeleteFromishlist = function(index){
		phoneFactory.wishlistItems.splice(index,1);
	}

	return phoneFactory;
};

myApp.Services.factory('phoneFactory',['$http',phoneFactory]);