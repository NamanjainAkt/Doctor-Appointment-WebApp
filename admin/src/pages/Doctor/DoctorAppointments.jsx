import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify'

const DoctorAppointments = () => {
  const { appointments, updateAppointmentStatus, loading } = useContext(DoctorContext)
  const [filter, setFilter] = useState('all')
  const [filteredAppointments, setFilteredAppointments] = useState([])

  useEffect(() => {
    if (appointments.length > 0) {
      if (filter === 'all') {
        setFilteredAppointments(appointments)
      } else {
        setFilteredAppointments(appointments.filter(app => app.status === filter))
      }
    }
  }, [appointments, filter])

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus)
      toast.success(`Appointment status updated to ${newStatus}`)
    } catch (error) {
      console.error('Status update error:', error)
      toast.error('Failed to update appointment status')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Appointments</h1>
      
      <div className="mb-6 flex flex-wrap gap-2">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-[#5f6fff] text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('pending')} 
          className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Pending
        </button>
        <button 
          onClick={() => setFilter('confirmed')} 
          className={`px-4 py-2 rounded-md ${filter === 'confirmed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Confirmed
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Completed
        </button>
        <button 
          onClick={() => setFilter('cancelled')} 
          className={`px-4 py-2 rounded-md ${filter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Cancelled
        </button>
      </div>
      
      {filteredAppointments.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                        <div className="text-sm text-gray-500">{appointment.patientEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                        ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                        ${appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
                      `}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {appointment.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(appointment._id, 'confirmed')} 
                              className="text-green-600 hover:text-green-900"
                            >
                              Confirm
                            </button>
                            <button 
                              onClick={() => handleStatusChange(appointment._id, 'cancelled')} 
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(appointment._id, 'completed')} 
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Complete
                            </button>
                            <button 
                              onClick={() => handleStatusChange(appointment._id, 'cancelled')} 
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No {filter !== 'all' ? filter : ''} appointments found</p>
        </div>
      )}
    </div>
  )
}

export default DoctorAppointments