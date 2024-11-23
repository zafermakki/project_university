import React from 'react'
import ReactPlayer from 'react-player'
import ps2 from "../../../../images/ps2Img.jpg"

const Ps2 = () => {
    return (
        <div>
              <h2
                  style={{
                    textAlign:"center",
                    color:"#2196f3"
                  }}
                >
                PlayStation 2
              </h2>
              <hr/>
            <div  className='img-text' style={{
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center"
            }}>
                <div>
                    <img 
                      src={ps2}
                      style={{
                        width:"390px",
                        height:"300px",
                        borderRadius:"50px",
                        boxShadow:"5px 5px 30px 1px #2196f3"
                        
                      }}
                      />
                </div>
                <div>
                      <p style={{color:"#2196f3", fontWeight:"bold"}}>It was first released in Japan on 4 March 2000,
                       in North America on 26 October 2000,<br/> in Europe on 24 November 2000, and in Australia on 30 November 2000.
                      </p>
                </div>
                <div>
                      <ReactPlayer controls={true} width="390px" height="240px" url='https://youtu.be/Hvcps5dFzfc' style={{boxShadow:"5px 5px 30px 1px #2196f3"}}/>
                </div>
            </div>
            <hr/>
        </div>
      )
}

export default Ps2

