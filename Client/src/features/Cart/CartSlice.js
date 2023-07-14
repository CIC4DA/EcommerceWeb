import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addtocart,fetchItemsbyUserId,updateCart,deleteItemsFromCart,resetCart } from './CartAPI';

const initialState = {
  items : [],
  status: 'idle',
};

export const addtocartAsync = createAsyncThunk(
  'cart/addtocart',
  async (item) => {
    const response = await addtocart(item);
    return response.data;
  }
);

export const fetchItemsbyUserIdAsync = createAsyncThunk(
  'cart/fetchItemsbyUserId',
  async () => {
    const response = await fetchItemsbyUserId();
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemsFromCartAsync = createAsyncThunk(
  'cart/deleteItemsFromCart',
  async (itemId) => {
    const response = await deleteItemsFromCart(itemId);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(addtocartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addtocartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsbyUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsbyUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteItemsFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemsFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      })
  },
});


export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
