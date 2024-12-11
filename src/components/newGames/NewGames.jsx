import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'

const NewGames = () => {

  const [newgames, setNewgames] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/newgames/');
      setNewgames(response.data);
    } catch (error) {
      console.log('Error fetching data:' , error);
    }
  };


  return (
    <div>
  {newgames.map((item, index) => (
    <div key={item.id}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginTop: '20px',
        }}
      >
        <div>
          <img
            src={`http://127.0.0.1:8000${item.image_path}`}
            alt="error!"
            style={{ width: '390px',height: '240px', boxShadow: '5px 5px 30px 1px #2196f3' }}
          />
        </div>
        <div 
          style={{
            width: '500px', // Set the width to 50px
            wordWrap: 'break-word', // Break words if they exceed the container width
            overflowWrap: 'break-word', // Compatibility for word breaking
            whiteSpace: 'normal', // Ensure text wraps to new lines
          }}
        >
          <ul>
            <li>{item.description}</li>
            <li>Release Date:{item.release_date}</li>
            <li>Game_Type:{item.game_type}</li>
          </ul>
        </div>
        <div>
          <ReactPlayer
            url={item.video_url}
            controls={true}
            width="390px"
            height="240px"
            style={{ boxShadow: '5px 5px 30px 1px #2196f3' }}
          />
        </div>
      </div>
      {/* Render <hr /> if it's not the last item */}
      {index !== newgames.length - 1 && <hr />}
    </div>
  ))}
</div>

  )
}

export default NewGames