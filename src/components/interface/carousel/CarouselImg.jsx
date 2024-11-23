import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import igm1 from "../../../images/crash.jpg"
import igm2 from "../../../images/resedent-evil.jpg"
import img4 from "../../../images/metro.jpg"
import Button from '@mui/material/Button';
import "./carousel.css"

const CarouselImg = () => {
  return (
    <div style={{position:"relative"}}>
         <Carousel interval={3000} >
            <Carousel.Item>
                    <img
                    style={{height: "550px", objectFit: "fill"}}
                    className="d-block w-100"
                    src={igm1}
                    alt="First slide"
                    />
                        <Carousel.Caption>
                                <a href='https://youtu.be/2I2zLQ0PlG4' target="_blank">
                                        <Button 
                                                variant="contained"
                                                className='button1'
                                                >
                                                View Trailer
                                        </Button>
                                </a>
                                        
                        </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                    <img
                    style={{height: "550px", objectFit: "cover"}}
                    className="d-block w-100"
                    src={igm2}
                    alt="Second slide"
                    />
                        <Carousel.Caption>
                                <a href='https://youtu.be/E69tKrfEQag' target="_blank">
                                        <Button 
                                                variant="contained"
                                                className='button2'
                                                >
                                                View Trailer
                                        </Button>
                                </a>
                        </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                    <img
                    style={{height: "550px", objectFit: "fill"}}
                    className="d-block w-100"
                    src={img4}
                    alt="Third slide"
                    />
                        <Carousel.Caption>
                                <a href='https://youtu.be/c_YddLpfD5o' target="_blank">
                                        <Button 
                                                variant="contained"
                                                className='button3'
                                                >
                                                View Trailer
                                        </Button>
                                </a>
                        </Carousel.Caption>
            </Carousel.Item>
     </Carousel>
    </div>
  )
}

export default CarouselImg