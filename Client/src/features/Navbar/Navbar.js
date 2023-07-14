import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../Cart/CartSlice'
import { selectLoggedInUser } from '../Auth/authSlice';
import { selectUserInfo } from '../user/userSlice';

const navigation = [
  { name: 'Products', link: '/', user: true, admin:true },
  { name: 'Admin', link: '/admin', admin: true },
  { name: 'Orders', link: '/admin/orders', admin: true },
];
const userNavigation = [
  { name: 'My Account', link: '/profile' },
  { name: 'My Orders', link: '/orders' },
  { name: 'Sign out', link: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const user123 = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-black">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link to="/">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12"
                          src="icons8-sneakers-64 (1).png"
                          alt="Your Company"
                        />
                      </div>
                    </Link>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (item[userInfo?.role] ? <Link
                          key={item.name}
                          to={item.link}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link> : null ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    {user123 !== null ? <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="rounded-full bg-black-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="inline-flex items-center justify-center rounded-md bg-black p-2 text-gray-400 hover:bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XMarkIcon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <Bars3Icon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute cursor-pointer right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? 'bg-gradient-to-br from-pink-500 to-orange-400 cursor-pointer' : '',
                                      'block px-4 py-2 text-sm text-white cursor-pointer'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div> :
                      <div className='mt-2'>
                        <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                          <Link to="/signup">SignUp</Link></button>

                        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
                        bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                          <Link to='/signin' className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-black rounded-md group-hover:bg-opacity-0">
                            Sign In
                          </Link>
                        </button>
                      </div>}

                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <div className="flex items-center px-3">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 rounded-full bg-black p-1 text-gray-400 hover:text-white 
                          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />

                        </button>
                      </Link>
                      {items.length > 0 && <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>}
                    </div>
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-black p-2 text-gray-400 hover:bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (item[userInfo?.role] ? 
                    <Link
                      key={item.name}
                      to={item.link}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link> : null
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  {user123 !== null ?
                    <>
                      <div className=" space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <Link
                            key={item.name}
                            as="a"
                            to={item.link}
                            className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </> :
                    <div className='mt-0 px-6'>
                      <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        <Link to="/signup">SignUp</Link></button>

                      <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <Link to='/signin' className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-black rounded-md group-hover:bg-opacity-0">
                          Sign In
                        </Link>
                      </button>
                    </div>}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>


        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default NavBar;