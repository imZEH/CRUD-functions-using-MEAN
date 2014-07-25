'use strict'

var indexCtrl = function($scope,$location,$routeParams,phoneFactory){
		$scope.phone = {};
		var indexof = 0;
		$scope.PhoneForEdit = false;
		phoneFactory.displayall(function(data){
			$scope.item = data;
		});

		$scope.gotoPhone = function(id){
			$location.path('/api/phones/'+id);
		}

		$scope.addphone = function(){
			if(!$scope.PhoneForEdit){
					phoneFactory.store($scope.phone,function(data){
					$scope.item = data;
				});
			}else{
				phoneFactory.Change($scope.phone,function(data){
					$scope.item.splice(indexof,1);
					$scope.item.push(data);
				})
			}
		}

		$scope.editphone = function(items,index){
			indexof = index;
			$scope.PhoneForEdit = true;
				phoneFactory.displaySpecific(items._id,function(data){
				$scope.phone = data;
			});
		}

		$scope.clear = function(){
			$scope.phone = {}
		}

		$scope.deletephoneitem = function(id,index){
			phoneFactory.Delete(id,index);
		}
}

var phoneCtrl = function($scope,$routeParams,phoneFactory){
	phoneFactory.displaySpecific($routeParams.phone_id,function(data){
			$scope.item = data;
		});

	$scope.goToPhone = function(data){
		phoneFactory.displaySpecific(data,function(data){
			$scope.item = data;
		});
	}
}

var CartCtrl = function($scope,$location,phoneFactory){
	phoneFactory.DisplayCart(function(data){
		$scope.cart = data;
	});

	$scope.AddToCart = function(item){
		phoneFactory.AddToCart(item);
	}

	$scope.DeleteFromCart = function(index){
		phoneFactory.DeleteFromCart(index);
	}

	$scope.gotoPhone = function(id){
		$location.path('/api/phones/'+id);
	}

}

var WishlistCtrl = function($scope,$location,phoneFactory){
	phoneFactory.DisplayWishlist(function(data){
		$scope.wishlist = data;
	});

	$scope.AddToWishlist = function(item){
		phoneFactory.AddToWishlist(item);
	}

	$scope.DeleteFromishlist = function(index){
		phoneFactory.DeleteFromishlist(index);
	}

	$scope.gotoPhone = function(id){
		$location.path('/api/phones/'+id);
	}
	
}

myApp.Controllers.controller('indexCtrl',['$scope','$location','$routeParams','phoneFactory',indexCtrl]);
myApp.Controllers.controller('phoneCtrl',['$scope','$routeParams','phoneFactory',phoneCtrl]);
myApp.Controllers.controller('CartCtrl',['$scope','$location','phoneFactory',CartCtrl]);
myApp.Controllers.controller('WishlistCtrl',['$scope','$location','phoneFactory',WishlistCtrl]);