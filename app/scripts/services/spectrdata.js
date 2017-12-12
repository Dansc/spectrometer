'use strict';

/**
 * @ngdoc service
 * @name spectrometerApp.spectrData
 * @description
 * # spectrData
 * Factory in the spectrometerApp.
 */
angular.module('spectrometerApp')
  .factory('spectrData', function ($websocket) {

    var dataStream = $websocket('ws://localhost:8081');

    var collection = [];
    var max_length = 50;
    var rePattern = /([a-zA-Z]+)\[(\d+.\d+)\]/g;
    dataStream.onMessage(function(message) {
      var data = JSON.parse(message.data);
      var match;
      var result = {}
      data.replace(rePattern, function(match, g1, g2) {
        result[g1] = g2;
         });
         console.log(result);
      // while(match = rePattern.exec(data)){
      //   console.log(match[1]);
      // };

      //  console.log("Found", match[1], "at", match.index);


        collection.push(JSON.parse(message.data));
        if (collection.length > max_length){
          collection.splice(0, 1);
        };
      });

    // Public API here
    var methods = {
         collection: collection,
         get: function(d) {
           dataStream.send(d);
           //dataStream.send(JSON.stringify({ action: 'get' }));
         }
       };

      return methods;
  });
