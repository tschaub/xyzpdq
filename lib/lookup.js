var bitgeo = require('bitgeo');
var merc = require('./merc');
var xyz = require('./xyz');

function Lookup(geo) {
  this._geo = geo;
  this._bitsByZ = {};
}

Lookup.prototype.intersects = function(x, y, z) {
  var bits = this._getBits(z);
  return bits.get(x, Math.pow(2, z) - 1 - y);
};

Lookup.prototype.contains = function(minX, minY, maxX, maxY, z) {
  var bits = this._getBits(z);
  return bits.contains(minX, minY, maxX, maxY);
};

Lookup.prototype.containsBbox = function(bbox, z) {
  var resolution = xyz.SIZE * xyz.getResolution(z);
  var minX = Math.floor((bbox[0] + merc.EDGE) / resolution);
  var minY = Math.floor((bbox[1] + merc.EDGE) / resolution);
  var maxX = Math.floor((bbox[2] + merc.EDGE) / resolution);
  var maxY = Math.floor((bbox[3] + merc.EDGE) / resolution);
  return this.contains(minX, minY, maxX, maxY, z);
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

exports = module.exports = Lookup;
exports.NONE = bitgeo.NONE;
exports.SOME = bitgeo.SOME;
exports.ALL = bitgeo.ALL;
