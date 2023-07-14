import React from 'react';
import NavBar from '../features/Navbar/Navbar';
import AdminProductList from '../features/Admin/Components/AdminProductList';

export default function AdminHome() {
  return (
    <div>
        <NavBar>
            <AdminProductList></AdminProductList>
        </NavBar>
    </div>
  )
}