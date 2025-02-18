import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Rating
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
        Swal.fire("خطأ", "يرجى تحديد التقييم قبل الإرسال", "error");
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
  
        Swal.fire("تم!", "تم إرسال التقييم بنجاح", "success");
        setOpen(false);
      } catch (error) {
        Swal.fire("خطأ", error.response?.data.detail || "حدث خطأ", "error");
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
                <Box>
                    <Box>
                        <Box>
                            <Box width={"50%"} position="relative">
                                <img
                                    // src={`http://192.168.1.94:8000${item.image_path}`}
                                    src={`http://127.0.0.1:8000${item.image_path}`}
                                    alt="image"
                                    width="50%"
                                    height="50%"
                                    objectFit="cover"
                                    style={{ marginLeft:"60%",boxShadow: '5px 5px 30px 1px #2196f3', borderRadius:"20px",width:"600px", height:"400px"}}
                                />
                            </Box>
                            <Box textAlign="center" mt={3}>
                                <Typography color="amber.500" fontSize="16px" fontWeight="bold" margin={2}>{item.name}</Typography>
                                <Typography color="amber.500" fontSize="16px" fontWeight="bold" margin={2}>{`${item.price} $ `}</Typography>
                                <Typography color="amber.500" fontSize="16px" fontWeight="bold" margin={2}>{item.description}</Typography>
                                <Typography color="amber.500" fontSize="16px" fontWeight="bold" margin={2}>({item.average_rating} / 5)<StarIcon sx={{color:"#fff700",marginBottom:"5px"}}/></Typography>
                                <ReactPlayer url={item.video_url} controls={true} width="390px" height="240px" style={{boxShadow:"5px 5px 30px 1px #2196f3",marginLeft:"37%"}}/>
                            </Box>
                            <Box sx={{marginBottom:"60px"}}>
                                    <Button
                                             onClick={handleAddToCart}
                                             sx={{
                                                 position: "absolute",
                                                 right: "40.5%",
                                                 backgroundColor: "#2196f1",
                                                 color: "#fff",
                                                 border: "none",
                                                 marginTop: "30px",
                                                 borderRadius: "10px",
                                                 transition: "0.5s",
                                                 "&:hover": { backgroundColor: "#000", color: "#2196f3", boxShadow: '1px 1px 5px 1px #2196f3' },
                                                 boxShadow: '1px 1px 15px 1px #2196f3'
                                                 
                                             }}
                                            >
                                            Add to Cart
                                    </Button>
                                    <Button
                                      onClick={handleOpen}
                                      sx={{
                                          position: "absolute",
                                          right: "50.5%",
                                          backgroundColor: "#2196f3",
                                          color: "#000",
                                          marginTop: "30px",
                                          borderRadius: "10px",
                                          boxShadow: '1px 1px 15px 1px #2196f3',
                                          "&:hover": { backgroundColor: "#fff700", boxShadow: '1px 1px 5px 1px #fff700' },
                                      }}
                                    >
                                      Game evaluation
                                    </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
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
