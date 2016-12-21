# `xyzpdq`

XYZ lookup that is pretty dang quick.

## Usage

Install it:

```
npm install xyzpdq --save
```

Check if an XYZ tile coordinate is in Canada:

```js
var xyzpdq = require('xyzpdq');

// Assuming `canada` is GeoJSON representing Canada
var lookup = xyzpdq(canada);

// Check if tile coordinate x: 88, y: 175, z: 9 is in Canada
lookup.intersects(88, 175, 9); // true

// Check if tile coordinate x: 88, y: 176, z: 9 is in Canada
lookup.intersects(88, 176, 9); // false
```

The `xyzpdq` function takes any [GeoJSON object](http://geojson.org/) and returns an object with a `intersects` method that can be used to determine if an x, y, z tile coordinate intersects the provided GeoJSON.
