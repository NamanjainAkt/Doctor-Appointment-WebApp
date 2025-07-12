import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { aToken, backendUrl, doctors, getAllDoctors } = useContext(AdminContext)
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    totalPatients: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllDoctors()
    fetchDashboardStats()
    fetchRecentAppointments()
  }, [aToken])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard-stats`, {
        headers: { authorization: `Bearer ${aToken}` }
      })

      if (data.success) {
        setStats(data.stats)
      } else {
        toast.error(data.message || 'Failed to fetch dashboard stats')
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      toast.error(error.response?.data?.message || 'Failed to fetch dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentAppointments = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${backendUrl}/api/admin/recent-appointments`, {
        headers: { authorization: `Bearer ${aToken}` }
      })

      if (data.success) {
        setRecentAppointments(data.appointments)
      } else {
        toast.error(data.message || 'Failed to fetch recent appointments')
      }
    } catch (error) {
      console.error('Error fetching recent appointments:', error)
      toast.error(error.response?.data?.message || 'Failed to fetch recent appointments')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="m-5 w-full">
      <h1 className="text-2xl font-medium mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Doctors</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalDoctors}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Appointments</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalAppointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Patients</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalPatients}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Confirmed</h3>
          <p className="text-3xl font-bold text-green-600">{stats.confirmedAppointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Completed</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.completedAppointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Cancelled</h3>
          <p className="text-3xl font-bold text-red-600">{stats.cancelledAppointments}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium mb-4">Recent Appointments</h2>
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : recentAppointments.length === 0 ? (
          <p className="text-center py-4">No recent appointments</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Time</th>
                  <th className="py-2 px-4 border-b text-left">Doctor</th>
                  <th className="py-2 px-4 border-b text-left">Patient</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="py-2 px-4 border-b">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{appointment.appointmentTime}</td>
                    <td className="py-2 px-4 border-b">{appointment.doctor.name}</td>
                    <td className="py-2 px-4 border-b">{appointment.patientName}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                        {appointment.status}
                      </span>
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

export default Dashboard
