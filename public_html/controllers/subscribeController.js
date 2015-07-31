/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("urlSubscribed")
.constant("userUrl", "http://localhost:5500/abbonato/login")
.controller("subscribeCtrl", function($scope, $http, userUrl, $location){
     
    $scope.subscription = function(){
        console.log("ehi!");
        var sub = {
            username:$scope.subscribe.username,
            password:$scope.subscribe.password,
            age:$scope.subscribe.age,
            mail: $scope.subscribe.mail,
            weight:$scope.subscribe.weight,
            height:$scope.subscribe.height
        };
                
        $http.post(userUrl, sub).
        success(function(data) {
            console.log("Si");
            $location.path("/subscribed.html");
        }).
        error(function(error) {
            $scope.error = error;
        });
    };
    
    
});
