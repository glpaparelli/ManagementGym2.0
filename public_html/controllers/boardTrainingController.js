angular.module("adminModule")
.constant("boardUrl", "http://localhost:5500/scheda")
.controller("boardCtrl", function($scope, $http, $location, boardUrl){
    
    $http.get(boardUrl)
    .success(function(data){
        $scope.board = data;
    }).error(function(error){
        $scope.board.error = error;
    });
    
    $scope.uniqueNome = function(nome){
        if(!$scope.boardSelected.id){
            console.log("Nuovo");
            var exit = false;
            for(var i=0; ((i<$scope.board.length) && (exit==false));i++){
                if(nome == $scope.board[i].nome){
                    console.log("C'è già");
                    $scope.createBoard.nome.$setValidity("unique", false);
                    exit = true;
                }else{
                    console.log("Non c'è");
                    $scope.createBoard.nome.$setValidity("unique", true);
                }
            }
        }else{
            console.log("Modifica");
            var exit = false;
            for(var i=0; ((i<$scope.board.length) && (exit==false)); i++){
                if($scope.board[i].id != $scope.boardSelected.id){
                    if(nome == $scope.board[i].nome){
                        $scope.createBoard.nome.$setValidity("unique", false);
                        exit = true;
                    }else{
                        $scope.createBoard.nome.$setValidity("unique", true);
                    }
                }
            };
        }
        
    };
    
    $scope.selectBoard = function(board){
        $scope.boardSelected = board;
    };
    
    $scope.deleteBoard = function(board){
        var url = boardUrl + "/" + board.id;
        var index;
        angular.forEach($scope.board, function(value, key){
            if(value.nome == board.nome){
                index = key;
            }
        });
        
        $http.delete(url, board)
        .success(function(){
            $scope.board.splice(index, 1);
        }).error(function(error){
            $scope.board.errorDetele = error;
        });
        
    };
    
    $scope.newBoard = function(name, description){
        if(!$scope.boardSelected){
            $scope.boardSelected = {
                nome:name, 
                descrizione:description
            };
        }
        
        if(!$scope.boardSelected.id){
            $http.post(boardUrl, $scope.boardSelected)
            .success(function(data){
                $scope.board.push(data);
                $scope.boardSelected = null;
            }).error(function(error){
                $scope.board.errorCreate = error;
            });
        }else{
            var url = boardUrl + "/" + $scope.boardSelected.id;
            $http.put(url, $scope.boardSelected)
            .success(function(data){
                $scope.boardSelected = data;
                $scope.boardSelected = null;
            }).error(function(error){
                $scope.board.errorModified = error;
            });
        }
        
        
    };
        
});

