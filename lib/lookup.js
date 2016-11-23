var bitgeo = require('bitgeo');
var merc = require('./merc');
var xyz = require('./xyz');

var relationships = {
  OUTSIDE: 'outside',
  INSIDE: 'inside',
  OVERLAPPING: 'overlapping'
};

function Lookup(geo) {
  this._geo = geo;
  this._bitsByZ = {};
}

Lookup.prototype.intersects = function(x, y, z) {
  var bits = this._getBits(z);
  return bits.get(x, Math.pow(2, z) - 1 - y);
};

Lookup.prototype.relate = function(bbox, z) {
  var minX = bbox[0];
  var minY = bbox[1];
  var maxX = bbox[2];
  var maxY = bbox[3];
  var relationship;
  var bits = this._getBits(z);
  var top = Math.pow(2, z) - 1;
  bits.forEachRange(function(minI, maxI, j) {
    var more = true;
    var y = top - j;
    switch (relationship) {
      case undefined: {
        // first time through
        if (y < minY || y > maxY) {
          // above or below
          relationship = relationships.OUTSIDE;
        } else if (maxI < minX) {
          // left
          relationship = relationships.OUTSIDE;
        } else if (minI > maxX) {
          // right
          relationship = relationships.OUTSIDE;
        } else if (minI >= minX && maxI <= maxX) {
          relationship = relationships.INSIDE;
        } else {
          relationship = relationships.OVERLAPPING;
          more = false;
        }
        break;
      }
      case relationships.OUTSIDE: {
        // check if range is inside or overlapping
        if (y >= minY && y <= maxY && (minI >= minX && minI <= maxX || maxI >= minX && maxI <= maxX)) {
          relationship = relationships.OVERLAPPING;
          more = false;
        }
        break;
      }
      case relationships.INSIDE: {
        // check if range is outside or overlapping
        if (y < minY || y > maxY) {
          relationship = relationships.OVERLAPPING;
          more = false;
        } else if (minI >= minX && minI <= maxX || maxI >= minX && maxI <= maxX) {
          relationship = relationships.OVERLAPPING;
          more = false;
        }
        break;
      }
      default: {
        // pass
      }
    }
    return more;
  });
  return relationship;
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
