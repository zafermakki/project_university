import React from 'react'
import psLogo from "../../../images/ps-logo.jpg"
import Button from "@mui/material/Button"
import {useNavigate} from "react-router-dom"



const Devices = () => {

  const navigate = useNavigate()

  return (
    <div style={{display: "flex" , justifyContent:"space-around" , alignItems:"center", flexWrap:"wrap"}}>
        <div>
            <h2 style={{color:"#2196f3"}}>
              Devices
            </h2>
            <p>
              Now you can Buy the all devices you should, put Your devices in the cart<br/> after that complete your purchses operation
            </p>
            <Button variant='contained'
              onClick={() => {
                navigate('/categoriesdevices')
              }}
            >
                view
            </Button>
        </div>
        <div>
              <img src={psLogo} alt="no internt"
                  style={{
                    margin:"10px",
                    width:"400px",
                    height:"300px",
                    borderRadius:"50px",
                    objectFit:"fill",
                    boxShadow:"5px 5px 30px 1px #2196f3"
                  }}  
              />
        </div>
    </div>
  )
}

export default Devices