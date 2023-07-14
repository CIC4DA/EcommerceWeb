import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import NavBar from '../features/Navbar/Navbar';

const features = [
  {
    name: 'Push to deploy',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
]

function EmptyCartPage() {
  return (
    <NavBar>
      <div className='bg-white'>
        <div className="grid min-h-full place-items-center bg-white px-6 py-48 sm:py-48 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">Please Add product to Cart</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your Cart is Empty</h1>
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

export default EmptyCartPage;