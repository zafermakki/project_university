import React from 'react'
import NavBar from './navbar/NavBar'
import Text from './text/Text'
import CarouselImg from './carousel/CarouselImg'
import History from './informationPs/History'
import GetStart from './getStarted/GetStart'
import Footer from './footer/Footer'

const Interface = ({setmyMOde}) => {
  return (
    <div>
          <NavBar setmyMOde={setmyMOde}/>
          <Text/>
          <CarouselImg/>
          <History/>
          <GetStart/>
          <hr/>
          <Footer/>
    </div>
  )
}

export default Interface