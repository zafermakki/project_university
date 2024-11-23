import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const ImageContainer = styled('div')({
  width: '100%',
  paddingTop: '100%', // Maintain aspect ratio
  position: 'relative',
  boxShadow: '0px 0px 20px 5px #2196f3', // Glowing effect
  borderRadius: '15px',
  margin: 'auto',
  backgroundColor: '#000', // Dark background to make the image pop
});

const StyledImg = styled('img')({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '15px',
});

const CategoriesDevices = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/categories/');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToProducts = (id) => {
    navigate(`/productsdevices/${id}`);
  };

  return (
    <>
      {/* AppBar Header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#333' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '30px' }}>
              The Categories
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Categories Content */}
      <div style={{ padding: '20px', backgroundColor: '#222', minHeight: '100vh' }}>
        <Grid container spacing={8} justifyContent="space-between">
          {news.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <div onClick={() => navigateToProducts(item.id)} style={{ cursor: 'pointer' }}>
                <ImageContainer>
                  <StyledImg
                    src={`http://127.0.0.1:8000${item.image_path}`}
                    alt={item.name}
                  />
                </ImageContainer>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default CategoriesDevices;
