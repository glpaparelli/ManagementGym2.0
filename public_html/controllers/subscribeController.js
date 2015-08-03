/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global angular */

angular.module("subModule")
.constant("userSubUrl", "http://localhost:5500/abbonato")
.controller("subscribeCtrl", function($scope, $http, userSubUrl, $location){
     
       $http.get(userSubUrl)
            .success(function(data){
                $scope.users = data;
            })
            .error (function(error){
                $scope.error = error;
        });
     
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
            window.location = "index.html";
        }).
        error(function(error) {
            $scope.error = error;
        });
        
        
       $scope.mostra = function(){
            console.log("mostra");
       };
        
        
        $scope.setValidity = function(element){
        console.log("soso");
        var exit = false;
        for(var i=0; (i<$scope.users.length) && (exit==false);i++){
            if(element == $scope.users[i].username){
                console.log("=");
                $scope.subscribe.username.$setValidity("unique", false);
                exit = true;
            }else{
                console.log("!=");
                $scope.subscribe.username.$setValidity("unique", true);
            }
        }
    };
    
    };
});