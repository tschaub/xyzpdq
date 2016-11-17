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
