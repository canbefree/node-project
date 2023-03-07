import React, { Component } from 'react'
type Coordinate = { lon: number, lat: number }

interface Props {
  coord1?: Coordinate,
  coord2?: Coordinate
}

export class LeftSide extends Component<Props> {
  render() {
    return (
      <div>
        <div style={{ color: "red" }}>
          说明：点击鼠标拾取瓦片范围
        </div>
        <div>矩形</div>
        <div>
          经纬度:
          <input value={this.props.coord1?.lon} ></input>
          <input value={this.props.coord1?.lat} ></input>
        </div>
        <div>
          经纬度:
          <input value={this.props.coord2?.lon} ></input>
          <input value={this.props.coord2?.lat} ></input>
        </div>
      </div>
    )
  }
}

export default LeftSide