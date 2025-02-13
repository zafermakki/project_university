import React, {useState, useEffect} from 'react';
import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import backgroundimg from "../../images/bk.jpg"

const ProfilePage = () => {

  const navigate = useNavigate();
  // const username = localStorage.getItem('user_name');
  // const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('user_id');
  const navigateTo = (path) => {
    navigate(path, { state: { user_id: userId } });
  };

  // useEffect(() => {
  //   if (username) {
  //     axios.get(`http://127.0.0.1:8000/api/customers/get-user/${username}`)
  //     .then(response => {
  //       setUserData(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(false);
  //   }
  // }, [username]);

  // if (loading) {
  //   return <div>loading...</div>;
  // }

  // if (!userData) {
  //   return <div>user data not available. please log in again.</div>;
  // }

  return (    
      // <div
      //   style={{
      //     height: '100vh',
      //     backgroundImage: `url(${backgroundimg})`,
      //     backgroundSize: 'cover',
      //     backgroundPosition: 'center',
      //     backgroundRepeat: 'no-repeat',
      //     display: 'flex', 
      //     justifyContent: 'center',  
      //     alignItems: 'center', 
      //     flexDirection: 'column',
          
      //   }}
      // >
      //   <div>
      //     <div>
      //       {/* عرض صورة البروفايل */}
      //       {userData.profile_image && (
      //         <img
      //           src={`http://127.0.0.1:8000${userData.profile_image}`}
      //           alt="Profile"
      //           style={{
      //             width: "150px",
      //             height: "150px",
      //             borderRadius: "50%",
      //             objectFit: "cover",
      //             marginBottom: "20px",
      //             marginLeft:"30%",
      //             border:"2px solid #02345e",
      //             boxShadow:"5px 5px 30px 1px #2196f3"
      //           }}
      //         />
      //       )}

      //       <h2 style={{ fontWeight: "600" }}>
      //         UserName: <span style={{ color: "#2196f3" }}>{userData.username}</span>
      //       </h2>
      //       <h2 style={{ fontWeight: "600" }}>
      //         Email: <span style={{ color: "#2196f3" }}>{userData.email || "No Email Provided"}</span>
      //       </h2>
      //       <h2 style={{ fontWeight: "600" }}>
      //         First Name: <span style={{ color: "#2196f3" }}>{userData.first_name}</span>
      //       </h2>
      //       <h2 style={{ fontWeight: "600" }}>
      //         Last Name: <span style={{ color: "#2196f3" }}>{userData.last_name}</span>
      //       </h2>
      //     </div>
          <Button variant="contained" onClick={() => navigateTo('/purchases')}>
            Purchases
          </Button>
      // </div>
      // </div>
  )
}

export default ProfilePage