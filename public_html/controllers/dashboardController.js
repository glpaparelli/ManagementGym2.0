angular.module("adminModule")
.constant("userUrl", "http://localhost:5500/abbonato")
.constant("boardUrl", "http://localhost:5500/scheda")
.controller("adminCtrl", function($scope, $http, $location, userUrl, boardUrl, $rootScope){
    
    console.log($location.path());
    if($location.path() == "/dashboard"){
        console.log("SI");
    }
    
    $rootScope.showSettings = true;
    
    $scope.userSelected;
       
    $http.get(userUrl)
    .success(function(data){
        $scope.subscribers = data;
    }).error(function(error){
        $scope.subscribers.error = error;
    });
    
    $http.get(boardUrl)
    .success(function(data){
        $scope.board = data;
    }).error(function(error){
        $scope.board.error = error;
    });
    
    $scope.selectUser = function(user){
        $scope.userSelected = user;
    };
    
    $scope.deleteUser = function(user){//da riguardare
        var url = userUrl + "/" + user.id;
        var index;
        angular.forEach($scope.subscribers, function(value, key){
            if(user == value){
                index = key;
            }
        });
        
        $http.delete(url, user)
        .success(function(){
            $scope.subscribers.splice(index, 1);
        }).error(function(error){
            $scope.subscribers.errorDetele = error;
        });
    };
    
    $scope.showButton = function(){
        $scope.button = true;
    };
    
    $scope.selectDuration = function(duration){
        $scope.durationSelected = duration;
    };
    
    $scope.uniqueUsername = function(username){
        var exit = false;
        for(var i=0; ((i<$scope.subscribers.length) && (exit==false));i++){
            if(username == $scope.subscribers[i].username){
                $scope.button = true;
                $scope.showMessage = true;
                exit = true;
            }else{
                $scope.button = false;
                $scope.showMessage = false;
            }
        }
    };
    
    $scope.logout = function(){
        console.log("Logout");
    };
    
});

