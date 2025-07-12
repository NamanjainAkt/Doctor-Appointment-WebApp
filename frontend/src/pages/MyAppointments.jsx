import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PaymentGateway from '../components/PaymentGateway'

const MyAppointments = () => {
  const { appointments, currencySymbol, cancelAppointment } = useContext(AppContext)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  const handlePayment = (appointment) => {
    setSelectedAppointment(appointment)
    setShowPaymentModal(true)
  }

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId)
      toast.success('Appointment cancelled successfully')
    } catch (error) {
      console.error('Cancel appointment error:', error)
      toast.error(error.message || 'Failed to cancel appointment')
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
              <img className='w-32 bg-indigo-50' src={item.doctor.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Adress:</p>
              <p className='text-xs'>{item.doctor.address.address1}</p>
              <p className='text-xs'>{item.doctor.address.address2}</p>
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
                    onClick={() => handlePayment(item)}
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
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-white text-xl font-bold z-10 hover:text-gray-300"
            >
              ×
            </button>
            <PaymentGateway 
              appointment={selectedAppointment}
              onClose={() => setShowPaymentModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MyAppointments
