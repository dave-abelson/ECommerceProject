var app = angular.module('AdminApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
        $rootScope.current_user = '';
        
});

app.config(function($routeProvider, $locationProvider){
        $routeProvider

                .when('/admin',{
                        templateUrl: 'adminMain.html',
                        controller: 'inventoryController'
                })
        $locationProvider.html5Mode(true);
});

app.controller('inventoryController', function($scope, $http, $rootScope){
	$scope.item = {name: '', price: '', category: ''};
	$scope.query = {name: ''};
	$scope.itemList = []; 
	$scope.error_message = '';

	$scope.addItem = function(){
		$http.post('/admin/addItem', $scope.item).success(function(data){
			if(data.status == 'OK'){
				console.log('Item Added!')	
			} else {
				$scope.error_message = data.error
			}
		});
	};

	$scope.itemSearch = function(){
		$http.post('/admin/itemSearch', $scope.query).success(function(data){
			if(data.status == 'OK'){
				console.log('Search Complete')
				$scope.itemList = data.result
			} else {
				$scope.error_message = data.error
			}
		});
	};	
});
