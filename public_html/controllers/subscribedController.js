/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("subModule")
.factory('getData', getData)
.constant("userUrlMe", "http://localhost:5500/abbonato/me")
.constant("userUrl", "http://localhost:5500/abbonato")
.constant("logoutUrl", "http://localhost:5500/abbonato/logout")
.controller("subscribedCtrl", function($scope, $http, userUrlMe, userUrl, logoutUrl, getData, $location){
    
    var promise = getData()
    .then(function(num) {
        $scope.data = num;
        $scope.abbonamento = $scope.abbonamentoScaduto();      
    }, function(reason){
        console.log("Errore");
    }).finally(function(num) {
        console.log("Finito");
    });
    
    
    $scope.aggiorna = function(button, input, campo){
        $scope.data[campo] = input;
        $http.put(userUrl, $scope.data)
            .success(function(data){
                $scope.data = data;
                if(button == "button2"){
                    $scope.button2 = false;
                }
                if(button == "button1"){
                    $scope.button1 = false;
                }
                
            }).error(function(error){
                $scope.error = error;
        });
    };
        
    $scope.abbonamentoScaduto = function(){   
        var value;
        if($scope.data.subscription.length == 0){
            value = true;
        }else{
            var today = new Date();
            var index = $scope.data.subscription.length - 1;
            var date = new Date($scope.data.subscription[index].date); 
            var durata = $scope.data.subscription[index].lenght;
            date.setDate(date.getDate() + parseInt(durata));

            if(date >= today){
                value = false;
            }else{;
                value = true;
            }
        }
        return value;
    };
    
    $scope.rinnova = function(){
        var value = JSON.parse($scope.sub);
        var date = new Date();
        var lenght = value.lenght;
        var price = value.price;
        
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        
        var dateOggetto = month + "/" + day + "/" + year;
                
        var oggetto = {
            lenght:lenght,
            price:price,
            date:dateOggetto
        };
        
        $scope.data.subscription.push(oggetto);
        
        $http.put(userUrl, $scope.data).
                success(function(data){
                    console.log("Aggiornato");
        }).error(function(error){
            console.log("Error");
        });
        $scope.abbonamentoScaduto();
    };
    
    $scope.logout = function(){
        $http.post(logoutUrl).
            success(function(data){
                window.location = "index.html";
            }).error(function(error){
                console.log("ERRORE");
        });
    };
    
});
    function getData($timeout, $q, $http) {
        return function() {
          return $q(function(resolve, reject) {
            $http.get("http://localhost:5500/users/me", {withCredentials:true}).
              success(function(data){
                  resolve(data);
            }).error(function(error){
                  reject(error);
            });
          });
        };
}   

