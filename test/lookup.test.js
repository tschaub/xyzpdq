const Lookup = require('../lib/lookup');

describe('Lookup', () => {
  describe('constructor', () => {
    it('creates a new lookup', () => {
      const lookup = new Lookup({
        type: 'Point',
        coordinates: [0, 0]
      });
      expect(lookup).toBeInstanceOf(Lookup);
    });
  });

  describe('#intersects()', () => {
    it('returns true for a tile coord hit', () => {
      const lookup = new Lookup({
        type: 'Point',
        coordinates: [0, 0]
      });
      expect(lookup.intersects(0, 0, 0)).toBe(true);
    });

    it('returns false for a tile coord miss', () => {
      const lookup = new Lookup({
        type: 'Point',
        coordinates: [0, 0]
      });
      expect(lookup.intersects(0, 1, 0)).toBe(false);
    });
  });
});
