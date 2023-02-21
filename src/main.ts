import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile';

import "./css/_default.scss"

new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});