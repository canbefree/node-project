import React, { Component } from 'react'
import LeftSide from './pages/LeftSide'
import Main from './pages/Main'
import './css/app.scss'
import { Coordinate } from './common/declared'


type Props = {
}
type State = {
  n: number,
  coord1?: Coordinate,
  coord2?: Coordinate
}

let co: Coordinate = { lon: 12, lat: 13 }

export class App extends Component<Props, State>{
  componentDidMount(): void {
    console.log("???????!!!!!")
  }
  state: State = {
    n: 3,
    coord1: co
  }


  render() {
    return (
      <div className='root'>
        <div className='main'>
          <Main setPoint={this.setCoord}></Main>
        </div>
        <div className='left-side'>
          <LeftSide coord1={this.state.coord1} coord2={this.state.coord2}></LeftSide>
        </div>
      </div>
    )
  }
  setCoord = (coord: Coordinate): any => {
    this.setState(prestate => {
      let i = prestate.n + 1
      let state:State = {n:i}
      if (i % 2 == 0) {
        state.coord1 = coord
        state.coord2 = {lat:0,lon:0}
      }else{
        state.coord1 = prestate.coord1
        state.coord2 = coord
      }

      this.setState(state)
    }
    )
    console.log(this.state)
  }
}


export default App