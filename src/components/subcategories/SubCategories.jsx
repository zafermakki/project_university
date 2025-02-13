import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Center, Heading } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom'; // Link for navigation, useParams to get category_id
import { AppBar, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const SubCategories = () => {
  const { category_id } = useParams(); // Get category_id from URL params
  const [news, setNews] = useState([]);

  useEffect(() => {
    getData();
  }, [category_id]); // Fetch data when category_id changes

  const getData = async () => {
    try {
      const token = localStorage.getItem('token');
      // const response = await axios.get(`http://192.168.1.94:8000/api/products/${category_id}/`);
      const response = await axios.get(`http://127.0.0.1:8000/api/products/subcategories/${category_id}/`,{
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign: "center", fontSize:"40px" }}>
                  The SubCategories
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:"space-between" }}>
            {news.map(item => (
              <div key={item.id} style={{ margin: '20px' }}>
                <Link to={`/products/${item.id}`} state={{ item }} style={{ textDecoration: 'none' }}>
                  <div>
                    <img
                      // src={`http://192.168.1.94:8000${item.image_path}`}
                      src={`http://127.0.0.1:8000${item.image_path}`}
                      alt="image"
                      style={{ width: '600px', height: '400px', borderRadius: '10px', boxShadow: '5px 5px 30px 1px #2196f3' }}
                    />
                    <p style={{ textAlign: 'center', marginTop: '10px', color: '#2196f3' }}>{item.name}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        </>
  )
}

export default SubCategories