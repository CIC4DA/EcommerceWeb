import React from 'react';
import NavBar from '../features/Navbar/Navbar';
import ProductList from '../features/Product/Components/ProductList'

export default function Home() {
  return (
    <div>
        <NavBar>
            <ProductList></ProductList>
        </NavBar>
    </div>
  )
}