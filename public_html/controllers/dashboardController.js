angular.module("adminModule")
.constant("userUrl", "http://localhost:5500/abbonato")
.constant("boardUrl", "http://localhost:5500/scheda")
.controller("adminCtrl", function($scope, $http, $location, userUrl, boardUrl){
    
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
    
    $scope.deleteUser = function(user){
        var url = userUrl + "/" + user.id;
        var index;
        angular.forEach($scope.subscribers.data, function(value, key){
            if(user == value){
                index = key;
            }
        });
        $http.delete(url, user)
        .success(function(){
            $scope.users.splice(index, 1);
        }).error(function(error){
            $scope.subscribers.errorDetele = error;
        });
    };
    
    $scope.showButton = function(button){
        $scope.button = true;
    };
    
    $scope.selectDuration = function(duration){
        $scope.durationSelected = duration;
    };
});

