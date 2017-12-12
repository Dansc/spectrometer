'use strict';

describe('Directive: barsChart', function () {

  // load the directive's module
  beforeEach(module('spectrometerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bars-chart></bars-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the barsChart directive');
  }));
});