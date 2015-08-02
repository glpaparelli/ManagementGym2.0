/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global angular */

angular.module("urlSubscribe")
.constant("userSubUrl", "http://localhost:5500/abbonato")
.controller("subscribeCtrl", function($scope, $http, userSubUrl, $location){
     
    $scope.subscription = function(){
        console.log("ehi!");
        var newSub = {
            username:$scope.subscribed.username,
            password:$scope.subscribed.password,
            eta:$scope.subscribed.age,
            mail: $scope.subscribed.mail,
            peso:$scope.subscribed.weight,
            altezza:$scope.subscribed.height
        };
                
        $http.post(userSubUrl, newSub).
        success(function(data) {
            console.log("Si");
            window.location = "views/subscribed.html";
        }).
        error(function(error) {
            $scope.error = error;
        });
    };
});