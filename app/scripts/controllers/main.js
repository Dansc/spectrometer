'use strict';

/**
 * @ngdoc function
 * @name spectrometerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spectrometerApp
 */
angular.module('spectrometerApp')
  .controller('MainCtrl', ['$scope', 'spectrData', function ($scope, spectrdata) {

    var vm = this;

    $scope.channels = {
      'R' : 610,
      'S' : 680,
      'T' : 730,
      'U' : 760,
      'V' : 810,
      'W' : 860
    };

    $scope.data = spectrdata.result;
    this.submit = function(d){
      spectrdata.send(d);
    };


}]);
