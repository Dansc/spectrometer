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
    $scope.data = spectrdata.result;

    this.submit = function(d){
      spectrdata.send(d);
    };

    this.getData = function(){
      return spectrdata.result;
    };
}]);
