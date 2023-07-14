import React, { useEffect } from 'react';
import Home from './Pages/Home';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import { useSelector } from 'react-redux';
// hot-toast
import { Toaster } from 'react-hot-toast';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from './Pages/CartPage';
import Checkout from './Pages/Checkout';
import ProductDetailPage from './Pages/ProductDetailPage';
import Protected from './features/Auth/Protected';
import { useDispatch } from 'react-redux';
import { fetchItemsbyUserIdAsync } from './features/Cart/CartSlice'
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/Auth/authSlice';
import PageNotFound from './Pages/pageNotFound';
import OrderSuccessPage from './Pages/OrderSuccessPage';
import EmptyCartPage from './Pages/EmptyCartPage';
import UserOrderPage from './Pages/UserOrderPage';
import NoOrder from './Pages/NoOrder';
import Profilepage from './Pages/Profilepage';
import { fetchLoggedInUserAsync, fetchLoggedInUserOrdersAsync } from './features/user/userSlice';
import Logout from './features/Auth/Logout';
import ForgotPassword from './features/Auth/ForgotPassword';
import AdminHome from './Pages/AdminHome';
import ProtectedAdmin from './features/Auth/ProtectedAdmin';
import AdminProductDetailPage from './Pages/AdminProductDetailPage';
import AdminProductFormPage from './Pages/AdminProductFormPage';
import AdminOrdersPage from './Pages/AdminOrdersPage';
import StripeCheckout from './Pages/StripeCheckout';
import ResetPassword from './features/Auth/ResetPassword';
import SizeGuide from './features/Product/Components/SizeGuide';
import ResetPasswordUser from './features/user/ResetPasswordUser';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin>
      <AdminHome></AdminHome>
    </ProtectedAdmin>,
  },
  {
    path: "/signin",
    element: <SignInPage></SignInPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: <Protected>
      <CartPage></CartPage>
    </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected>
      <Checkout></Checkout>
    </Protected>,
  },
  {
    path: "/productdetail/:id",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "/admin/productdetail/:id",
    element:
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/emptycart",
    element: <EmptyCartPage></EmptyCartPage>,
  },
  {
    path: "/orders",
    element: <UserOrderPage></UserOrderPage>
  },
  {
    path: "/noorder",
    element: <NoOrder></NoOrder>
  },
  {
    path: "/profile",
    element: <Profilepage></Profilepage>
  },
  {
    path: "/logout",
    element: <Logout></Logout>
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword></ForgotPassword>
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin>
      <AdminOrdersPage></AdminOrdersPage>
    </ProtectedAdmin>
  },
  {
    path: "/stripe-checkout",
    element: <Protected>
      <StripeCheckout></StripeCheckout>
    </Protected>
  },
  {
    path: "/sizeguide",
    element:
      <SizeGuide></SizeGuide>
  },
  {
    path: "/reset-password",
    element:
      <ResetPassword></ResetPassword>
  },
  {
    path: "/reset-password-user",
    element:
      <ResetPasswordUser></ResetPasswordUser>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  }
]);




function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const userChecked = useSelector(selectUserChecked);
  console.log(userChecked);

  useEffect(()=>{
    dispatch(checkAuthAsync());
  },[dispatch]);
  
  useEffect(() => {
    
    if (user) {
      dispatch(fetchItemsbyUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
        <>
        <RouterProvider router={router} />
        <Toaster />
        </>   
    </div>
  );
}

export default App;
