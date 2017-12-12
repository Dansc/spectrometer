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

    this.data = spectrdata.collection;
    this.latest_data = this.data[this.data.length -1];
    this.submit = function(d){
      console.log(d);
      spectrdata.get(d);
    };
}]);
