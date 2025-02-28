import React, { useState, useEffect } from "react";
import { Box, Text, Image, useToast } from '@chakra-ui/react';
import { Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cartActions } from "../../redux/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const cartItems = useSelector(state => state.cart.data);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem('user_id'); 

    
    // Fetch the cart data when the component mounts
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/cart/${userId}/`,{
          headers: {
            Authorization: `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Dispatch the data to Redux store
          dispatch(cartActions.setCartItems(data));
        } else {
          console.error("Failed to fetch cart data");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [dispatch]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.final_price) * item.quantity,
      0
    );
    setTotalAmount(total.toFixed(2));
  }, [cartItems]);

  const updateCartQuantity = async (itemId, quantity) => {
    const userId = localStorage.getItem('user_id');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/cart/update/${itemId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          product_id: itemId,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        dispatch(cartActions.updateQuantity({ id: itemId, quantity }));
      } else {
        console.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const handlePay = async () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Your cart is empty",
        text: "You don't have any products in your cart.",
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
      return;
    }
  
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User ID not found. Please log in again.",
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
      return;
    }
  
    const formattedCartItems = cartItems.map(item => ({
      product: item.id,
      quantity: item.quantity,
    }));
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/cart/complete-purchase/${userId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          products: formattedCartItems,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.status === 200) {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "The purchase was successful",
          showConfirmButton: false,
          timer: 2500,
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
        dispatch(cartActions.clearItems());
        navigate(-1);
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Purchase failed",
          text: responseData.error || "The purchase failed.",
          footer: responseData.remaining_quantity ? `Available: ${responseData.remaining_quantity}` : '',
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
          title: "Purchase failed",
          text: responseData.error || "The purchase failed",
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Purchase failed",
        text: "An error occurred while making the purchase",
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
  };
  
  
  
  
  

  
  const handleDeleteItem = async (itemId) => {
    if (!itemId) {
      console.error("Item ID is undefined.");
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/cart/delete/${itemId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`
        }
      });
  
      if (response.ok) {
        dispatch(cartActions.deleteItem(itemId));
        Swal.fire({
          icon: "success",
          title: "Item removed.",
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
          title: "item didn't removed.",
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error when you are deleting item.",
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
  };
  
  
  

  const increaseQuantity = (itemId) => {
    const currentQuantity = cartItems.find(item => item.id === itemId).quantity;
    const newQuantity = currentQuantity + 1;
    updateCartQuantity(itemId, newQuantity);
  };

  const decreaseQuantity = (itemId) => {
    const currentQuantity = cartItems.find(item => item.id === itemId).quantity;
    const newQuantity = currentQuantity - 1;
    if (newQuantity >= 1) {
      updateCartQuantity(itemId, newQuantity);
    }
  };

  return (
    <div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cartItems.map((item) => (
        <div key={item.id} width="45%" marginBottom="20px">
          <div rounded="lg" overflow="hidden" boxShadow="md">
            <div position="relative" width="100%" paddingBottom="100%" overflow="hidden">
              <img
                src={`http://127.0.0.1:8000/media/${item.image_path}`}
                alt="image"
                style={{ margin: "50px", width: '400px', height: '400px', boxShadow: "5px 5px 30px 1px #2196f3", borderRadius: "15px" }}
              />
            </div>
            <div p={4}>
              <p style={{ textAlign: "center" }}>
                {item.name}
              </p>
              <p style={{ textAlign: "center" }}>
              {parseFloat(item.final_price) < parseFloat(item.price) ? (
                <>
                  <span style={{ textDecoration: "line-through", marginRight: "8px", color: "red" }}>
                    {item.price} $
                  </span>
                  <span>{item.final_price} $</span>
                </>
                 ) : (
                  <span>{item.price} $</span>
              )}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                  <RemoveIcon />
                </IconButton>
                <Text mx={2}>{item.quantity}</Text>
                <IconButton onClick={() => increaseQuantity(item.id)}>
                  <AddIcon />
              </IconButton>
              </div>
                <IconButton onClick={() => handleDeleteItem(item.id)} style={{ color: "red",marginLeft:"230px" }}>
                    <DeleteIcon /> {/* Delete button */}
                </IconButton>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div textAlign="center" mt={4}>
      <Button sx={{ marginLeft: "44%", marginTop: "10px" }}
        variant="contained"
        onClick={handlePay}
        backgroundColor="amber.500"
      >
        {"Buy " + totalAmount}
      </Button>
    </div>
  </div>
  );
};

export default CartPage;
