var app = angular.module('ECApp' ['ngRoute', 'ngResource']).run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';

	$rootScope.logout = function(){
    		$http.get('auth/logout');
    		$rootScope.authenticated = false;
    		$rootScope.current_user = '';
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
                });
	$locationProvider.html5Mode(true);
});	

app.controller('authController', function($scope, $http, $rootScope, $location){
	$scope.user = {firstName: '', lastName: '', email: '', password: ''};
	$scope.error_message = '';
	
	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.status == 'OK'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.FirstName + data.user.LastName;
				$location.path('/');
			}else{
				$scope.error_message = data.message;
			}
		
		});

	};

	$scope.register = function(){
                $http.post('/auth/addUser', $scope.user).success(function(data){
                        if(data.status == 'OK'){
				$rootScope.authenticated = true;
                                $rootScope.current_user = data.user.FirstName + data.user.LastName;
                                $location.path('/');
                        }else{
                                $scope.error_message = data.error;
                        }

                });

        };

	$scope.verify = function(){
		$http.post('/auth/verify', $scope.user).success(function(data){
			if(data.status == 'OK'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');	
			}else{
				$scope.error_message = data.error;
			}
		});
	};
});
