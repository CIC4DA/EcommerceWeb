import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../user/userSlice'; 
import { selectLoggedInUser } from './authSlice';

function ProtectedAdmin({children}) {
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectUserInfo);
    console.log(userInfo.role);


    if(!user){
        return <Navigate to='/signin' replace={true}></Navigate>
    }
    if(user && userInfo.role != 'admin'){
        return <Navigate to='/' replace={true}></Navigate>
    }
    return children;
}

export default ProtectedAdmin