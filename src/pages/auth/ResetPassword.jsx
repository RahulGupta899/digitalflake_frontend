import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { GrHide } from "react-icons/gr";
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Regex } from '../../consts/regexNames';
import authenticationAPI from "../../api/hooks/authenticationApi";
const resetPasswordFormSchema = z.object({
    password: z.string()
        .min(1, { message: 'Password is required.' })
        .regex(Regex.PASSWORD, { message: 'Min 8 Chars: Alpha numeric with uppercase and special char.' }),
    confirmPassword: z.string()
        .min(1, { message: 'Confirm password is required.' })
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Please ensure both passwords are same.",
        path: ["confirmPassword"],
    }
);

const ResetPassword = () => {

    // Component States and Dependencies
    const { token } = useParams();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {loading,  resetPassword } = authenticationAPI();

    // Form Handlers
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
        }
    });

    // Submit Form
    const submitForm = async (formFields) => {
        formFields['token'] = token;
        await resetPassword(formFields);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                    New Password
                </label>
                <div className="relative">
                    <input
                        {...register('password')}
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
            {/* Confirm Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        {...register('confirmPassword')}
                        type={passwordVisible ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Enter confirm password"
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
                {errors?.confirmPassword?.message && <div className="text-xs text-red-500 my-2">{errors?.confirmPassword?.message}</div>}
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
                    <div className="mx-2">Reset Password</div>
                </button>
            </div>
            {/* Additional Options */}
            <div className="text-center text-sm text-gray-500"><Link to='/' className="hover:underline" >Sign In</Link>
            </div>
        </form>
    );
};

export default ResetPassword;
