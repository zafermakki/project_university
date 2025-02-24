import React from 'react'

const TextDetails = () => {

  const name = localStorage.getItem('username')

  return (
    <div style={{textAlign:"center", margin:"10px"}}>
      <div>
        <h1 style={{color:"#2196f3"}}>
          Welcome {name} !!
        </h1>
      </div>
      <div>
        <p>
          We are pleases that you visited our website today,<br/>
          you can purchase any decvices from this site and you can also purchase games,<br/>
          for upcoming games can be seen through the icon in the left corner of the page.
        </p>
      </div>
      <hr/>
    </div>
  )
}

export default TextDetails