/* global angular */

angular.module("adminModule")
.constant("adminLoginUrl", "http://localhost:5500/amministratore/login")
.controller("loginCtrl", function($scope, $http, adminLoginUrl, $location){
     
    $scope.logIn = function(user, pass){
        $http.post(adminLoginUrl, {
            username: user,
            password: pass
        }, {
            withCredentials: true
        }).success(function (data) {
            $location.path("/dashboard");
        }).error(function (error) {
            $scope.authenticationError = error;
        });
    }; 
        
});
