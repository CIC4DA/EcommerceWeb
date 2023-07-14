import React from 'react';
import Navbar from '../features/Navbar/Navbar';
import AdminProductDetails from '../features/Admin/Components/AdminProductDetails';

function AdminProductDetailPage() {
  return (
    <Navbar>
      <AdminProductDetails></AdminProductDetails>
    </Navbar>
  )
}

export default AdminProductDetailPage