import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    updateCartAsync,
    deleteItemsFromCartAsync,
    selectItems
} from '../features/Cart/CartSlice';
import { Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { updateUserAsync } from '../features/user/userSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/Order/OrderSlice';
import { selectUserInfo } from '../features/user/userSlice';
import { toast } from 'react-hot-toast';


function Checkout() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true)
    const items = useSelector(selectItems);
    const totalAmount = items.reduce((amount, item) => (Math.round(item.product.price * (1 - item.product.discountPercentage / 100))) * item.quantity + amount, 0);
    const totalItemCount = items.reduce((amount, item) => item.quantity + amount, 0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const user = useSelector(selectUserInfo);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const curretOrder = useSelector(selectCurrentOrder);

    const handleQuantity = (e, item) => {
        dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
    }

    const handleRemove = (e, id) => {
        dispatch(deleteItemsFromCartAsync(id));
    }

    const handleAddress = (e) => {
        setSelectedAddress(user.addresses[e.target.value]);
    }
    const handlepayment = (e) => {
        setPaymentMethod(e.target.value);
    }
    const handleOrder = () => {
        if (selectedAddress === null && paymentMethod === null) {
            toast.error('Please Select a Address and Payment method', {
                duration: 4000,
                position: 'top-center',
      
                // Styling
                style: {
                  border: '1px solid black',
                  background: 'rgb(255, 255, 255)',
                  color: 'black'
                },
                className: '',
      
                // Custom Icon
                // icon: '👏',
      
                // Change colors of success/error/loading icon
                iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
                },
      
                // Aria
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              });
        }
        else if(selectedAddress === null){
            toast.error('Please Select a Address', {
                duration: 4000,
                position: 'top-center',
      
                // Styling
                style: {
                  border: '1px solid black',
                  background: 'rgb(255, 255, 255)',
                  color: 'black'
                },
                className: '',
      
                // Custom Icon
                // icon: '👏',
      
                // Change colors of success/error/loading icon
                iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
                },
      
                // Aria
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              });
        }
        else if(paymentMethod === null){
            toast.error('Please Select a Payment method', {
                duration: 4000,
                position: 'top-center',
      
                // Styling
                style: {
                  border: '1px solid black',
                  background: 'rgb(255, 255, 255)',
                  color: 'black'
                },
                className: '',
      
                // Custom Icon
                // icon: '👏',
      
                // Change colors of success/error/loading icon
                iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
                },
      
                // Aria
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              });
        }
        else {
            const order = { items, totalAmount, totalItemCount, user: user.id, paymentMethod, selectedAddress, status: 'Pending' }
            dispatch(createOrderAsync(order));
        }

    }

    return (
        <>
            {!items.length && <Navigate to='/' replace={true}></Navigate>}
            {curretOrder && curretOrder.paymentMethod === 'cash' && <Navigate to={`/order-success/${curretOrder.id}`} replace={true}></Navigate>}
            {curretOrder && curretOrder.paymentMethod === 'card' && <Navigate to={`/stripe-checkout`} replace={true}></Navigate>}
            <div className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className=" lg:col-span-3 mb-12">
                        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                            <form className="bg-white px-5" noValidate onSubmit={handleSubmit((data) => {
                                dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }));
                                reset();
                                toast.success('Address Added', {
                                    duration: 4000,
                                    position: 'top-center',

                                    // Styling
                                    style: {
                                        border: '1px solid black',
                                        background: 'rgb(255, 255, 255)',
                                        color: 'black'
                                    },
                                    className: '',

                                    // Custom Icon
                                    // icon: '👏',

                                    // Change colors of success/error/loading icon
                                    iconTheme: {
                                        primary: '#000',
                                        secondary: '#fff',
                                    },

                                    // Aria
                                    ariaProps: {
                                        role: 'status',
                                        'aria-live': 'polite',
                                    },
                                });
                                // console.log(data);
                            })}>                                <div className="space-y-4">
                                    <div className="mx-auto max-w-7xl px-0 py-6 sm:px-0 lg:px-0 border-b">
                                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                            Personal Details
                                        </h1>
                                    </div>

                                    <div className="border-b border-gray-900/10 pb-4">
                                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Address</h2>
                                        <div className="mt-1 text-sm leading-6 text-gray-600">
                                            Choose from existing Address
                                        </div>

                                        {/* Address LIST */}
                                        <ul role="list" className="divide-y divide-gray-100">
                                            {user.addresses.map((address, index) => (
                                                <li key={index} className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray px-3">
                                                    <div className="flex gap-x-4">
                                                        <input
                                                            onChange={handleAddress}
                                                            id="address"
                                                            name="address"
                                                            value={index}
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                                                        />
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm-2 font-semibold leading-6 text-gray-900">{address.firstname} {address.lastname}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-900">{address.street}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-900">{address.city} , {address.state}</p>

                                                        </div>
                                                    </div>
                                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-900">Phone : {address.phoneno}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-900">{address.pincode}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-10 space-y-10 border-t py-4">
                                            <fieldset>
                                                <legend className="text-xl font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">Please Choose a Payment Method</p>
                                                <div className="mt-6 space-y-3">
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="cash"
                                                            name="paymentMethod"
                                                            onChange={handlepayment}
                                                            value="cash"
                                                            type="radio"
                                                            checked={paymentMethod === "cash"}
                                                            className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                                                        />
                                                        <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Cash
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="card"
                                                            name="paymentMethod"
                                                            onChange={handlepayment}
                                                            value="card"
                                                            checked={paymentMethod === "card"}
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                                                        />
                                                        <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Card
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-900/10 pb-4">
                                        <h2 className="text-base text-xl font-semibold leading-7 text-gray-900">Add a New Address</h2>

                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    First name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('firstname', {
                                                            required: 'First Name is required'
                                                        })}
                                                        id="first-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    <p className='text-red-500 text-xs'>{errors?.firstname?.message}</p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Last name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('lastname', {
                                                            required: 'Last Name is required'
                                                        })}
                                                        id="last-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    <p className='text-red-500 text-xs'>{errors?.lastname?.message}</p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        {...register('email', {
                                                            required: 'Email is required'
                                                        })}
                                                        type="email"
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    <p className='text-red-500 text-xs'>{errors?.email?.message}</p>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="phoneno" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phone Number
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="phoneno"
                                                        {...register('phoneno', {
                                                            required: 'Phone Number is required',
                                                            pattern: {
                                                                value: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
                                                                message: 'Phone Number is not Valid'
                                                            }
                                                        })}
                                                        type="tel"
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    <p className='text-red-500 text-xs'>{errors?.phoneno?.message}</p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Country
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="country"
                                                        {...register('country', {
                                                            required: 'Country is required'
                                                        })}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option>India</option>
                                                        <option>United States</option>
                                                        <option>Canada</option>
                                                        <option>Mexico</option>
                                                    </select>
                                                    <p className='text-red-500 text-xs'>{errors?.country?.message}</p>
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Street address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('street', {
                                                            required: 'Street is required'
                                                        })}
                                                        id="street"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    <p className='text-red-500 text-xs'>{errors?.street?.message}</p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2 sm:col-start-1">
                                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                    City
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('city', {
                                                            required: 'City is required'
                                                        })}
                                                        id="city"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    /><p className='text-red-500 text-xs'>{errors?.city?.message}</p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                    State / Province
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('state', {
                                                            required: 'state is required'
                                                        })}
                                                        id="state"

                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    <p className='text-red-500 text-xs'>{errors?.state?.message}</p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
                                                    ZIP / Postal code
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('pincode', {
                                                            required: 'Pincode is required'
                                                        })}
                                                        id="pincode"

                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    <p className='text-red-500 text-xs'>{errors?.pincode?.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div >

                                <div className="mt-4 flex items-center justify-end gap-x-6 pb-4">
                                    <button type="button"
                                        onClick={e => {
                                            reset();
                                        }}
                                        className="text-sm font-semibold leading-6 text-black hover:text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Address
                                    </button>
                                </div>
                            </form >
                        </div>
                    </div>
                    <div className=" lg:col-span-2">
                        <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                    Cart
                                </h1>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <li key={item.product.id} className="flex py-6">
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
                                                            <div className='flex justify-between'>
                                                            <p className="ml-4">$&nbsp;</p>
                                                            <p>{Math.round(item.product.price * (1 - item.product.discountPercentage / 100))}</p>
                                                            </div>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">
                                                            <label htmlFor="quantity" className="inline mr-3  text-sm font-medium leading-6 text-gray-900">
                                                                Qty
                                                            </label>
                                                            <select
                                                                value={item.quantity}
                                                                onChange={(e) => handleQuantity(e, item)}
                                                                id="quantitySelect"
                                                                name="quantitySelect"
                                                                className="inline rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            >
                                                                <option>{item.quantity}</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex">
                                                            <button
                                                                onClick={(e) => handleRemove(e, item.id)}
                                                                type="button"
                                                                className="font-medium hover:text-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$ {totalAmount}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total Items </p>
                                    <p>{totalItemCount} items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <div
                                        onClick={handleOrder}
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400"
                                    >
                                        Order Now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <div>
                                        or{' '}
                                        <Link to="/">
                                            <button
                                                type="button"
                                                className="font-medium text-black hover:text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout