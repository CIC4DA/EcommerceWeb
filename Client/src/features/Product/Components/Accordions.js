import { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsbyFiltersAsync, selectAllProducts, selectProductListStatus } from "../ProductSlice";
import { Link } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { fetchProductsbyFilters } from "../ProductAPI";
import { ITEMS_PER_PAGE } from "../../../app/constant";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
 
export default function Accordions({category, brand}) {
  const [open, setOpen] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductListStatus);  
  const [page, setpage] = useState(1);  
  const [filter, setfilter] = useState({});
  const [sort, setsort] = useState({});
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  
  useEffect(()=>{
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsbyFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page])
 
  return (
    <Fragment>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          More {category}
        </AccordionHeader>
        <AccordionBody>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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
                    {products.map((product) => (
                      <>
                      { product.category === category &&
                        <Link to={`/productdetail/${product.id}`} key={product.id}>
                            <div key={product.id} className="group relative border-solid border-2 border-gray-100 p-2">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">
                                            <div href={product.thumbnail}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </div>
                                        </h3>
                                        {/* <p className="mt-1 text-sm text-gray-500"><StarIcon className="w-5 h-5 inline"></StarIcon><span className='align-bottom'> {product.rating}</span></p> */}
                                    </div>
                                </div>
                                <div className="mt-1 flex justify-between">
                                    <div className="text-sm text-base font-medium text-gray-900">$ {Math.round(product.price * (1 - product.discountPercentage / 100))}</div>
                                    <div className="flex justify-between">
                                        <div className="text-xs font-medium text-gray-400" style={{ textDecoration: 'line-through' }} >$ {product.price}</div>
                                        <div className="text-xs font-medium text-gray-400" > ({product.discountPercentage}% off)</div>
                                    </div>
                                </div>
                            </div>

                            {product.deleted && <p>Product Deleted</p>}
                        </Link>}
                        </>

                    ))}
                </div>
            </div>
        </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          More Product by {brand}
        </AccordionHeader>
        <AccordionBody>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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
                    {products.map((product) => (
                      <>
                      {product.brand ===brand &&
                        <Link to={`/productdetail/${product.id}`} key={product.id}>
                            <div key={product.id} className="group relative border-solid border-2 border-gray-100 p-2">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">
                                            <div href={product.thumbnail}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </div>
                                        </h3>
                                        {/* <p className="mt-1 text-sm text-gray-500"><StarIcon className="w-5 h-5 inline"></StarIcon><span className='align-bottom'> {product.rating}</span></p> */}
                                    </div>
                                </div>
                                <div className="mt-1 flex justify-between">
                                    <div className="text-sm text-base font-medium text-gray-900">$ {Math.round(product.price * (1 - product.discountPercentage / 100))}</div>
                                    <div className="flex justify-between">
                                        <div className="text-xs font-medium text-gray-400" style={{ textDecoration: 'line-through' }} >$ {product.price}</div>
                                        <div className="text-xs font-medium text-gray-400" > ({product.discountPercentage}% off)</div>
                                    </div>
                                </div>
                            </div>

                            {product.deleted && <p>Product Deleted</p>}
                        </Link>}
                        </>
                    ))}
                </div>
            </div>
        </div>
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}