var Lookup = require('./lookup');

function transform(geo) {
  return geo;
}

function createLookup(geo, transformed) {
  if (!transformed) {
    geo = transform(geo);
  }
  return new Lookup(geo);
}

module.exports = createLookup;
