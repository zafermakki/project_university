import React from 'react'
import psLogo from "../../../images/ps-games.jpg"
import Button from "@mui/material/Button"
import { useNavigate } from 'react-router-dom'

const Games = () => {

  const navigate = useNavigate();

  return (
    <div style={{display: "flex" , justifyContent:"space-around" , alignItems:"center", flexWrap:"wrap"}}>
        <div>
            <h2 style={{color:"#2196f3"}}>
              Games
            </h2>
            <p>
              Now you can Buy the all games, you should put Your games in the cart<br/> after that complete your purchses operation
            </p>
            <Button variant='contained'
              onClick={() => {
                navigate('/categoriesgames')
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

export default Games