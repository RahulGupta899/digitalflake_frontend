import { useState } from 'react'
import { CgProfile } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { localStorageRemove } from '../api/generalSetup';
import Modal from './Modal';

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="bg-[#662671] h-20 flex justify-between items-center px-4 cursor-pointer">
      <Link to='/home'>
        <img src='/images/logo.svg' className='h-16 w-54 rounded-sm' />
      </Link>
      <CgProfile
        color="white"
        size={42}
        onClick={() => { setShowModal((state) => !state) }}
      />
      {
        showModal
        &&
        <Modal
          reason="Log Out"
          helperText="Are you sure you want to log out?"
          onClose={() => { setShowModal(false) }}
          actionCallback={() => {
            setTimeout(()=>{
              localStorageRemove();
              navigate('/')
            },500)
          }}
        />
      }
    </div>
  )
}

export default Header
