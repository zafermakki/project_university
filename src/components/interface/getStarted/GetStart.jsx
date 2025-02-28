import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom"


import "./getstarted.css"

const GetStart = () => {

    const navigate = useNavigate()

  return (
    <div className='divGetStarted'>
        <h2 style={{color: "#2196f3"}}>
           Get Started
        </h2>
        <p>
            Now you can in This Site Buy any thing related to PlayStation including Devices and Games,<br/>
            let's go to make an account 
        </p>
            <Button variant='contained'
                onClick={() => navigate('/createaccount')}
            >
                Create Account
            </Button>
    </div>
  )
}


export default GetStart