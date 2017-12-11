'use strict';

/**
 * @ngdoc function
 * @name spectrometerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spectrometerApp
 */
angular.module('spectrometerApp')
  .controller('MainCtrl', ['spectrData', function (spectrdata) {

    this.data = spectrdata.someMethod();
    console.log(this.data);
}]);
