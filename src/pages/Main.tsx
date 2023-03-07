import React, { Component } from 'react'
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM';

export class Main extends Component {
  render() {
    return (
      <div id='map'></div>
    )
  }

  componentDidMount(): void {
    let map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source:new OSM()
          // source: new XYZ({
          //   // 高德地图 URL
          //   url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
          //   // url: 'http://127.0.0.1:5000/tiles/{z}/{x}_{y}',
          //   crossOrigin: null
          // })
        }),
      ],
    });

    map.setView(new View({
      projection: 'EPSG:3857',
      center: fromLonLat([116.3391701359779, 39.93807986046343]),
      zoom: 11.5,
      maxZoom: 18,
      minZoom: 5
    })),

    map.on('click', evt => {
      console.log(evt.coordinate)
      AMap.convertFrom(evt.coordinate, 'gps', function (status: any, result: any) {
        if (result.info === 'ok') {
          var lnglats = result.locations; // Array.<LngLat>
          let coord = { "lat": lnglats[0].lat, "lon": lnglats[0].lng }
        } else {
          console.log(result)
        }
      });
    });
  }


}




export default Main