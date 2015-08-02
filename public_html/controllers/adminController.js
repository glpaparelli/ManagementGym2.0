angular.module("adminModule", ["ngRoute"])
.config(function($routeProvider){
    $routeProvider.when("/login", {
        templateUrl: "views/adminLogin.html"
    });
    $routeProvider.when("/dashboard", {
        templateUrl: "views/dashboard.html"
    });
    $routeProvider.when("/createsBoardTraining", {
        templateUrl: "views/boardTraining.html"
    });
    $routeProvider.otherwise({
        templateUrl: "views/adminLogin.html"
    });
});

