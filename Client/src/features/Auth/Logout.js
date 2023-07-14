import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signOutAsync } from './authSlice';
import { Navigate } from 'react-router-dom';
import { signOutUserAsync } from '../user/userSlice';
import { resetCartAsync } from '../Cart/CartSlice';

function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(()=>{
        dispatch(signOutAsync());
        dispatch(signOutUserAsync());
    })

  return (
    <>
    {!user && <Navigate to="/" replace={true}></Navigate>}
    </>
  )
}

export default Logout