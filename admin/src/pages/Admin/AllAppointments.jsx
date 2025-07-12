import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AllAppointments = () => {
  const { aToken, backendUrl } = useContext(AdminContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [filteredAppointments, setFilteredAppointments] = useState([])

  useEffect(() => {
    fetchAllAppointments()
  }, [aToken])

  useEffect(() => {
    if (filter === 'all') {
      setFilteredAppointments(appointments)
    } else {
      setFilteredAppointments(appointments.filter(app => app.status === filter))
    }
  }, [appointments, filter])

  const fetchAllAppointments = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${backendUrl}/api/admin/all-appointments`, {
        headers: { authorization: `Bearer ${aToken}` }
      })

      if (data.success) {
        setAppointments(data.appointments)
      } else {
        toast.error(data.message || 'Failed to fetch appointments')
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
      toast.error(error.response?.data?.message || 'Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      setLoading(true)
      const { data } = await axios.put(
        `${backendUrl}/api/appointments/status/${appointmentId}`,
        { status },
        { headers: { authorization: `Bearer ${aToken}` }}
      )

      if (data.success) {
        toast.success(data.message)
        fetchAllAppointments()
      } else {
        toast.error(data.message || 'Failed to update appointment status')
      }
    } catch (error) {
      console.error('Error updating appointment status:', error)
      toast.error(error.response?.data?.message || 'Failed to update appointment status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="m-5 w-full">
      <h1 className="text-2xl font-medium mb-6">All Appointments</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('pending')} 
          className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
        >
          Pending
        </button>
        <button 
          onClick={() => setFilter('confirmed')} 
          className={`px-4 py-2 rounded-md ${filter === 'confirmed' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Confirmed
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
        <button 
          onClick={() => setFilter('cancelled')} 
          className={`px-4 py-2 rounded-md ${filter === 'cancelled' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          Cancelled
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-center py-4">No appointments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Time</th>
                  <th className="py-2 px-4 border-b text-left">Doctor</th>
                  <th className="py-2 px-4 border-b text-left">Patient Name</th>
                  <th className="py-2 px-4 border-b text-left">Patient Email</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="py-2 px-4 border-b">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{appointment.appointmentTime}</td>
                    <td className="py-2 px-4 border-b">{appointment.doctor.name}</td>
                    <td className="py-2 px-4 border-b">{appointment.patientName}</td>
                    <td className="py-2 px-4 border-b">{appointment.patientEmail}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <select 
                        className="border rounded px-2 py-1"
                        value={appointment.status}
                        onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
                        disabled={loading}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="completed">Complete</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments
