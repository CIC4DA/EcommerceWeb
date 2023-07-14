import React, { useEffect, useState } from 'react'
import { ITEMS_PER_PAGE } from '../../../app/constant';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectAllOrders, numberofTotalOrders, updateOrderAsync } from '../../Order/OrderSlice';
import { XMarkIcon, EyeIcon, PencilIcon,ArrowDownIcon,ArrowUpIcon } from '@heroicons/react/24/outline'
import Pagination from '../../pagination/Pagination';
import "./scroll.css";

function AdminOrders() {
    const dispatch = useDispatch();
    const [page, setpage] = useState(1);
    const orders = useSelector(selectAllOrders);
    const totalOrders = useSelector(numberofTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const [sort, setSort] = useState({});


    const handleShow = (e, order) => {

    }

    const handleEdit = (e, order) => {
        setEditableOrderId(order.id);
    }
    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value }
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);
    }

    const chooseColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-purple-200 text-purple-600';
            case 'Dispatched':
                return 'bg-yellow-200 text-yellow-600';
            case 'Delivered':
                return 'bg-green-200 text-green-600';
            case 'Canceled':
                return 'bg-red-200 text-red-600';
            default:
                return 'bg-purple-200 text-purple-600';
        }
    };

    const handlePage = (page) => {
        setpage(page);
    }
    const handleSort = (sortOption) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        setSort(sort);
    };


    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync({ sort, pagination }));
    }, [dispatch, sort, page]);


    return (
        <>
            {/* component */}
            <div className=''>
                <div className="min-w-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans dj">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto ">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th
                                            className="py-3 px-6 text-left cursor-pointer"
                                            onClick={(e) =>
                                                handleSort({
                                                    sort: 'id',
                                                    order: sort?._order === 'asc' ? 'desc' : 'asc',
                                                })
                                            }
                                        >
                                            Order# {' '}
                                            {sort._sort === 'id' &&
                                                (sort._order === 'asc' ? (
                                                    <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                                ) : (
                                                    <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                                ))}
                                        </th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-left">Quantity</th>
                                        <th className="py-3 px-6 text-left">Price</th>
                                        <th
                                            className="py-3 px-6 text-left cursor-pointer"
                                            onClick={(e) =>
                                                handleSort({
                                                    sort: 'totalAmount',
                                                    order: sort?._order === 'asc' ? 'desc' : 'asc',
                                                })
                                            }
                                        >
                                            Total Amount {' '}
                                            {sort._sort === 'totalAmount' &&
                                                (sort._order === 'asc' ? (
                                                    <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                                ) : (
                                                    <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                                ))}
                                        </th>
                                        <th className="py-3 px-6 text-center">Selected Address</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.map((order,index) =>
                                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2">
                                                    </div>
                                                    <span className="font-medium">{index+1}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {order.items.map((item) => <div className="flex items-center mt-1">
                                                    <div className="mr-2">
                                                        <img
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.product.thumbnail}
                                                        />
                                                    </div>
                                                    <span className='font-medium'>{item.product.title}</span>
                                                </div>)}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {order.items.map((item) => <div className="items-center text-center mt-1">
                                                    <span className='font-medium text-center'>{item.quantity}</span>
                                                </div>)}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {order.items.map((item) => <div className="flex items-center mt-1">
                                                    <span className='font-medium '>$ {Math.round(item.product.price * (1 - item.product.discountPercentage / 100))}</span>
                                                </div>)}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex  font-medium items-center justify-center">
                                                    $ {order.totalAmount}
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="font-normal items-center justify-center">
                                                    <div>
                                                        {order.selectedAddress.street}
                                                    </div>
                                                    <div>
                                                        {order.selectedAddress.city}, {order.selectedAddress.state}
                                                    </div>
                                                    <div>
                                                        {order.selectedAddress.pincode}, Ph : {order.selectedAddress.phoneno}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {order.id !== editableOrderId ?
                                                    <span
                                                        className={`${chooseColor(
                                                            order.status
                                                        )} py-1 px-3 rounded-full text-xs`}
                                                    >
                                                        {order.status}
                                                    </span> :
                                                    <select onChange={e => handleUpdate(e, order)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                        <option value="Status">Status</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Dispatched">Dispatched</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Canceled">Canceled</option>
                                                    </select>}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <EyeIcon className='w-5 h-5 cursor-pointer' onClick={e => handleShow(e, order)}></EyeIcon>
                                                    </div>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <PencilIcon className='w-5 h-5 cursor-pointer' onClick={e => handleEdit(e, order)}></PencilIcon>
                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <p className='text-xs text-blue-500'>*Click on Total Amount to Sort</p>
                <Pagination page={page} setpage={setpage} handlePage={handlePage} totalItems={totalOrders}></Pagination>
            </div>
        </>

    )
}

export default AdminOrders