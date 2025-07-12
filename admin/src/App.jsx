import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import AdminContextProvider from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'
import DoctorContextProvider from './context/DoctorContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'

// Import Doctor pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import PatientsList from './pages/Doctor/PatientsList'

const App = () => {
  return (
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContent />
      </DoctorContextProvider>
    </AdminContextProvider>
  )
}

const AppContent = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  if (aToken) {
    return (
      <div className='bg-[#f8f9fd]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointments' element={<AllAppointments/>} />
            <Route path='/add-doctor' element={<AddDoctor/>} />
            <Route path='/doctors-list' element={<DoctorsList/>} />
          </Routes>
        </div>
      </div>
    )
  } else if (dToken) {
    return (
      <div className='bg-[#f8f9fd]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<DoctorDashboard />} />
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<DoctorAppointments />} />
            <Route path='/doctor-profile' element={<DoctorProfile />} />
            <Route path='/patients-list' element={<PatientsList />} />
          </Routes>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    )
  }
}

export default App
