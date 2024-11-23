import * as React from 'react';
import{ useTheme }from "@mui/material/styles"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Button from "@mui/material/Button"
import { useNavigate } from 'react-router-dom';
import "./navbar.css"

const NavBar = ({setmyMOde}) => {
  const theme = useTheme()

  const navigate = useNavigate();

  return (
      <Box>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{backgroundColor: "#0d47a1", position:"static"}}>
                <Toolbar> 
                        <Button variant='contained'
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            Login
                        </Button>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center", fontSize: "40px" }}>
                                <SportsEsportsIcon className="iconAnimation1"  sx={{marginRight: "10px", fontSize:"40px", color:"#bbdefb"}}/>
                                    PlayStation
                                    <SportsEsportsIcon className="iconAnimation2"  sx={{marginLeft: "10px",fontSize:"40px",color:"#bbdefb"}}/>
                            </Typography>
                        <IconButton 
                            sx={{ml: 1}}
                            onClick={() => {
                                localStorage.setItem("currentMode" , theme.palette.mode ==="dark"? "light" : "dark")

                                setmyMOde(theme.palette.mode ==="light"?"dark":"light")
                            }}
                            color="inherit"
                        >
                            {theme.palette.mode === "dark" ?<WbSunnyIcon sx={{color:"orange"}}/> : <DarkModeIcon/> }
                        </IconButton>
                </Toolbar>
            </AppBar>
            
        </Box>
      </Box>
  )
}

export default NavBar
