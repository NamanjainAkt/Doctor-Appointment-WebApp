import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MyAppointments = () => {
  const { appointments, currencySymbol, cancelAppointment } = useContext(AppContext)

  const handlePayment = async (appointmentId, amount, doctorName) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const userToken = localStorage.getItem('userToken')

      if (!userToken || !userInfo) {
        toast.error('Please login to make payment')
        return
      }

      if (!amount || amount <= 0) {
        toast.error('Invalid payment amount')
        return
      }

      const response = await fetch('http://localhost:4000/api/payments/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          appointmentId,
          amount,
          doctorName
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.message || 'Payment server error')
        return
      }

      const data = await response.json()
      if (data.success && data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.message || 'Failed to initiate payment')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Failed to initiate payment')
    }
  }

  const handleCancelAppointment = (appointmentId) => {
    try {
      cancelAppointment(appointmentId)
      toast.success('Appointment cancelled successfully')
    } catch (error) {
      console.error('Cancel appointment error:', error)
      toast.error('Failed to cancel appointment')
    }
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Adress:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text--sm mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {new Date(item.appointmentDate).toLocaleDateString()} | {item.appointmentTime}
              </p>
              <p className='text-sm mt-1'>
                <span className='text-neutral-700 font-medium'>Fees:</span> {currencySymbol}{item.fees}
              </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end' >
              {item.status === 'pending' && (
                <>
                  <button 
                    onClick={() => handlePayment(item._id, item.fees, item.name)}
                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white hover:scale-110 transition-all duration-300 ease-in-out'
                  >
                    Pay Online
                  </button>
                  <button 
                    onClick={() => handleCancelAppointment(item._id)}
                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white hover:scale-110 transition-all duration-300 ease-in-out'
                  >
                    Cancel Appointment
                  </button>
                </>
              )}
              {item.status === 'cancelled' && (
                <div className='text-sm text-red-500 text-center sm:min-w-48 py-2'>
                  Cancelled
                </div>
              )}
              {item.status === 'confirmed' && (
                <div className='text-sm text-green-500 text-center sm:min-w-48 py-2'>
                  Confirmed
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
