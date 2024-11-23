import React from 'react'
import ReactPlayer from 'react-player'
import ps4 from "../../../../images/ps4Img.jpg"

const Ps4 = () => {
    return (
        <div>
              <h2
                  style={{
                    textAlign:"center",
                    color:"#2196f3"
                  }}
                >
                PlayStation 4
              </h2>
              <hr/>
            <div  className='img-text' style={{
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center"
            }}>
                <div>
                    <img 
                      src={ps4}
                      style={{
                        width:"390px",
                        height:"300px",
                        borderRadius:"50px",
                        boxShadow:"5px 5px 30px 1px #2196f3"
                        
                      }}
                      />
                </div>
                <div>
                      <p style={{color:"#2196f3", fontWeight:"bold"}}>Announced as the successor to in February 2013,
                         it was launched <br/>on November 2013, in North America, November 2013, in Europe.
                      </p>
                </div>
                <div>
                      <ReactPlayer controls={true} width="390px" height="240px" url='https://youtu.be/Cz8wCc36GDA' style={{boxShadow:"5px 5px 30px 1px #2196f3"}}/>
                </div>
            </div>
            <hr/>
        </div>
      )
}

export default Ps4

