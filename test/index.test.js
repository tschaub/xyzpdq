const Lookup = require('../lib/lookup');
const xyzpdq = require('../lib');

describe('xyzpdq()', () => {
  it('creates a new lookup', () => {
    const lookup = xyzpdq({
      type: 'Point',
      coordinates: [0, 0]
    });
    expect(lookup).toBeInstanceOf(Lookup);
  });
});

describe('containsBbox()', () => {
  it('determines if a bbox is outside', () => {
    const lookup = xyzpdq({
      type: 'Point',
      coordinates: [0, 0]
    });
    expect(lookup.containsBbox([-180, 45, -90, 90], 2)).toEqual(xyzpdq.NONE);
  });

  it('determines if a bbox partially filled', () => {
    const lookup = xyzpdq({
      type: 'Point',
      coordinates: [0, 0]
    });
    expect(lookup.containsBbox([-180, -90, 180, 90], 2)).toEqual(xyzpdq.SOME);
  });

  it('determines if a bbox completely filled', () => {
    const lookup = xyzpdq({
      type: 'Polygon',
      coordinates: [
        [
          [-180, -90],
          [180, -90],
          [180, 90],
          [-180, 90],
          [-180, -90]
        ]
      ]
    });
    expect(lookup.containsBbox([-10, -10, 10, 10], 2)).toEqual(xyzpdq.ALL);
  });
});
