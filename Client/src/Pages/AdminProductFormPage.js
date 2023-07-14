import React from 'react';
import Navbar from '../features/Navbar/Navbar';
import ProductForm from '../features/Admin/Components/ProductForm';

function AdminProductFormPage() {
  return (
    <Navbar>
      <ProductForm></ProductForm>
    </Navbar>
  )
}

export default AdminProductFormPage