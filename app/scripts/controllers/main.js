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
    this.settings = {bulb : 0,
      blueLED : 0,
      current : 0,
    gain : 4,
    tc : 255};


    $scope.data = spectrdata.result;

    this.submit = function(d){
      var settings=  {};

      settings.bulb = d.bulb ? "on" : "off";
      settings.blueLED = d.blueLED ? "on" : "off";
      settings.current = d.current;
      settings.gain = d.gain;
      settings.tc = d.tc;

      var s = "";
      for (var key in settings) {
        s += key+":"+settings[key] + ";";
      }
      console.log(s.substring(0, s.length-1));
      spectrdata.send(s);
    };
    this.submit(this.settings);

}]);
