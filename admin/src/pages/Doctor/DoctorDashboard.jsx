import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorDashboard = () => {
  const { doctorProfile, appointments, patients, loading } = useContext(DoctorContext)
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    totalPatients: 0
  })

  useEffect(() => {
    if (appointments.length > 0) {
      const totalAppointments = appointments.length
      const pendingAppointments = appointments.filter(app => app.status === 'pending').length
      const confirmedAppointments = appointments.filter(app => app.status === 'confirmed').length
      const completedAppointments = appointments.filter(app => app.status === 'completed').length
      const cancelledAppointments = appointments.filter(app => app.status === 'cancelled').length
      const totalPatients = patients.length

      setStats({
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
        totalPatients
      })
    }
  }, [appointments, patients])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Doctor Dashboard</h1>
      
      {doctorProfile && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-medium mb-2">Welcome, Dr. {doctorProfile.name}</h2>
          <p className="text-gray-600">{doctorProfile.speciality} | {doctorProfile.degree}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Appointments</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalAppointments}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Pending Appointments</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Confirmed Appointments</h3>
          <p className="text-3xl font-bold text-green-600">{stats.confirmedAppointments}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Completed Appointments</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.completedAppointments}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Cancelled Appointments</h3>
          <p className="text-3xl font-bold text-red-600">{stats.cancelledAppointments}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Patients</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalPatients}</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Recent Appointments</h3>
        {appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.slice(0, 5).map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(appointment.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No appointments found</p>
        )}
      </div>
    </div>
  )
}

export default DoctorDashboard