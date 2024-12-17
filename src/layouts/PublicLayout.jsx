import { Outlet } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import { authorizationToken } from '../consts/localStorageKeyNames';

const PublicLayout = () => {
  const authorizationKey = window.localStorage.getItem(authorizationToken);
  if (authorizationKey) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="bg-[#5C218B33] flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <div className="text-2xl font-semibold text-center text-gray-700 mb-6 flex flex-col">
          <img src='/images/logo.svg' className='h-20 ' />
          <div className='text-sm text-gray-500'>Welcome to DigitalFlake Admin</div>
        </div>
        <Outlet />
      </div>
    </div>
  )
};

export default PublicLayout;




