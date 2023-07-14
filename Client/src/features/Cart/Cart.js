import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCartAsync,
  deleteItemsFromCartAsync,
  selectCartStatus,
  fetchItemsbyUserIdAsync
} from './CartSlice';
import { Link } from 'react-router-dom';
import { selectItems } from './CartSlice';
import { Navigate } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner';
import Modal from '../pagination/Modal'
import { selectUserInfo } from '../user/userSlice';


export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true)
  const items = useSelector(selectItems);
  const totalAmount = items.reduce((amount, item) => (Math.round(item.product.price * (1 - item.product.discountPercentage / 100))) * item.quantity + amount, 0);
  const totalItemCount = items.reduce((amount, item) => item.quantity + amount, 0);
  const status = useSelector(selectCartStatus);
  const [openModal, setOpenModal] = useState(null);  
  const user = useSelector(selectUserInfo);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  }

  const handleRemove = (e, id) => {
    dispatch(deleteItemsFromCartAsync(id));
  }

  return (
    <>
      {!items.length && <Navigate to='/emptycart' replace={true}></Navigate>}

      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          {status === 'loading' ? <MutatingDots
            height="100"
            width="100"
            color="#000000"
            secondaryColor='#000000'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> : null}
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
                        <p className="ml-4">$ {Math.round(item.product.price * (1 - item.product.discountPercentage / 100))}</p>
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
                          <option>{item.quantity} Current</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modal
                          title={`Remove ${item.product.title}`}
                          message="Are you sure you want to Remove this Cart item ?"
                          dangerOption="Remove"
                          cancelOption="Cancel"
                          dangerAction={(e) => handleRemove(e, item.id)}
                          cancelAction={() => setOpenModal(null)}
                          showModal={openModal === item.id}
                        ></Modal>
                        <button
                          onClick={e=>{setOpenModal(item.id)}}
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
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400"
            >
              Checkout
            </Link>
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
    </>
  );
}