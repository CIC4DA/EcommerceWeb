import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLoggedInUser,
  logInUserAsync,
  selectError
} from './authSlice';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function SignIn() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const user = useSelector(selectLoggedInUser);
  const backenderror = useSelector(selectError);

  return (
    <>
      {user && <Navigate to='/' replace={true}></Navigate>}
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className='flex'>
              <img
                className="mx-auto h-12 w-12"
                src="icons8-sneakers-6490.png"
                alt="The Shoe Company"
              />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
              dispatch(logInUserAsync({ email: data.email, password: data.password }));
              // console.log(data);
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link to="/forgotpassword" className="font-semibold text-black hover:text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required"
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className='text-red-500 text-xs'>{errors?.password?.message}</div>
                  {backenderror && <div className='text-red-500 text-xs'>{backenderror || backenderror.message}</div>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-br from-pink-500 to-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              New Here?{' '}
              <Link to="/signup" className="font-semibold leading-6 text-black hover:text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
                Create a New Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}