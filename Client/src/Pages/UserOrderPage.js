import React from 'react';
import Navbar from '../features/Navbar/Navbar';
import UserOrders from '../features/user/userOrders';

function UserOrderPage() {
  return (
    <Navbar>
      <UserOrders></UserOrders>
    </Navbar>
  )
}

export default UserOrderPage