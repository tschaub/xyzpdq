var bitgeo = require('bitgeo');
var merc = require('./merc');
var xyz = require('./xyz');

function Lookup(geo) {
  this._geo = geo;
  this._bitsByZ = {};
}

Lookup.prototype.intersectsCoord = function(x, y, z) {
  var bits = this._getBits(z);
  return bits.get(x, Math.pow(2, z) - 1 - y);
};

Lookup.prototype._getBits = function(z) {
  if (!(z in this._bitsByZ)) {
    this._cacheBits(z);
  }
  return this._bitsByZ[z];
};

Lookup.prototype._cacheBits = function(z) {
  this._bitsByZ[z] = bitgeo(this._geo, {
    resolution: xyz.SIZE * xyz.getResolution(z),
    origin: [-merc.EDGE, -merc.EDGE]
  });
};

module.exports = Lookup;
