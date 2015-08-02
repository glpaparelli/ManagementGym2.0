angular.module("adminModule")
.constant("subscribersUrl", "http://localhost:5500/abbonato")
.constant("boardUrl", "http://localhost:5500/scheda")
.controller("adminCtrl", function($scope, $http, $location, subscribersUrl, boardUrl){
        
    $scope.subscriberSelected;
       
    $http.get(subscribersUrl)
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
    
    $scope.selectSubscriber = function(subscriber){
        $scope.subscriberSelected = subscriber;
    };
    
    $scope.deleteSubscriber = function(subscriber){//da riguardare
        var url = userUrl + "/" + subscriber.id;
        var index;
        angular.forEach($scope.subscribers, function(value, key){
            if(subscriber == value){
                index = key;
            }
        });
        
        $http.delete(url, subscriber)
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
    
    $scope.uniqueUsername = function(){
        var exit = false;
        for(var i=0; ((i<$scope.subscribers.length) && (exit==false));i++){
            if($scope.subscriberSelected.id != $scope.subscribers[i].id){
                if($scope.subscriberSelected.username == $scope.subscribers[i].username){
                    $scope.button = false;
                    $scope.modifiedFields.nome.$setValidity("unique", false);
                    exit = true;
                }else{
                    $scope.button = true;
                    $scope.modifiedFields.nome.$setValidity("unique", true);
                }
            }
        }
    };
    
    $scope.update = function(){
        var url = subscribersUrl + "/" + $scope.subscriberSelected.id;
        
        $http.put(url, $scope.subscriberSelected)
        .success(function(data){
            $scope.subscriberSelected = data;
            $scope.subscriberSelected = null;
        }).error(function(error){
            $scope.subscribers.errorUpdate = error;
        });
    };
});

