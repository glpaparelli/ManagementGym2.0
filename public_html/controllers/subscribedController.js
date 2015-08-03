/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global angular */

angular.module("newModule", [])
.constant("userUrlMe", "http://localhost:5500/abbonato/me")
.constant("userUrl", "http://localhost:5500/abbonato")
.constant("logoutUrl", "http://localhost:5500/abbonato/logout")
.controller("subbedCtrl", function($scope, $http, userUrlMe, userUrl, logoutUrl,  $location){
   
    $http.get(userUrlMe, {withCredentials:true})
    .success(function(data){
        $scope.data = data;
        $scope.abbonamenti = $scope.subscriptionExpired(); 
    }).error(function(error){
        $scope.error = error;
    });
    
    
    
    $scope.update = function(button, input, field){
        $scope.data[field] = input;
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
        
    $scope.subscriptionExpired = function(){   
        var value;
        console.log($scope.data.abbonamenti);
        if(!$scope.data.abbonamenti){
            value = true;
        }else{
            var today = new Date();
            var index = $scope.data.abbonamenti.length - 1;
            var date = new Date($scope.data.abbonamenti[index].data); 
            var durata = $scope.data.abbonamenti[index].durata;
            date.setDate(date.getDate() + parseInt(durata));

            if(date >= today){
                value = false;
            }else{
                value = true;
            }
        }
        
        return value;
    };
    
    $scope.renews = function(){
        var value = JSON.parse($scope.sub);
        console.log($scope.sub);
        var date = new Date();
        var lenght = value.lenght;
        var price = value.price;
        
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        
        var dateObject = month + "/" + day + "/" + year;
                
        var object = {
            durata:lenght,
            prezzo:price,
            data:dateObject
        };
        
        if(!$scope.data.abbonamenti){
            $scope.data.abbonamenti = [];
        }
        $scope.data.abbonamenti.push(object);
        
        $http.put(userUrl, $scope.data).
        success(function(data){
            console.log("Updated");
        }).error(function(error){
            console.log("Error");
        });
        $scope.abbonamenti = $scope.subscriptionExpired(); 
    };
    
    $scope.logout = function(){
        $http.post(logoutUrl).
            success(function(data){
                window.location = "../index.html";
            }).error(function(error){
                console.log("Error");
        });
    };
 });
