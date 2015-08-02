angular.module("adminModule")
.constant("boardUrl", "http://localhost:5500/scheda")
.controller("boardCtrl", function($scope, $http, $location, userUrl, boardUrl){
    
    $http.get(boardUrl)
    .success(function(data){
        $scope.board = data;
    }).error(function(error){
        $scope.board.error = error;
    });
    
    $scope.uniqueNome = function(nome){
        var exit = false;
        for(var i=0; ((i<$scope.board.length) && (exit==false));i++){
            if(nome == $scope.board[i].nome){
                $scope.createBoard.nome.$setValidity("unique", false);
                exit = true;
            }else{
                $scope.createBoard.nome.$setValidity("unique", true);
            }
        }
    };
    
    $scope.selectBoard = function(board){
        $scope.boardSelected = board;
        $scope.showModifiedBoard = true;
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
            $scope.uniqueNome(board.nome);
        }).error(function(error){
            $scope.board.errorDetele = error;
        });
        
    };
    
    $scope.newBoard = function(name, description){
        
        var board = {
            nome : name,
            descrizione : description
        };
        
        $http.post(boardUrl, board)
        .success(function(data){
            $scope.board.push(data);
            $scope.emptyForm();
        }).error(function(error){
            $scope.board.createBoardError = error;
        });
        $scope.showCreateBoard = false;
    };
    
    $scope.modified = function(){
        var url = boardUrl + "/" + $scope.boardSelected.id;
        
        $http.put(url, $scope.boardSelected)
        .success(function(data){
            angular.forEach($scope.board, function(value, key){
                if(value.id == $scope.boardSelected.id){
                    value = $scope.boardSelected;
                }
            });
            $scope.boardSelected = null;
            $scope.showModifiedBoard = false;
        }).error(function(error){
            $scope.board.errorModified = error;
        });
        
    };
    
    $scope.uniqueNomeModified = function(){
        
    };
    
});

