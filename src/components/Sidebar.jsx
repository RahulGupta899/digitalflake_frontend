import React from 'react'
import { BiSolidRightArrow } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { modules } from '../consts/common'

const Sidebar = () => {
    return (
        <div className="w-64 border bg-[#F4F4F4] h-[calc(100vh-5rem)] pt-7">
            {
                modules.map((module,idx) => {
                    return (
                        <NavLink 
                            key={`sidbar-${idx}`} 
                            to={module?.path} 
                            className={({ isActive }) => { return `flex justify-between px-2 items-center  h-16 border border-gray-50 ${isActive ? 'bg-[#F4EDAF]' : ''}` }}
                        >
                            <div className="flex justify-center items-center text-md">
                                <div className="mr-6 text-2xl ml-4">
                                    <module.icon />
                                </div>
                                <div>{module?.name}</div>
                            </div>
                            <BiSolidRightArrow />
                        </NavLink>
                    )
                })
            }
        </div>
    )
}

export default Sidebar
