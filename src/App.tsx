import React, { Component } from 'react'
import LeftSide from './pages/LeftSide'
import Main from './pages/Main'

import './css/app.scss'

interface State {
  count: number
};
interface Props{

}
export class App extends Component <Props,State>{
  state: State = {
    
  };
  render() {
    let coord1 = {lat:1,lon:2}
    return (
      <div className='root'>
        <div className='main'>
          <Main></Main>
        </div>
        <div className='left-side'>
          <LeftSide coord1={coord1} coord2={coord1}></LeftSide>
        </div>
      </div>
    )
  }
}


export default App