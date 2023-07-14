import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { resetPasswordAsync} from './authSlice';
import { toast } from 'react-hot-toast';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');
  const email = query.get('email');

  return (
    <>
      {(token && email) ? <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="icons8-sneakers-6490.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
              dispatch(resetPasswordAsync({email,token, password : data.password}));
            })}>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: "- at least 8 characters are required\n- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n - Can contain special characters"
                      }
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className='text-red-500 text-xs'>{errors?.password?.message}</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "password not matching",
                      validate: (value, formValues) => value === formValues.password || 'password not matching'
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className='text-red-500 text-xs'>{errors?.confirmPassword?.message}</p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={e => (toast('Password is Set', {
                    duration: 4000,
                    position: 'top-center',
                  
                    // Styling
                    style: {
                      border: '1px solid black',
                      background: 'black',
                      color : 'white',
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
                  }))}
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
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
      </div> : <p>Incorrect Link</p>}
    </>
  );
}