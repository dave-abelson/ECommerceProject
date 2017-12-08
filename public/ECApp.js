var app = angular.module('ECApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http) {
	$rootScope.authenticated = false;
	$rootScope.current_user = {};
	$rootScope.totalPrice = 0

	$rootScope.logout = function(){
    		$http.get('auth/logout');
    		$rootScope.authenticated = false;
    		$rootScope.current_user = {};
	};	
});

app.config(function($routeProvider, $locationProvider){
	$routeProvider

		.when('/',{
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		.when('/login',{
                        templateUrl: 'login.html',
                        controller: 'authController'
                })
		.when('/addUser',{
                        templateUrl: 'addUser.html',
                        controller: 'authController'
                })
		.when('/shoppingCart',{
			templateUrl: 'shoppingCart.html',
			controller: 'shopController'
		})
		.when('/checkout',{
			templateUrl: 'checkout.html',
			controller: 'checkoutController'
		});
	$locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $http, $rootScope, $location){
	$scope.error_message = '';
	$scope.item = {id: '', name: '', price: '', category: '', quantity: ''};
        $scope.itemQuery = {query: ''};
	$scope.itemList = [];	

	
	$scope.itemSearch = function(){
                $http.post('/api/itemSearch', $scope.itemQuery).success(function(data){
                        if(data.status == 'OK'){
                                console.log('Search Complete')
                                $scope.itemList = data.result
                        } else {
                                $scope.error_message = data.error
                        }
                });
        };
	
	$scope.addToShoppingCart = function(item){
		$http.post('/api/addToShoppingCart', {item: item, user: $rootScope.current_user}).success(function(data){
			if(data.status == 'OK'){
				console.log('Added Item To Shopping Cart')
			} else {
				$scope.error_message = data.error
			}
		});	
	};
	
});	

app.controller('checkoutController', function($scope, $http, $rootScope, $location, $timeout){
	$scope.error_message = '';
        $scope.shoppingCart = []
	$scope.payment = {firstName: '', lastName: '', email: '', type: '', cardNumber: '', cvv: '', expirationDate: '', billingAddress: ''}	
	$scope.shipping = {type: '', address: ''}

	$scope.checkout = function(){
		$http.post('/api/checkout', {user: $rootScope.current_user, payment: $scope.payment, shipping: $scope.shipping, totalPrice: $rootScope.totalPrice}).success(function(data){
			if(data.status == 'OK'){
				console.log('Checkout Complete!')
				$timeout(function(){
                                        window.alert("Checkout Complete!");
                                });
				$location.path('/');			
			} else {
				$scope.error_message = data.error
			}	
		})
	}
});

app.controller('shopController', function($scope, $http, $rootScope, $location){
	$scope.error_message = '';
	$scope.shoppingCart = []
	$scope.quantityList = []
	var result = []
	$scope.displayShoppingCart = function(){
		$rootScope.totalPrice = 0
		$http.post('/api/displayShoppingCart', {user: $rootScope.current_user}).success(function(data){
			if(data.status == 'OK'){
				console.log('Displayed Shopping Cart Items')		
				for(var i=0; i < data.result.length; i++){
					$rootScope.totalPrice += data.result[i].price * data.result[i].ItemQuantity
				}
				$scope.shoppingCart = data.result
			} else {
				$scope.error_message = data.error
			}
		});
	}

	$scope.incrementQuantity = function(id){
		$http.post('/api/incrementSCItem', {user: $rootScope.current_user, itemID: id}).success(function(data){
			if(data.status == 'OK'){
				for(var i=0; i < $scope.shoppingCart.length; i++){
					if(id == $scope.shoppingCart[i].ID){
						$scope.shoppingCart[i].ItemQuantity = $scope.shoppingCart[i].ItemQuantity + 1
						$rootScope.totalPrice = $rootScope.totalPrice + $scope.shoppingCart[i].price
					}
				}
                        } else {
                                $scope.error_message = data.error
                        }

		});
	}

	$scope.decrementQuantity = function(id){
		$http.post('/api/decrementSCItem', {user: $rootScope.current_user, itemID: id}).success(function(data){
                        if(data.status == 'OK'){
                                for(var i=0; i < $scope.shoppingCart.length; i++){
                                        if(id == $scope.shoppingCart[i].ID){
						if($scope.shoppingCart[i].ItemQuantity > 1){
                                                	$scope.shoppingCart[i].ItemQuantity = $scope.shoppingCart[i].ItemQuantity - 1
							$rootScope.totalPrice = $rootScope.totalPrice - $scope.shoppingCart[i].price
						} else {
							$rootScope.totalPrice = $rootScope.totalPrice - $scope.shoppingCart[i].price
							$scope.shoppingCart.splice(i, 1);
						}
                                        }
                                }
                        } else {
                                $scope.error_message = data.error
                        }

                });
	}
	
	$scope.go = function ( path ) {
                $location.path( path );
        };

	$scope.displayShoppingCart()
});

app.controller('authController', function($scope, $http, $rootScope, $location, $timeout){
	$scope.user = {firstName: '', lastName: '', email: '', password: ''};
	$scope.error_message = '';
	
	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.status == 'OK'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user;
				$location.path('/');
			}else{
				$scope.error_message = data.message;
				$timeout(function(){
                                        window.alert("User doesn\'t exist");
                                });
			}
		
		});

	};

	$scope.register = function(){
                $http.post('/auth/addUser', $scope.user).success(function(data){
                        if(data.status == 'OK'){
				$rootScope.authenticated = true;
                                $rootScope.current_user = data.user;
                                $location.path('/login');
                        }else{
                                $scope.error_message = data.error;
				$timeout(function(){
					window.alert("Email already exists");
				});
                        }

                });

        };

});
