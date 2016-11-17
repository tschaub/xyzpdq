var merc = require('../lib/merc');

var DIGITS = 8;

var ALT_GEO = [-5.625, 52.4827802220782];
var ALT_MERC = [-626172.13571216376, 6887893.4928337997];

function expectCoord(actual, expected) {
  expect(actual).toBeInstanceOf(Array);
  expect(actual.length).toBe(2);
  expect(actual[0]).toBeCloseTo(expected[0], DIGITS);
  expect(actual[1]).toBeCloseTo(expected[1], DIGITS);
}

function expectBbox(actual, expected) {
  expect(actual).toBeInstanceOf(Array);
  expect(actual.length).toBe(4);
  expect(actual[0]).toBeCloseTo(expected[0], DIGITS);
  expect(actual[1]).toBeCloseTo(expected[1], DIGITS);
  expect(actual[2]).toBeCloseTo(expected[2], DIGITS);
  expect(actual[3]).toBeCloseTo(expected[3], DIGITS);
}

describe('forward', function() {
  it('transforms geographic to web mercator', function() {
    expectCoord(merc.forward([0, 0]), [0, 0]);
    expectCoord(merc.forward([-180, 0]), [-merc.EDGE, 0]);
    expectCoord(merc.forward([180, 0]), [merc.EDGE, 0]);
    expectCoord(merc.forward([0, 90]), [0, merc.EDGE]);
    expectCoord(merc.forward([0, -90]), [0, -merc.EDGE]);
    expectCoord(merc.forward([0, 10000]), [0, merc.EDGE]);
    expectCoord(merc.forward([0, -10000]), [0, -merc.EDGE]);
    expectCoord(merc.forward(ALT_GEO), ALT_MERC);
  });

  it('works for bboxes', function() {
    expectBbox(merc.forward([0, 0, 0, 0]), [0, 0, 0, 0]);
    expectBbox(merc.forward([-180, 0, 180, 0]), [-merc.EDGE, 0, merc.EDGE, 0]);
    expectBbox(merc.forward(ALT_GEO.concat(ALT_GEO)), ALT_MERC.concat(ALT_MERC));
  });

  it('does not modify the original', function() {
    var original = [1, 2];
    merc.forward(original);
    expect(original).toEqual([1, 2]);
  });

  it('accepts an optional output array', function() {
    var output = [];
    merc.forward([-180, 0], output);
    expectCoord(output, [-merc.EDGE, 0]);
  });
});

describe('inverse', function() {
  it('transforms web mercator to geographic', function() {
    expectCoord(merc.inverse([0, 0]), [0, 0]);
    expectCoord(merc.inverse([-merc.EDGE, 0]), [-180, 0]);
    expectCoord(merc.inverse([merc.EDGE, 0]), [180, 0]);
    expectCoord(merc.inverse(ALT_MERC), ALT_GEO);
  });

  it('works for bboxes', function() {
    expectBbox(merc.inverse([0, 0, 0, 0]), [0, 0, 0, 0]);
    expectBbox(merc.inverse([-merc.EDGE, 0, merc.EDGE, 0]), [-180, 0, 180, 0]);
    expectBbox(merc.inverse(ALT_MERC.concat(ALT_MERC)), ALT_GEO.concat(ALT_GEO));
  });

  it('does not modify the original', function() {
    var original = [1, 2];
    merc.inverse(original);
    expect(original).toEqual([1, 2]);
  });

  it('accepts an optional output array', function() {
    var output = [];
    merc.inverse([-merc.EDGE, 0], output);
    expectCoord(output, [-180, 0]);
  });
});
