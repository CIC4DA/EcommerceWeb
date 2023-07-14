import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/Product/ProductSlice';
import authReducer from '../features/Auth/authSlice';
import cartReducer from '../features/Cart/CartSlice';
import orderReducer from '../features/Order/OrderSlice'
import userReducer  from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product : productReducer,
    auth : authReducer,
    cart : cartReducer,
    order : orderReducer,
    user : userReducer,
  },
});
