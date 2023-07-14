import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
  updateUserAsync
} from './userSlice';
import { useForm } from "react-hook-form";
import { resetPasswordInsideUserAsync, resetPasswordRequestUserAsync } from '../Auth/authSlice';
import {Link} from 'react-router-dom';

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const orders = useSelector(selectUserOrders);
  const passlink = useSelector((state) => state.auth.resetPasswordLink);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync())
    dispatch(resetPasswordRequestUserAsync(user.email));
  }, [dispatch])

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    // console.log(newU)
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  }
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  }

  const handleEditForm = (e, index) => {
    setSelectedEditIndex(index);
  };

  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  }

  return (
    <>
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {user.firstname} {user.lastname}
            </h1>
            <h3 className="text-l font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
              Email Address : {user.email}
            </h3>
            {user.role === "admin" && <h3 className="text-l font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
              Role : {user.role}
            </h3>}
          </div>
          <div>
          <Link
          to = {passlink}
            type="submit"
            className="rounded-md my-5 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset Password
          </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="text-xl font-bold leading-7 text-gray-900 mb-3">Latest Order</div>
          {
            orders.slice(0)
              .reverse().map((order, index) => (
                <div>
                  {index === 0 ? <div className='border border-2 border-black px-4'>

                    <div className="mt-3 bg-white px-0 sm:px-0 lg:px-0">
                      <div className="mx-auto max-w-7xl px-0 py-6 sm:px-0 lg:px-0">
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
                    </div>
                  </div> : null}
                </div>
              ))
          }

        </div>


        <div className="mt-4 border-b border-gray-900/10 pb-6 px-6">
          {/* Address LIST */}
          <div className='mt-1 flex justify-between'>
            <h2 className="text-xl font-bold leading-7 text-gray-900 mb-3">Your Addresses</h2>
          </div>

          {/* Address LIST */}
          <ul role="list" className="divide-y divide-gray-100">
            {user.addresses.map((address, index) => (
              <div>
                {selectedEditIndex === index ? (
                  <EditAddress selectedEditIndex={selectedEditIndex} index={index} setSelectedEditIndex={setSelectedEditIndex} handleEdit={handleEdit} address={address}> </EditAddress>
                ) : null}
                <div key={index} className="flex justify-between gap-x-6 py-3 border-solid border-2 border-black px-6">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-l font-semibold leading-6 text-black">{address.firstname} {address.lastname}</p>
                      <p className="mt-1 truncate text-xs leading-5 font-semibold text-black">{address.street}</p>
                      <p className="mt-1 truncate text-xs leading-5 font-semibold text-black">{address.city} , {address.state}</p>

                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="mt-1 truncate text-xs leading-5 font-semibold text-black">Phone : {address.phoneno}</p>
                    <p className="mt-1 truncate text-xs leading-5 font-semibold text-black">{address.pincode}</p>

                    <div className='flex items-center justify-end gap-x-6 pb-4'>
                      <button
                        onClick={(e) => handleEditForm(e, index)}
                        type="button"
                        className="font-medium hover:text-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, index)}
                        type="button"
                        className="font-medium hover:text-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </ul>
        </div>
        <AddNewAddress setShowAddAddressForm={setShowAddAddressForm} handleAdd={handleAdd} showAddAddressForm={showAddAddressForm} setSelectedEditIndex={setSelectedEditIndex} ></AddNewAddress>

      </div>
    </>
  );
}

function AddNewAddress({ handleAdd, setShowAddAddressForm, showAddAddressForm, setSelectedEditIndex }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className=" border-b border-gray-200 sm:px-6">
        <button
          onClick={e => { setShowAddAddressForm(true); setSelectedEditIndex(-1) }}
          type="submit"
          className="rounded-md my-5 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New Address
        </button>
        {showAddAddressForm ? (
          <form
            className="bg-white px-0 py-3"
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              handleAdd(data);
              reset();
            })}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Add Address
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button"
                  onClick={e => {
                    setShowAddAddressForm(false);
                  }}
                  className="text-sm font-semibold leading-6 text-gray-900">
                  Cancel
                </button>
                <button type="button"
                  onClick={e => {
                    reset();
                  }}
                  className="text-sm font-semibold leading-6 text-gray-900">
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}

function EditAddress({ selectedEditIndex, index, handleEdit, setSelectedEditIndex, address }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('firstname', address.firstname);
    setValue('lastname', address.lastname);
    setValue('email', address.email);
    setValue('phoneno', address.phoneno);
    setValue('pincode', address.pincode);
    setValue('city', address.city);
    setValue('country', address.country);
    setValue('street', address.street);
    setValue('state', address.state);
  });


  return (
    <form
      className="bg-white px-5 py-12 mt-12"
      noValidate
      onSubmit={handleSubmit((data) => {
        handleEdit(data, index);
        reset();
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Edit Address
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={(e) => setSelectedEditIndex(-1)}
            type="submit"
            className="rounded-md px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit Address
          </button>
        </div>
      </div>
    </form>
  );
}