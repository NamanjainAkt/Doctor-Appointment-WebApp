import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setAToken, backendUrl } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (state === 'Admin') {
                const {data} = await axios.post(`${backendUrl}/admin/login`, {
                    email,
                    password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                    navigate('/admin/doctors-list')
                    toast.success('Login successful')
                } else {
                    toast.error(data.message || 'Login failed')
                }
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error)
            toast.error(error.response?.data?.message || 'Login failed')
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-[#5f6fff]'>{state} Login</span></p>
                <div className='w-full'>
                    <p>Email</p>
                    <input 
                        onChange={(e)=> setEmail(e.target.value)} 
                        value={email} 
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                        type="email" 
                        autoComplete="username"
                        required 
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input 
                        onChange={(e)=> setPassword(e.target.value)} 
                        value={password} 
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                        type="password" 
                        autoComplete="current-password"
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base hover:bg-[#7581ec] hover:scale-110 transition-all duration-300 ease-in-out"
                >
                    Login
                </button>
                {state === 'Admin'
                    ? <p>Doctor Login? <span className='text-[#5f6fff] underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                    : <p>Admin Login? <span className='text-[#5f6fff] underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
