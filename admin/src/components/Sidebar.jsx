import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    return (
        <div className='min-h-screen bg-white border-r'>
            {aToken && (
                <ul className='text-[#515151] mt-5'>
                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''} `} to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''} `} to={'/all-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Appointments</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''} `} to={'/add-doctor'}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Doctor</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''} `} to={'/doctors-list'}>
                        <img src={assets.people_icon} alt="" />
                        <p>Doctors List</p>
                    </NavLink>
                </ul>
            )}

            {dToken && (
                <ul className='text-[#515151] mt-5'>
                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''} `} to={'/doctor-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''} `} to={'/doctor-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Appointments</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''} `} to={'/doctor-profile'}>
                        <img src={assets.user_icon} alt="" />
                        <p>My Profile</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''} `} to={'/patients-list'}>
                        <img src={assets.people_icon} alt="" />
                        <p>Patients</p>
                    </NavLink>
                </ul>
            )}
        </div>
    )
}

export default Sidebar
