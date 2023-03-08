import React, { Component } from 'react'
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { fromLonLat, toLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';

import Feature from 'ol/Feature';

import { Geometry, Polygon,Circle } from 'ol/geom'
import { Coordinate } from '../common/declared'
import { GeoJSON } from 'ol/format'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';


import geojson from '../data/hd'


type State = {}
type Props = {
  setPoint: (coord: Coordinate) => void
}
type MapI = {
  setView: any
  on: (x: any, y: (s: any) => any) => {}
  addLayer: (T: any) => {}
}

const geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857',
    },
  },
  'features': [],
};

export class Main extends Component<Props, State>{
  map?: MapI
  state: State = {}
  render() {
    return (
      <div id='map'></div>
    )
  }



  draw = () => {
    let convertedCoords:any[]= [[116.285867, 39.9857639], [116.45945302694312, 39.985763994925776], [116.45945302694312, 39.891308360359034], [116.28586785960313, 39.891308360359034]]
    var rect = new Polygon(convertedCoords);
    const vectorSource = new VectorSource({
      features: new GeoJSON(
        {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        }
      ).readFeatures(geojson),
    });

    vectorSource.addFeature(new Feature(rect))


    var vectorLayer = new Vector({
      source: vectorSource,
      style: function () {
        return new Style({
          stroke: new Stroke({
            color: 'red',
            width: 9,
          }),
          zIndex: 997,
          fill: new Fill({
            color: 'rgba(255,0,0,0.2)',
          })
        })
      }
    })
    this.map?.addLayer(vectorLayer)
  }

  componentDidMount(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
          // source: new XYZ({
          //   // 高德地图 URL
          //   // url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
          //   // url: 'http://127.0.0.1:5000/tiles/{z}/{x}_{y}',
          //   crossOrigin: null
          // })
        }),
      ],
    });

    this.map?.setView(new View({
      projection: 'EPSG:3857',
      center: fromLonLat([116.3391701359779, 39.93807986046343]),
      zoom: 11.5,
      maxZoom: 18,
      minZoom: 5
    }))

    this.map?.on('click', evt => {
      let coord = toLonLat(evt.coordinate)
      this.props.setPoint({ "lon": coord[0], "lat": coord[1] })
    });

    this.draw()
  }

}




export default Main