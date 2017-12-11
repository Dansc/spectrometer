'use strict';

describe('Service: spectrData', function () {

  // load the service's module
  beforeEach(module('spectrometerApp'));

  // instantiate service
  var spectrData;
  beforeEach(inject(function (_spectrData_) {
    spectrData = _spectrData_;
  }));

  it('should do something', function () {
    expect(!!spectrData).toBe(true);
  });

});
