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
}).controller("secondoCtrl", function($scope, $location, $http){
    
    $scope.location = $location;
    $scope.logout = function(){
        console.log("Logout");
        $http.get("http://localhost:5500/amministratore/me")
        .success(function(data){
            $http.post("http://localhost:5500/amministratore/logout")
            .success(function(){
                $location.path("");
            }).error(function(){
                $scope.error.logout = "Errore nel logout";
            });
        }).error(function(error){
            $scope.error.me = error;
        });
    };
    $scope.changeToBoard = function(){
        $location.path("/createsBoardTraining");
    };
    $scope.changeToDashboard = function(){
        $location.path("/dashboard");
    };
    
});


