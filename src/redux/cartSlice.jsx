import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint to add items to the cart
const ADD_TO_CART_URL = 'http://127.0.0.1:8000/api/cart/add/';
// Function to fetch the user's cart
const FETCH_USER_CART_URL = (userId) => `http://127.0.0.1:8000/api/cart/${userId}/`;

const getToken = () => localStorage.getItem('token');
// Async thunk for adding items to the cart
export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (cartData, { rejectWithValue }) => {
    try {
      console.log('🛒 Data being sent:', cartData); // ✅ تحقق من البيانات قبل الإرسال
      
      const token = getToken();
      if (!token) throw new Error('No token found');

      const response = await axios.post(ADD_TO_CART_URL, cartData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('❌ Error response:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Unauthorized');
    }
  }
);



// Async thunk for fetching user's cart items
export const fetchUserCartAsync = createAsyncThunk(
  'cart/fetchUserCartAsync',
  async (userId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error('No token found');

      const response = await axios.get(FETCH_USER_CART_URL(userId), {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unauthorized');
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.data.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.data.push({ ...action.payload, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }
    },
    updateQuantity: (state, action) => {
      const item = state.data.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    setCartItems: (state, action) => {
      state.data = action.payload;
    },
    clearItems: (state) => {
      state.data = [];
    },
    deleteItem: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.data.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.data.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    // Add to cart
    builder.addCase(addToCartAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.loading = false;
      const existingItem = state.data.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.data.push({ ...action.payload, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to add item to the cart';
    });

    // Fetch user cart
    builder.addCase(fetchUserCartAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserCartAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // Update the cart data with the fetched items
    });
    builder.addCase(fetchUserCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch user cart';
    });
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
