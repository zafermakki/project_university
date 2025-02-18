import React, {useState,useEffect} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const GameSuggestions = () => {

    const [games, setGames] = useState([]);
    const navigate = useNavigate();


    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/products/search_recommendations/',{
            headers: {
                Authorization: `Token ${token}`
              }
        })
        .then((response) => {
            setGames(response.data);
        })
        .catch((error) => {
            console.log('Error fetching data:',error);
        });
    }, []);

    const handleDetails = (game) => {
        navigate('/details', {state: {item: game}})
    }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {games.map((game) => (
          <div key={game.id} style={{ margin: "20px",cursor:"pointer" }} onClick={() => handleDetails(game)}>
              <div>
                <img
                  src={`http://127.0.0.1:8000${game.image_path}`}
                  alt="image"
                  style={{
                    width: "600px",
                    height: "400px",
                    borderRadius: "10px",
                    boxShadow: "5px 5px 30px 1px #2196f3",
                  }}
                />
                <p style={{ textAlign: "center", marginTop: "10px", color: "#2196f3" }}>
                  {game.name}
                </p>
                <p style={{ textAlign: "center", color: "#2196f3" }}>{game.price} $ </p>
              </div>
          </div>
        ))}
      </div>
  )
}

export default GameSuggestions