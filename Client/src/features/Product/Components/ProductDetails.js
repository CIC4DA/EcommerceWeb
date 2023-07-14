import { useEffect, useState, Fragment } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup, Dialog, Transition } from '@headlessui/react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductListStatus, selectProductbyId } from '../ProductSlice';
import {
  fetchProductbyIdAsync
} from '../ProductSlice';
import { addtocartAsync, fetchItemsbyUserIdAsync, selectItems } from '../../Cart/CartSlice'
import { selectUserInfo } from '../../user/userSlice';
import { MutatingDots } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/outline'
import Accordions from './Accordions';

const colors = [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
];

const sizes = [
  { name: '7', inStock: false },
  { name: '8', inStock: true },
  { name: '9', inStock: true },
  { name: '10', inStock: true },
  { name: '11', inStock: true },
  { name: '12', inStock: true },
];

const tabledata = [
  { uk: 6, us: 7, eu: 41, footlengthcm: 25, footlengthin: 9.80 },
  { uk: 7, us: 8, eu: 42, footlengthcm: 26, footlengthin: 10.20 },
  { uk: 8, us: 9, eu: 43, footlengthcm: 27, footlengthin: 10.60 },
  { uk: 9, us: 10, eu: 44, footlengthcm: 28, footlengthin: 11.00 },
  { uk: 10, us: 11, eu: 45, footlengthcm: 29, footlengthin: 11.40 },
  { uk: 11, us: 12, eu: 46, footlengthcm: 30, footlengthin: 11.81 },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[2])
  const product = useSelector(selectProductbyId);
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const params = useParams();
  const status = useSelector(selectProductListStatus);
  const [open, setOpen] = useState(false);

  const handleClickCart = (e) => {
    e.preventDefault();
    if (user) {
      if (items.findIndex(item => item.product.id === product.id) < 0) {
        const newItem = { product: product.id, quantity: 1, user: user.id };
        dispatch(addtocartAsync(newItem));
        toast('Item Added to cart', {
          duration: 4000,
          position: 'top-center',

          // Styling
          style: {
            border: '1px solid black',
            background: 'black',
            color: 'white',
          },
          className: '',

          // Custom Icon
          icon: '👏',

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
        toast.error('Item Already Added to Cart', {
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
    }
    else {
      // TODO go to sign in page
      toast.error('Please Sign In First', {
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
  }

  const handleClickSize = (e) => {
    e.preventDefault();
    setOpen(true);
  }

  useEffect(() => {
    dispatch(fetchProductbyIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
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
      {product &&
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs && product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.images[3]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 mb-10">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center justify-between">
                <p className="text-3xl tracking-tight text-gray-900">$ {Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                <div className="flex justify-between">
                    <div className="text-xl font-medium text-gray-400" style={{ textDecoration: 'line-through' }} >$ {product.price}</div>
                    <div className="text-xl font-medium text-gray-400" > ({product.discountPercentage}% off)</div>
                  </div>                
              </div>
              <div className="mt-3 flex items-center">
                  <p className='font-medium'>Rating:&nbsp;</p>
                  <div className="flex justify-center">
                    {product.rating} {' '}
                    <StarIcon
                      key={product.rating}
                      className='text-black h-5 w-5 flex-shrink-0'
                      aria-hidden="true"
                    />
                  </div>
                </div>

              <form className="mt-6">
                {/* Sizes */}
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <button onClick={e => handleClickSize(e)} className="text-sm font-medium text-black hover:text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
                      Size guide
                    </button>
                  </div>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 lg:grid-cols-3">
                      {sizes && sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              active ? 'ring-2 ring-black' : '',
                              'group relative flex items-center justify-center rounded-md border-2 border-black py-3 px-4 text-sm font-medium uppercase hover:bg-gradient-to-br from-pink-500 to-orange-400 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-black' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  onClick={(e) => (
                    handleClickCart(e)
                  )}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gradient-to-br from-pink-500 to-orange-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>

              </form>
            </div>

            <div className="mt-12 py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div class="container mx-auto">

              </div>
              <div className='mt-12'>
                    <Accordions category={product.category} brand={product.brand}></Accordions>
              </div>
            </div>
          </div>
        </div>
      }
      {/* sizeguide */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div>
                      {/* table */}
                      <div className="flex flex-col">
                        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                              <table className="min-w-full">
                                <thead className="bg-white border-b">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                      UK
                                    </th>
                                    <th
                                      scope="col"
                                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                      US
                                    </th>
                                    <th
                                      scope="col"
                                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                      EU
                                    </th>
                                    <th
                                      scope="col"
                                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                      Foot Length
                                      (CM)
                                    </th>
                                    <th
                                      scope="col"
                                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                      Foot Length
                                      (IN)
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tabledata.map((data) => <tr className="bg-gray-100 border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                      {data.uk}
                                    </td>
                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap text-center">
                                      {data.us}
                                    </td>
                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap text-center">
                                      {data.eu}
                                    </td>
                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap text-center">
                                      {data.footlengthcm}
                                    </td>
                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap text-center">
                                      {data.footlengthin}
                                    </td>
                                  </tr>

                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}