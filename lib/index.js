var Lookup = require('./lookup');
var geofunc = require('geofunc');
var merc = require('./merc');

var transformCoordinates = geofunc.each('Coordinate', function(coordinate) {
  merc.forward(coordinate, coordinate);
});

function transform(geo) {
  geo = JSON.parse(JSON.stringify(geo));
  transformCoordinates(geo);
  return geo;
}

function createLookup(geo, transformed) {
  if (!transformed) {
    geo = transform(geo);
  }
  return new Lookup(geo);
}

module.exports = createLookup;
