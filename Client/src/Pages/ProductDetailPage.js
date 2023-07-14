import React from 'react';
import ProductDetails from '../features/Product/Components/ProductDetails';
import Navbar from '../features/Navbar/Navbar';

function ProductDetailPage() {
  return (
    <Navbar>
      <ProductDetails></ProductDetails>
    </Navbar>
  )
}

export default ProductDetailPage