import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { user, token, logout } = useContext(AppContext);
  return (
    <div className='flex justify-between items-center py-4 test-sm mb-5 border-b border-b-gray-400'>
      <img onClick={() => { navigate('/'); scrollTo(0, 0) }} src={assets.logo} className='w-44 cursor-pointer' />
      <ul className='hidden md:flex items-start gap-5 font-medium '>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to="http://localhost:5175">
        <li><div className='bg-gray-950 py-1 px-4 rounded-full'><span className='name text-[12px]'>Ask &nbsp; <span className='text-[18px] font-light'>Aushadhi</span></span></div></li>
        <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {token
          ? <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full ' src={user?.image || assets.profile_pic} alt="" />
            <span className='text-sm font-medium'>{user?.name?.split(' ')[0] || 'User'}</span>
            <img className='w-2.5 group-hover:rotate-180 transition-all duration-300' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
                <p onClick={() => navigate('/my-profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/my-appointment')} className='cursor-pointer hover:text-black'>My Appointments</p>
                <p onClick={() => {
                  logout();
                  navigate('/');
                }} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          </div>
          : <button onClick={() => navigate('/login')} className='bg-[#5f6fff] text-white px-8 py-2 rounded-full font-light hidden md:block cursor-pointer'>Create Account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* ------------------{mobile menu} ------------------*/}
        <div className={` ${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded  inline-block'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded  inline-block'>All Doctors</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded  inline-block'>About</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded  inline-block'>Contact Us</p></NavLink>
            <NavLink  to="http://localhost:5175"><p className='px-4 py-2 rounded  inline-block'>Ask Aushadhi</p></NavLink>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar
