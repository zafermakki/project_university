import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Image,
  useToast,
  Button
} from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { cartActions } from "../../redux/cartSlice";
import Swal from 'sweetalert2';
import ReactPlayer from 'react-player'
import { addToCartAsync } from "../../redux/cartSlice";


const Details = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    const item = location.state?.item;
    const cartItems = useSelector(state => state.cart.data); // Retrieve cart items from Redux state
    const news = useSelector(state => state.cart.data);
    const userId = localStorage.getItem('user_id');
    const [sum, setSum] = useState(0);

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
            <Box width='100%' padding={10}>
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
                                <p color="amber.500" fontSize="16px" fontWeight="bold" >{item.name}</p>
                                <p color="amber.500" fontSize="16px" fontWeight="bold">{`${item.price} $ `}</p>
                                <p color="amber.500" fontSize="16px" fontWeight="bold" >{item.description}</p>
                                <ReactPlayer url={item.video_url} controls={true} width="390px" height="240px" style={{boxShadow:"5px 5px 30px 1px #2196f3",marginLeft:"37%"}}/>
                            </Box>
                            <Box>
                                    <Button
                                            onClick={handleAddToCart}
                                            position="absolute"
                                            right="46.5%"
                                            backgroundColor="#2196f1"
                                            color="#fff"
                                            border="none"
                                            marginTop="25px"
                                            borderRadius="10px"
                                            transition="0.5s"
                                            _hover={{ backgroundColor: "#000",color:"#2196f3",boxShadow:'1px 1px 5px 1px #2196f3' }}
                                            boxShadow= '1px 1px 30px 1px #2196f3'
                                            >
                                            Add to Cart
                                    </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Details;
