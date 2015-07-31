/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global angular */

angular.module("urlSubscribed")
.constant("userLoginUrl", "http://localhost:5500/abbonato/login")
.controller("loginCtrl", function($scope, $http, userLoginUrl, $location){
    
    $scope.logIn = function(){
        $http.post(userLoginUrl, {
            username: $scope.login.username,
            password: $scope.login.password
        }, {
            withCredentials: true
        }).success(function (data) {
            $location.path("/subscribed.html");
        }).error(function (error) {
            $scope.error = error;
        });
    }; 
   
});


