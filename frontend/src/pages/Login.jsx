import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const navigate = useNavigate()
  const { setUser, setToken } = useContext(AppContext)
  
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Check if user is already logged in
  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    const userInfo = localStorage.getItem('userInfo')
    
    if (userToken && userInfo) {
      navigate('/')
    }
  }, [])
  
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    
    try {
      if (state === 'Sign Up') {
        // Register new user
        if (!name || !email || !password) {
          toast.error('All fields are required')
          setLoading(false)
          return
        }
        
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        })
        
        const data = await response.json()
        
        if (data.success) {
          // Save user data and token
          localStorage.setItem('userToken', data.token)
          localStorage.setItem('userInfo', JSON.stringify(data.user))
          
          // Update context
          if (setUser && setToken) {
            setUser(data.user)
            setToken(data.token)
          }
          
          toast.success('Registration successful!')
          navigate('/')
        } else {
          toast.error(data.message || 'Registration failed')
        }
      } else {
        // Login user
        if (!email || !password) {
          toast.error('Email and password are required')
          setLoading(false)
          return
        }
        
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        
        const data = await response.json()
        
        if (data.success) {
          // Save user data and token
          localStorage.setItem('userToken', data.token)
          localStorage.setItem('userInfo', JSON.stringify(data.user))
          
          // Update context
          if (setUser && setToken) {
            setUser(data.user)
            setToken(data.token)
          }
          
          toast.success('Login successful!')
          navigate('/')
        } else {
          toast.error(data.message || 'Login failed')
        }
      }
    } catch (error) {
      console.error('Authentication error:', error)
      toast.error('An error occurred. Please try again.')
    }
    
    setLoading(false)
  }
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold '>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
          <p>Please {state === 'Sign Up' ? "Sign Up" : "Login"} to book appointment</p>
          {
            state === "Sign Up" && <div className='w-full'>
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
          }
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className='bg-[#5f6fff] text-white w-full py-2 rounded-md text-base hover:bg-[#4a5aee] transition-colors'
          >
            {loading ? "Processing..." : (state === 'Sign Up' ? "Create Account" : "Login")}
          </button>
          {
            state === 'Sign Up'
              ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-[#5f6fff] underline cursor-pointer'>Login here</span> </p>
              : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-[#5f6fff] underline cursor-pointer'>Click here</span> </p>
          }
        </div>
      </form>
    </>
  )
}

export default Login
