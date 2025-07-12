import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const { user, token, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  
  const [userData, setUserData] = useState({
    name: "",
    image: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: ""
    },
    gender: "",
    dob: ""
  })
  
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Redirect if not logged in
  useEffect(() => {
    if (!token || !user) {
      navigate('/login')
      return
    }
    
    // Load user data from context
    if (user) {
      setUserData({
        name: user.name || "",
        image: user.image || assets.profile_pic,
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || { line1: "", line2: "" },
        gender: user.gender || "",
        dob: user.dob || ""
      })
    }
  }, [user, token, navigate])
  
  const handleSave = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }
      
      // Update localStorage and context with new user data
      localStorage.setItem('userInfo', JSON.stringify(data))
      setUser(data)
      
      toast.success('Profile updated successfully')
      setIsEdit(false)
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image || assets.profile_pic} alt="User profile" />
      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-col-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <p>
                <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" /> <br />
                <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
              </p>
              : <p className='text-gray-500'>
                {userData.address.line1} <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {isEdit
          ? <button 
                className='border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white hover:scale-110 transition-all duration-300 ease-in-out' 
                onClick={handleSave}
                disabled={loading}
            >
                {loading ? 'Saving...' : 'Save Information'}
            </button>
          : <button className='border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all' onClick={() => setIsEdit(true)} >Edit</button>}
      </div>

      <ToastContainer />
    </div>
  )
}

export default MyProfile
