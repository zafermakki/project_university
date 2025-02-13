import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import TextDetails from './textd/TextDetails';
import Devices from './devices/Devices';
import Games from './games/Games';
import { cartActions, fetchUserCartAsync } from '../../redux/cartSlice'
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2'
import { styled } from '@mui/material/styles';
import axios from 'axios';

const jump = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Adjust the height of the jump */
  }
`;

const ImageContainer = styled('div')({
  width: '100%',
  paddingTop: '60%', // Maintain aspect ratio
  position: 'relative',
  left:'180%',
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

const ListPage = ({ setmyMOde }) => {

  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      Swal.fire({
        title: "You must log in to access this page.",
        icon: "error",
        draggable: true,
        customClass: {
          container: 'custom-swal-container',
          popup: 'custom-swal-popup',
          header: 'custom-swal-header',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          actions: 'custom-swal-actions',
          confirmButton: 'custom-swal-confirm-button',
        }
      });
  
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  },[navigate])

  const getData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/products/categories/',{
        headers: {
          Authorization: `Token ${token}`
        }

      });
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToProducts = (id) => {
    navigate(`/subcategories/${id}`);
  };

  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);
  const theme = useTheme();
  const userId = localStorage.getItem('user_id');
  const navigateTo = (path) => {
    navigate(path, { state: { user_id: userId } });
  };
  // Get cart items from Redux store
  const cartItems = useSelector(state => state.cart.data);
  
  // Calculate total number of items in the cart
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
      const interval = setInterval(() => {
          setAnimate(prev => !prev);
      }, 700);

      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserCartAsync(userId));
    }
  }, [userId, dispatch]);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to log out?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7b1fa2',
        cancelButtonColor: '#d33',
        background:"#30003f",
        color:"#fff",
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'Cancel'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.post(
                    'http://127.0.0.1:8000/api/auth/client/logout/',
                    {},
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
                dispatch(cartActions.clearItems());


                navigate('/login');
            } catch (err) {
                Swal.fire('Error!', err.response?.data?.error || 'An error occurred', 'error');
            }
        }
    });
};

  return (
      <Box>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{backgroundColor: "#0d47a1", position:"static"}}>
                <Toolbar>
                <SportsEsportsIcon 
                onClick={() => {
                  navigate('/newgames')
                }}
                sx={{
                      marginRight: "10px",
                      cursor: "pointer",
                      color:"#bbdefb",
                      fontSize: 40, 
                      animation: animate ? `${jump} 0.5s ease` : 'none',
                }}/> 
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center", fontSize: "40px" }}>
                  Dashboard    
                </Typography>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => navigateTo('/profile')}>Profile</MenuItem>
                  <MenuItem>
                    DarkMode
                    <IconButton 
                      sx={{ml: 1}}
                      onClick={() => {
                          localStorage.setItem("currentMode", theme.palette.mode ==="dark" ? "light" : "dark");
                          setmyMOde(theme.palette.mode ==="light" ? "dark" : "light");
                      }}
                      color="inherit"
                    >
                      {theme.palette.mode === "dark" ? <WbSunnyIcon sx={{color:"orange"}}/> : <DarkModeIcon/> }
                    </IconButton>
                  </MenuItem>
                  <MenuItem onClick={() => navigateTo('/cartpage')}>
                    My Cart
                    <IconButton sx={{ml: 1, position: 'relative'}}>
                      <ShoppingCartIcon />
                      {/* Display the cart item count */}
                      {cartItemCount > 0 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            width: '20px',
                            height: '20px',
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '12px',
                          }}
                        >
                          {cartItemCount}
                        </Box>
                      )}
                    </IconButton>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
                </Toolbar>
            </AppBar>
        </Box>
        <TextDetails/>
        
        <div style={{ minHeight: '100vh',width:"100%" }}>
          <Grid container spacing={8} display="flex" flexWrap="wrap">
            {news.map((item, index) => (
              <React.Fragment key={item.id}>
                <Grid marginLeft="40px" marginBottom="20px" item xs={12} sm={6} md={4}>
                  <div style={{
                    display:"flex",
                    justifyContent:"space-between"
                  }}>
                        <div >
                          <h2 style={{ color: "#2196f3",width:"600px"}}>{item.name}</h2>
                          <p style={{ fontSize:"16px",fontWeight:"600"}}>{item.description}</p>
                          <Button variant='contained' 
                            onClick={() => navigateToProducts(item.id)}
                          >
                                VIEW
                          </Button>
                        </div>
                        <div>
                            <img
                              src={`http://127.0.0.1:8000${item.image_path}`}
                              alt={item.name}
                              style={{
                                width:"600px",
                                height:"320px",
                                marginLeft:"220px",
                                borderRadius:"15px",
                                boxShadow: '0px 0px 20px 5px #2196f3'
                              }}
                              />
                        </div>
                      </div>
                </Grid>
                
                {/* إضافة فاصل بين الأقسام */}
                {index < news.length - 1 && <hr style={{ width: '100%', borderColor: '#ccc' }} />}
              </React.Fragment>
            ))}
          </Grid>
        </div>


      </Box>
  );
};

export default ListPage;



