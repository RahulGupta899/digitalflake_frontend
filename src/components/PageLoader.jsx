import React from 'react'
import { FaSpinner } from "react-icons/fa";

const PageLoader = () => {
    return (
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div
                className="w-[80px] py-2 px-4 text-white bg-transparent flex justify-center"
            >
                <FaSpinner 
                    size={35} 
                    className=" rounded-full transition-all duration-550 ease-in-out mr-2 text-[#5C218B] animate-spin z-20"
                />
            </div>
        </div>
    )
}

export default PageLoader;
