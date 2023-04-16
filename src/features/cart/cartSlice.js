import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: false,
};

// using fetch method
// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//           .then(response => response.json())
//           .catch(error => console.error(error))
// })

// using axios
export const getCartItems = createAsyncThunk("cart/getCartitems", async () => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false
    }
  }
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
