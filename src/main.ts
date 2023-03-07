import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile';
import V from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { toStringHDMS } from 'ol/coordinate'
import { transform, Projection } from 'ol/proj'
import "@amap/amap-jsapi-types";
import { fromLonLat } from 'ol/proj'
import { GeoJSON } from 'ol/format'
import geojson from './data/hd'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';


import "./css/_default.scss"

const vectorSource = new VectorSource({
  features: new GeoJSON(
    {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }
  ).readFeatures(geojson),
});


var vectorLayer = new V({
  source: vectorSource,
  style: function () {
    return new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2,
      }),
      zIndex: 997,
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)',
      })
    })
  }
})


let map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      // source: new OSM(),
      source: new XYZ({
        // 高德地图 URL
        url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        // url: 'http://127.0.0.1:5000/tiles/{z}/{x}_{y}',
        crossOrigin: null
      })
    }),
    vectorLayer,
  ],
});

map.setView(new View({
  projection: 'EPSG:3857',
  center: fromLonLat([116.3391701359779, 39.93807986046343]),
  zoom: 11.5,
  maxZoom: 18,
  minZoom: 5
}))





map.on('click', evt => {
  console.log(evt.coordinate)
  AMap.convertFrom(evt.coordinate, 'gps', function (status: any, result: any) {
    if (result.info === 'ok') {
      var lnglats = result.locations; // Array.<LngLat>
      console.log("amap: ", lnglats[0])
      let coord = { "lat": lnglats[0].lat, "lon": lnglats[0].lng }
      // let ret = gcj02towgs84(coord)
      console.log("wgs84", coord)
    } else {
      console.log(result)
    }
  });
});
