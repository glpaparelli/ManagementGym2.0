/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("subModule", ["ngRoute"])
.config(function($routeProvider){
    $routeProvider.when("/subscribed.html", {
        templateUrl: "views/subscribed.html"
    });
    $routeProvider.otherwise({
        templateUrl: "index.html"
    }); 
});