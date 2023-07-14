import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { resetPasswordRequestAsync } from './authSlice';
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  return (
    <>
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="icons8-sneakers-6490.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter Your Email to reset Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
              dispatch(resetPasswordRequestAsync(data.email));
            })}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: 'Email is not Valid'
                      }
                    })}
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className='text-red-500 text-xs'>{errors?.email?.message}</p>

                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={e => (toast.success('Mail Sent', {
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
                  }))}
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Email
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Send me back to {' '}
              <Link to="/signin" className="font-semibold leading-6 text-black hover:text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
                Signin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}