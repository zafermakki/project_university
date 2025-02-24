import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Rating,
  Card,
  CardContent,
  CardActions,
  CardMedia
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { cartActions } from "../../redux/cartSlice";
import Swal from 'sweetalert2';
import ReactPlayer from 'react-player'
import { addToCartAsync } from "../../redux/cartSlice";
import axios from "axios";

const Details = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const item = location.state?.item;
    const cartItems = useSelector(state => state.cart.data); // Retrieve cart items from Redux state
    const news = useSelector(state => state.cart.data);
    const userId = localStorage.getItem('user_id');
    const [sum, setSum] = useState(0);

    const [open, setOpen] = useState(false); // حالة فتح/إغلاق المودال
    const [rating, setRating] = useState(0); // قيمة التقييم
    const [previousRating, setPreviousRating] = useState(null);

    const handleClose = () => setOpen(false);

     const handleOpen = async () => {
    setOpen(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/my-rating/${item.id}/`,
        { headers: { Authorization: `Token ${token}` } }
      );
      if (
        response.data.rating !== undefined &&
        response.data.rating !== null
      ) {
        setRating(response.data.rating);
        setPreviousRating(response.data.rating);
      } else {
        setRating(0);
        setPreviousRating(null);
      }
    } catch (error) {
      console.error("Error fetching previous rating:", error);
      setRating(0);
      setPreviousRating(null);
    }
  };

    const handleRatingSubmit = async () => {
      if (!rating) {
        Swal.fire({
          title: "error",
          text: "please determine the evaluation before the transmission",
          icon: "error",
          background: "#000422",
          confirmButtonColor: "#2196f3",
          color:"#fff"
        });
        setOpen(false);
        return;
      }
  
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `http://127.0.0.1:8000/api/products/rate-product/${item.id}/`,
          { rating },
          { headers: { Authorization: `Token ${token}` } } // إرسال التوكين إذا كنت تستخدم المصادقة
        );
  
        Swal.fire({
          title: "success!",
          text: "The evaluation was successfully sent ",
          icon: "success",
          background: "#000422",
          confirmButtonColor: "#2196f3",
          color:"#fff"
        });
        setOpen(false);
      } catch (error) {
        Swal.fire({
          title: "error",
          text: error.response?.data.detail || "error",
          icon: "error",
          background: "blue", 
          confirmButtonColor: "red",
          color:"#fff"
        });
        setOpen(false);
      }
    };

    useEffect(() => {
      const userId = localStorage.getItem('user_id');
      console.log("User ID from localStorage:", userId);
  }, []);
  

    useEffect(() => {
        const sumWithInitial = news.reduce(
          (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
          0
        );
        setSum(sumWithInitial.toFixed(2));
      }, [news]);

    const [addedToCart, setAddedToCart] = useState(false); // State to track if item is added to cart

    if (!item) {
        // If item is not available, navigate back to a safe route or show an error message
        navigate('/');  // Adjust the route as needed
        return null;    // Render nothing while navigating
    }

    const handleAddToCart = async () => {
      const alreadyInCart = cartItems.some(cartItem => cartItem.id === item.id);
      
      if (alreadyInCart) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${item.name} is already in your cart.`,
        });
      } else {
        const cartData = {
          customer: userId,
          products: [{
            id: item.id,
            quantity: 1 // Default quantity of 1
          }]
        };
    
        const resultAction = await dispatch(addToCartAsync(cartData));
    
        if (addToCartAsync.fulfilled.match(resultAction)) {
          Swal.fire({
            icon: "success",
            title: "Added to Cart",
            text: `${item.name} was successfully added to your cart!`,
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
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `${item.name} is already in your cart.  `,
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
        }
      }
    };
    
    
    

    return (
        <>  
            <Box width='100%' padding={5}>
            <Card
                  sx={{
                    maxWidth: 900,
                    margin: 'auto',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    borderRadius: 2,
                    mt: 4,
                  }}
                >
                  {/* عرض الصورة */}
                  <CardMedia
                    component="img"
                    image={`http://127.0.0.1:8000${item.image_path}`}
                    alt={item.name}
                    sx={{
                      height: 400,
                      objectFit: 'fill',
                      boxShadow: '5px 5px 30px 1px #2196f3',
                      borderRadius: 2,
                    }}
                  />

                  {/* محتوى تفاصيل المنتج */}
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'amber.500', mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'amber.500', mb: 1 }}>
                      {`${item.price} $`}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'amber.500', mb: 1 }}>
                      Release Date: {item.release_date}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'amber.500', mb: 1 }}>
                      {item.games_type}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'amber.500', mb: 1 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'amber.500', mr: 0.5 }}>
                        ({item.average_rating} / 5)
                      </Typography>
                      <StarIcon sx={{ color: "#fff700" }} />
                    </Box>
                    {item.video_url && (
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ReactPlayer
                          url={item.video_url}
                          controls
                          width="390px"
                          height="240px"
                          style={{
                            boxShadow: "5px 5px 30px 1px #2196f3",
                            borderRadius: '10px',
                          }}
                        />
                      </Box>
                    )}
                  </CardContent>

                  {/* أزرار التفاعل */}
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                      onClick={handleAddToCart}
                      variant="contained"
                      sx={{
                        backgroundColor: "#2196f1",
                        color: "#fff",
                        borderRadius: "10px",
                        boxShadow: '1px 1px 15px 1px #2196f3',
                        transition: '0.5s',
                        "&:hover": { backgroundColor: "#000", color: "#2196f3", boxShadow: '1px 1px 5px 1px #2196f3' },
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={handleOpen}
                      variant="contained"
                      sx={{
                        backgroundColor: "#2196f3",
                        color: "#000",
                        borderRadius: "10px",
                        boxShadow: '1px 1px 15px 1px #2196f3',
                        transition: '0.5s',
                        ml: 2,
                        "&:hover": { backgroundColor: "#fff700", boxShadow: '1px 1px 5px 1px #fff700' },
                      }}
                    >
                      Game Evaluation
                    </Button>
                  </CardActions>
                </Card>
                <Modal open={open} onClose={handleClose}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      borderRadius: "10px",
                      textAlign: "center"
                    }}
                  >
                    <Typography variant="h6" mb={2}> evaluate game</Typography>
                    <Rating
                      value={rating}
                      precision={0.5}
                      onChange={(event, newValue) => setRating(newValue)}
                      size="large"
                    />
                     {previousRating !== null && (
                        <Typography variant="body1" mt={2}>
                           your previouse evaluate:{" "}
                          <StarIcon
                            sx={{ color: "#FFD700", verticalAlign: "middle",marginBottom:"5px" }}
                          />{" "}
                          {previousRating}
                        </Typography>
                      )}
                    <Box mt={2}>
                      <Button onClick={handleRatingSubmit} variant="contained" color="primary">
                        send evaluation
                      </Button>
                      <Button onClick={handleClose} sx={{ ml: 2 }} color="error">
                        close
                      </Button>
                    </Box>
                  </Box>
                </Modal>
            </Box>
        </>
    );
}

export default Details;
