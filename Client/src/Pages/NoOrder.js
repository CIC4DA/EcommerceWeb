import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../features/Navbar/Navbar';

function NoOrder() {
  return (
    <NavBar>
      <div className='bg-white'>
        <div className="grid min-h-full place-items-center bg-white px-6 py-48 sm:py-48 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">Currently you have no order</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">You have no order</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">I think you might want to add something</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default NoOrder;