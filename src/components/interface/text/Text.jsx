import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./text.css"

const AnimatedText = ({ text }) => {
  return (
    <div className="animatedTextw">
      {text.split("").map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {char}
        </span>
      ))}
    </div>
  );
};

const Text = () => {
  const text = "The Best Games from PS in The Last three years";
  

  return (
    <Box>
        <Typography className='animatedText' variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center", fontSize: "40px",color:"#2196f3"}}>
            Welcome To The PS Wbsite
        </Typography>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "center",color:"#2196f3"}}>
                Now you can buy All devices and games through this site.
        </Typography>
        <hr/>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: "center",color:"#2196f3"}}>
              <AnimatedText text={text} />
        </Typography>
    </Box>
  )
}

export default Text