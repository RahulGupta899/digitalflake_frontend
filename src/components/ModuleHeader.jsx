import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const ModuleHeader = ({icon, name, searchText, setSearchText, path}) => {
  return (
    <div className=' py-4 flex_row_between px-4'>
        <div className='flex w-2/3 '>
         <div className='flex_row_centered text-xl'>
          <div className='text-3xl mr-4'>
          {React.createElement(icon)}
          </div>
          <div>{name}</div>
         </div>
          <div className="relative w-2/3 mt-1 ml-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CiSearch/>
            </div>
            <input
              id="search"
              name="search"
              placeholder="Search"
              value={searchText}
              onChange={(e)=>{setSearchText(e.target.value)}}
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C218B] focus:outline-none"
            />
          </div>
        </div>
        <Link
          to={path}
          className='bg-[#5C218B] p-2 text-white rounded-md'
        >Add New</Link>

      </div>
  )
}

export default ModuleHeader
