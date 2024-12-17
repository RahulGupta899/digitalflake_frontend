import React from "react";
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import authenticationAPI from "../../api/hooks/authenticationApi";
const forgetPasswordFormSchema = z.object({
    email: z.string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Please enter a valid email.' })
});

const ForgetPassword = () => {
    // Component States and dependencies
    const {loading, forgetPassword } = authenticationAPI();
    // Form Handlers
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(forgetPasswordFormSchema),
        defaultValues: {
        }
    });
    // Submit Form
    const submitForgetPasswordForm = async (formFields) => {
        await forgetPassword(formFields, reset);
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(submitForgetPasswordForm)}>
            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email Address
                </label>
                <input
                    {...register('email')}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C218B] focus:outline-none"
                />
                {errors?.email?.message && <div className="text-xs text-red-500 my-2">{errors?.email?.message}</div>}
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
                    Request Reset Link
                </button>
            </div>

            {/* Additional Options */}
            <div className="text-center text-sm text-gray-500"><Link to='/' href="#" className="hover:underline" >Sign In</Link>
            </div>
        </form>
    );
};

export default ForgetPassword;
