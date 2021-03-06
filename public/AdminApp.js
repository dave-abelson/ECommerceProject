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
	$scope.item = {id: '', name: '', price: '', category: ''};
	$scope.itemQuery = {query: ''};
	$scope.userQuery = {firstName: ''};
	$scope.itemList = []; 
	$scope.userList = [];
	$scope.inventory = {id: '', quantity: ''}
	$scope.error_message = '';

	$scope.addItem = function(){
		$http.post('/admin/addItem', $scope.item).success(function(data){
			if(data.status == 'OK'){
				console.log('Item Added!')	
				$scope.item = {}
				$scope.addItemForm.$setPristine(true);
			} else {
				$scope.error_message = data.error
			}
		});
	};

	$scope.updateInventory = function(){
		$http.post('/admin/updateInventory', $scope.inventory).success(function(data){
			if(data.status == 'OK'){
				console.log('Inventory Updated!')
				$scope.inventory = {}
				$scope.updateInventoryForm.$setPristine(true)
			} else {
				$scope.error_message = data.error
			}
		});
	};

	$scope.itemSearch = function(){
		$http.post('/admin/itemSearch', $scope.itemQuery).success(function(data){
			if(data.status == 'OK'){
				console.log('Search Complete')
				$scope.itemList = data.result
				$scope.itemSearchForm.$setPristine(true);
			} else {
				$scope.error_message = data.error
			}
		});
	};	

	$scope.userSearch = function(){
                $http.post('/admin/userSearch', $scope.userQuery).success(function(data){
                        if(data.status == 'OK'){
                                console.log('Search Complete')
                                $scope.userList = data.result
				$scope.userSearchForm.$setPristine(true);
                        } else {
                                $scope.error_message = data.error
                        }
                });
        };     
});
