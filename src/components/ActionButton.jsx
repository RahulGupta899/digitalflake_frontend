import React from 'react'

const ActionButton = ({isCTA, name, onClickHandler}) => {
    return (
        <button 
            type={isCTA ? 'submit' : 'button'}
            className={` ${!isCTA ? ' "h-10 w-28 border transition-all duration-200 ease-in-out border-gray-400 rounded-full text-gray-500 hover:bg-gray-100' : 'h-10 w-28 bg-[#662671] text-white rounded-full hover:bg-white hover:text-black hover:border hover:border-gray-400'}`}
            onClick={onClickHandler}
        >
        {name}
        </button>
    )
}

export default ActionButton
