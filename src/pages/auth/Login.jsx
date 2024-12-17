import React, { useState } from "react";
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiShow } from "react-icons/bi";
import { GrHide } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import authenticationAPI from "../../api/hooks/authenticationApi";
const loginFormSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email.' }),
  password: z.string()
    .min(1, { message: 'Password is required.' })
});

const Login = () => {

  // Component States and Dependencies
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {loading, login} = authenticationAPI();

  // Form Handlers
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
    }
  });
  
  // Submit Form
  const submitLoginForm = async (formFields) => {
    console.log("Form Fields: ", formFields)
    await login(formFields);
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submitLoginForm)}>
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email Address
        </label>
        <input
          {...register('email')}
          disabled={loading}
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C218B] focus:outline-none"
        />
        {errors?.email?.message && <div className="text-xs text-red-500 my-2">{errors?.email?.message}</div>}
      </div>
      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <div className="relative">
          <input
            {...register('password')}
            disabled={loading}
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C218B] focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700"
          >
            {passwordVisible ? <BiShow /> : <GrHide />}
          </button>
        </div>
        {errors?.password?.message && <div className="text-xs text-red-500 my-2">{errors?.password?.message}</div>}
      </div>
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-[#5C218B] hover:bg-[#5C218B] rounded-lg focus:ring-2 focus:ring-[#5C218B] focus:outline-none flex justify-center"
        >
          {loading && (
            <FaSpinner className="w-5 h-5 mr-2 text-white animate-spin" />
          )}
          Log In
        </button>
      </div>
      {/* Additional Options */}
      <div className="text-center text-sm text-gray-500">
        <Link to='/forget-password' className="hover:underline">Forgot your password?
        </Link>
      </div>
    </form>
  );
};

export default Login;
