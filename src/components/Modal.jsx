import React, { useState, useEffect } from "react";
import { IoMdWarning } from "react-icons/io";

const Modal = ({ reason, helperText, onClose, actionCallback }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm 
      ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
    >
      <div
        className={`bg-white w-[500px] p-6 rounded-lg shadow-lg transform transition-transform duration-300 
        ${isVisible ? "scale-100" : "scale-90"}`}
      >
        {/* Reason */}
        <div className="flex flex-col items-center mb-4">
          <span className="text-4xl">
            <IoMdWarning className="text-red-600" />
          </span>
          <h2 className="text-xl font-bold mt-2">{reason}</h2>
        </div>

        {/* Helper Text */}
        <p className="text-gray-500 text-center mb-6">
          {helperText}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleClose}
            className="h-10 w-28 border border-gray-400 rounded-full text-gray-500 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={()=>{actionCallback(); handleClose();}}
            className="h-10 w-28 bg-[#662671] text-white rounded-full hover:bg-white hover:text-black hover:border hover:border-gray-400 transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
