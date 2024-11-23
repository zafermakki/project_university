import React from 'react'
import ReactPlayer from 'react-player'
import ps5 from "../../../../images/ps5Img.jpg"

const Ps5 = () => {
    return (
        <div>
              <h2
                  style={{
                    textAlign:"center",
                    color:"#2196f3"
                  }}
                >
                PlayStation 5
              </h2>
              <hr/>
            <div  className='img-text' style={{
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center"
            }}>
                <div>
                    <img 
                      src={ps5}
                      style={{
                        width:"390px",
                        height:"300px",
                        borderRadius:"50px",
                        boxShadow:"5px 5px 30px 1px #2196f3"
                        
                      }}
                      />
                </div>
                <div>
                      <p style={{color:"#2196f3", fontWeight:"bold"}}>It was announced as the successor to the PlayStation 4 <br/>
                            in April 2019, was launched on November 12, 2020, in Australia,
                      </p>
                </div>
                <div>
                      <ReactPlayer controls={true} width="390px" height="240px" url='https://youtu.be/RkC0l4iekYo' style={{boxShadow:"5px 5px 30px 1px #2196f3"}}/>
                </div>
            </div>
            <hr/>
        </div>
      )
}

export default Ps5

