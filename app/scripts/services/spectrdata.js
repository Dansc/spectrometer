'use strict';

/**
 * @ngdoc service
 * @name spectrometerApp.spectrData
 * @description
 * # spectrData
 * Factory in the spectrometerApp.
 */
angular.module('spectrometerApp')
  .factory('spectrData', function ($websocket, $rootScope) {

    var dataStream = $websocket('ws://localhost:8081');

    var collection = [];
    var result = {};
    var max_length = 50;
    var rePattern = /([a-zA-Z]+)\[(\d+.\d+)\]/g;
    dataStream.onMessage(function(message) {
      var data = JSON.parse(message.data);
      var match;
      data.replace(rePattern, function(match, g1, g2) {
        result[g1] = g2;
         });
        result['tempC'] = 5*(result.tempF-32)/9;
        result.tempC = result.tempC.toFixed(1);
        collection.push(result);
        if (collection.length > max_length){
          collection.splice(0, 1);
        };
      });

    // Public API here
    var methods = {
         collection: collection,
         result: result,
         send: function(d) {
           dataStream.send(d);
         }
       };

      return methods;
  });
