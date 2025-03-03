import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const navigate=useNavigate();
  const [showMenu,setShowMenu]=useState(false);
  const [token,setToken]=useState(true);
  return (
    <div className='flex justify-between items-center py-4 test-sm mb-5 border-b border-b-gray-400'>
      <img src={assets.logo} className='w-44 cursor-pointer' />
      <ul className='hidden md:flex items-start gap-5 font-medium '>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {token
        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
          <img className='w-8 rounded-full ' src={assets.profile_pic} alt="" />
          <img className='w-2.5 group-hover:rotate-180 transition-all duration-300' src={assets.dropdown_icon} alt="" />
          <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p className='cursor-pointer hover:text-black'>My Appointments</p>
                <p className='cursor-pointer hover:text-black'>Logout</p>
              </div>
          </div>
        </div>
        :<button onClick={()=>navigate('/login')} className='bg-[#5f6fff] text-white px-8 py-2 rounded-full font-light hidden md:block cursor-pointer'>Create Account</button>
      }
      </div>
    </div>
  )
}

export default Navbar
