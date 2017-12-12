'use strict';

/**
 * @ngdoc directive
 * @name spectrometerApp.directive:barsChart
 * @description
 * # barsChart
 */
angular.module('spectrometerApp')
  .directive('barsChart', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the barsChart directive');
      }
    };
  });
