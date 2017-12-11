'use strict';

/**
 * @ngdoc service
 * @name spectrometerApp.spectrData
 * @description
 * # spectrData
 * Factory in the spectrometerApp.
 */
angular.module('spectrometerApp')
  .factory('spectrData', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
