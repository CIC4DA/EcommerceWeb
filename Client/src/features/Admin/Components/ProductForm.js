
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchProductbyIdAsync, selectProductbyId, updateProductAsync } from '../../Product/ProductSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../pagination/Modal'

export default function ProductForm() {

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductbyId);
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductbyIdAsync(params.id));
    }
    else {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue('title', selectedProduct.title);
      setValue('brand', selectedProduct.brand);
      setValue('description', selectedProduct.description);
      setValue('price', selectedProduct.price);
      setValue('discountPercentage', selectedProduct.discountPercentage);
      setValue('stock', selectedProduct.stock);
      setValue('category', selectedProduct.category);
      setValue('thumbnail', selectedProduct.thumbnail);

      const image1 = selectedProduct.images[0];
      const image2 = selectedProduct.images[1];
      const image3 = selectedProduct.images[2];
      const image4 = selectedProduct.images[3];

      setValue('image1', image1);
      setValue('image2', image2);
      setValue('image3', image3);
      setValue('image4', image4);
    }
  }, [selectedProduct, params.id, setValue])

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    reset();

  }

  return (
    <>
      <form onSubmit={handleSubmit((data) => {
        const product = { ...data };
        product.images = [product.image1, product.image2, product.image3, product.image4];
        product.rating = product.rating || 1;

        delete product['image1'];
        delete product['image2'];
        delete product['image3'];
        delete product['image4'];

        product.price = +product.price;
        product.stock = +product.stock;
        product.rating = +product.rating;
        product.discountPercentage = +product.discountPercentage;

        if (params.id) {
          product.id = params.id;
          product.rating = selectedProduct.rating || 1;
          dispatch(updateProductAsync(product));
          console.log(product);
        }
        else {
          dispatch(createProductAsync(product));
        }
        reset();
      })}>
        <div className="space-y-12 bg-white p-6">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mx-auto max-w-7xl px-0 py-6 sm:px-0 lg:px-0 border-b">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Add New Product
              </h1>
            </div>
            <div className="mt-6  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 col-span-6 py-0">
                Add Product Details
              </h1>
              {selectedProduct && selectedProduct.deleted && <h2 className="text-red-500 sm:col-span-6">This product is deleted</h2>}

              <div className="sm:col-span-3">
                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Brand
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('brand', {
                      required: 'Brand is required'
                    })}
                    id="brand"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.brand?.message}</p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Category
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('category', {
                      required: 'Category is required'
                    })}
                    id="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.category?.message}</p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('title', {
                      required: 'Title is required'
                    })}
                    id="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.title?.message}</p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('price', {
                      required: 'Price is required',
                      min: 1
                    })}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.price?.message}</p>
              </div>



              <div className="sm:col-span-3">
                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Stocks
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('stock', {
                      required: 'Stocks is required'
                    })}
                    id="stock"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.stock?.message}</p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('discountPercentage', {
                      required: 'Discount Percentage is required',
                      min: 0,
                      max: 100
                    })}
                    id="discountPercentage"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.discountPercentage?.message}</p>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register('description', {
                      required: 'Description is required'
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.description?.message}</p>
              </div>


              <h1 className="text-xl font-bold tracking-tight text-gray-900 col-span-6 py-0">
                Add Product Images
              </h1>


              <div className="sm:col-span-6">
                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('thumbnail', {
                      required: 'Thumbnail is required'
                    })}
                    id="thumbnail"
                    placeholder='Enter Url of Thumbnail'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.thumbnail?.message}</p>
              </div>


              <div className="sm:col-span-3">
                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                  Image 1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('image1', {
                      required: 'Image 1 is required'
                    })}
                    id="image1"
                    placeholder='Enter Url of Image 1'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.image1?.message}</p>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                  Image 2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('image2', {
                      required: 'Image 2 is required'
                    })}
                    id="image2"
                    placeholder='Enter Url of Image 2'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.image2?.message}</p>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                  Image 3
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('image3', {
                      required: 'Image 3 is required'
                    })}
                    id="image3"
                    placeholder='Enter Url of Image 3'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.image3?.message}</p>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                  Image 4
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('image4', {
                      required: 'Image 4 is required'
                    })}
                    id="image4"
                    placeholder='Enter Url of Image 4'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className='text-red-500 text-xs'>{errors?.image4?.message}</p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            {selectedProduct && !selectedProduct.deleted && (
              <button
                onClick={(e) => { e.preventDefault(); setOpenModal(true) }}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>

      </form>
      {selectedProduct &&
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      }
    </>
  )
}