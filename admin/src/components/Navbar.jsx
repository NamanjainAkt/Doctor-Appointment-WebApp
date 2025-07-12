import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ userType }) => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken, doctorProfile } = useContext(DoctorContext)
    const navigate = useNavigate()
    
    const logout = () => {
        navigate('/')
        if (userType === 'admin' && aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        } else if (userType === 'doctor' && dToken) {
            setDToken('')
            localStorage.removeItem('dToken')
        }
    }
    
    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                    {userType === 'admin' ? 'Admin' : 'Doctor'}
                </p>
                {userType === 'doctor' && doctorProfile && (
                    <p className='ml-2 text-sm font-medium'>Dr. {doctorProfile.name}</p>
                )}
            </div>
            <button 
                onClick={logout} 
                className='bg-[#5f6fff] text-white text-sm px-10 py-2 rounded-full hover:bg-[#7581ec] transition-all duration-300 ease-in-out'
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar
