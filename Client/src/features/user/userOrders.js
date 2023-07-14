import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchLoggedInUserOrdersAsync,
    selectUserInfo,
    selectUserOrders
} from './userSlice';
import { Navigate } from 'react-router-dom'

export default function UserOrders() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const orders = useSelector(selectUserOrders);

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync())
    }, [dispatch])

    return (
        <div>
            {orders.length === 0 && <Navigate to="/noorder"></Navigate>}
            {
                orders.slice(0)
                .reverse().map((order,index) => (
                    <div>
                        
                        <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8 border-2 border-black">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                    Order #{order.id}
                                    
                                </h1>
                                <div className="flex justify-between text-l font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
                                    Order status : {order.status}
                                    {index === 0 ? <p>Latest</p> : null}
                                </div>                                
                            </div>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {order.items.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.product.thumbnail}
                                                        alt={item.product.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={item.product.id}>{item.product.title}</a>
                                                            </h3>
                                                            <p className="ml-4">$ {Math.round(item.product.price * (1 - item.product.discountPercentage / 100))}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">
                                                            <label htmlFor="quantity" className="inline mr-3  text-sm font-medium leading-6 text-gray-900">
                                                                Qty : {item.quantity}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                            <div className="border-t border-b border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$ {order.totalAmount}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total Items </p>
                                    <p>{order.totalItemCount} items</p>
                                </div>
                            </div>

                            <div className="mt-4 border-b border-gray-900/10 pb-4 px-4">
                                <h2 className="text-xl font-semibold leading-7 text-gray-900 mb-3">Shipping Address</h2>
                                {/* Address LIST */}
                                <div key={order.id} className="flex justify-between gap-x-6 py-4 border-solid border-2 border-gray px-3">
                                    <div className="flex gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm-2 font-semibold leading-6 text-gray-900">{order.selectedAddress.firstname} {order.selectedAddress.lastname}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-900">{order.selectedAddress.street}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-900">{order.selectedAddress.city} , {order.selectedAddress.state}</p>

                                        </div>
                                    </div>
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-900">Phone : {order.selectedAddress.phoneno}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-900">{order.selectedAddress.pincode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}