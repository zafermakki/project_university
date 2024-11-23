import React from 'react'
import ReactPlayer from 'react-player'
import ps3 from "../../../../images/ps3Img.jpg"

const Ps3 = () => {
    return (
        <div>
              <h2
                  style={{
                    textAlign:"center",
                    color:"#2196f3"
                  }}
                >
                PlayStation 3
              </h2>
              <hr/>
            <div  className='img-text' style={{
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center"
            }}>
                <div>
                    <img 
                      src={ps3}
                      style={{
                        width:"390px",
                        height:"300px",
                        borderRadius:"50px",
                        boxShadow:"5px 5px 30px 1px #2196f3"
                        
                      }}
                      />
                </div>
                <div>
                      <p style={{color:"#2196f3", fontWeight:"bold"}}>It was first released on November 11, 2006, in Japan, November 17, 2006,<br/> in North America, and March 23, 2007, in Europe and Australasia
                      </p>
                </div>
                <div>
                      <ReactPlayer controls={true} width="390px" height="240px" url='https://youtu.be/-XF2pu-4rXc' style={{boxShadow:"5px 5px 30px 1px #2196f3"}}/>
                </div>
            </div>
            <hr/>
        </div>
      )
}

export default Ps3

