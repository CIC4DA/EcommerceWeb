import React from 'react';
import NavBar from '../features/Navbar/Navbar';
import AdminOrders from '../features/Admin/Components/AdminOrders';

export default function AdminOrdersPage() {
  return (
    <div>
        <NavBar>
            <AdminOrders></AdminOrders>
        </NavBar>
    </div>
  )
}