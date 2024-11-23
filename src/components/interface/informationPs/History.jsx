import React from 'react'
import ReactPlayer from 'react-player'
import Ps2 from './ps2/Ps2'
import Ps3 from './ps3/Ps3'
import Ps4 from './ps4/Ps4'
import Ps5 from './ps5/Ps5'
import Footer from '../footer/Footer'

import ps1 from "../../../images/ps1Img.jpg"
import "./history.css"

const History = () => {
  return (
    <div>
        <div style={{textAlign:"center",margin:"10px"}}>
            <h2 style={{color:"#2196f3"}}>
                The Whole History of PlayStation
            </h2>
        </div>
        <hr/>
          <h2
              style={{
                textAlign:"center",
                color:"#2196f3"
              }}
            >
            PlayStation 1
          </h2>
          <hr/>
        <div  className='img-text'>
            <div>
                <img
                  src={ps1}
                  style={{
                    width:"390px",
                    height:"300px",
                    borderRadius:"50px",
                    boxShadow:"5px 5px 30px 1px #2196f3"
                  }}
                  />
            </div>
            <div>
                  <p style={{color:"#2196f3", fontWeight:"bold"}}>It was released in Japan on 3 December 1994, in North America on 9 September 1995,<br/>
                    in Europe on 29 September 1995, and in Australia on 15 November 1995.
                  </p>
            </div>
            <div>
                  <ReactPlayer controls={true} width="390px" height="240px" url='https://youtu.be/YTYnNZRJscQ' style={{boxShadow:"5px 5px 30px 1px #2196f3"}}/>
            </div>
        </div>
        <hr />
        <Ps2/>
        <Ps3/>
        <Ps4/>
        <Ps5/>
    </div>
  )
}

export default History