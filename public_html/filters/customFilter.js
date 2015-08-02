angular.module("adminModule")
.filter("subscriptionDuration", function () {
    return function (value, lenght) {
        lenght = parseInt(lenght);
        if (angular.isArray(value) && value && lenght) {
            var results = [];
            var today = new Date();
            
            angular.forEach(value, function(data, key){
                if(data.abbonamenti){
                    var index = data.abbonamenti.length-1;
                    var expirationDate = new Date(data.abbonamenti[index].data);
                    var duration = data.abbonamenti[index].durata;  
                    expirationDate.setDate(expirationDate.getDate() + parseInt(duration));
                    
                    if(expirationDate > today){
                        if(data.abbonamenti[index].durata == lenght){
                            results.push(data);
                        }
                    }
                }
                
            });
            return results;
        } else {
            return value;
        }
    };
}).filter("uniqueDuration", function(){
    return function(value){
        if(angular.isArray(value)){
            var results = [];
            
            angular.forEach(value, function(subscriber, key){
                if(subscriber.abbonamenti){
                    angular.forEach(subscriber.abbonamenti, function(subscription, key){
                        if(results.length == 0){
                            results.push(subscription.durata);
                        }
                        var added = false;
                        for(var i=0; i<results.length; i++){
                            if(results[i] == subscription.durata){
                                added = true;
                            }
                        }
                        if(!added){
                            results.push(subscription.durata);
                        }
                    });
                }
            });
            
            return results;
        }else{
            return value;
        }
    };
});