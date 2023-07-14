import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCartAsync } from '../features/Cart/CartSlice';
import { selectLoggedInUser } from '../features/Auth/authSlice';
import { resetOrder } from '../features/Order/OrderSlice'
import { selectUserInfo } from '../features/user/userSlice';
import NavBar from '../features/Navbar/Navbar'

function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // to reset cart
    dispatch(resetCartAsync());
    // tp reset current order
    dispatch(resetOrder());
  }, [dispatch])

  return (
    <>
        {!params.id && <Navigate to='/' replace={true}></Navigate>}
        <div className='bg-white'>
          <div className="grid min-h-full place-items-center bg-white px-6 py-48 sm:py-48 lg:px-8 ">
            <div className="text-center ">
              <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">Your Order is Successful</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order #{params?.id}</h1>
              <p className="mt-6 text-base leading-7 text-gray-600">Expected delivery in A week</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/"
                  className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default OrderSuccessPage;