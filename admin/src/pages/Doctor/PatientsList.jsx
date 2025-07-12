import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const PatientsList = () => {
  const { doctorInfo, appointments, getDoctorInfo, getDoctorAppointments } = useContext(DoctorContext)
  const [patients, setPatients] = useState([])

  useEffect(() => {
    getDoctorInfo()
  }, [])

  useEffect(() => {
    if (doctorInfo) {
      getDoctorAppointments()
    }
  }, [doctorInfo])

  useEffect(() => {
    if (appointments.length > 0) {
      // Extract unique patients from appointments
      const uniquePatients = Array.from(
        new Map(
          appointments.map(app => [
            app.patientEmail,
            {
              name: app.patientName,
              email: app.patientEmail,
              lastAppointment: new Date(app.appointmentDate),
              appointmentsCount: 1,
              status: app.status
            }
          ])
        ).values()
      )

      // Count appointments for each patient
      appointments.forEach(app => {
        const patient = uniquePatients.find(p => p.email === app.patientEmail)
        if (patient) {
          patient.appointmentsCount = appointments.filter(a => a.patientEmail === app.patientEmail).length
          // Update last appointment date if this one is more recent
          const appDate = new Date(app.appointmentDate)
          if (appDate > patient.lastAppointment) {
            patient.lastAppointment = appDate
            patient.status = app.status
          }
        }
      })

      setPatients(uniquePatients)
    }
  }, [appointments])

  return (
    <div className="m-5 w-full">
      <h1 className="text-2xl font-medium mb-6">My Patients</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {patients.length === 0 ? (
          <p className="text-center py-4">No patients found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Patient Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Total Appointments</th>
                  <th className="py-2 px-4 border-b text-left">Last Appointment</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{patient.name}</td>
                    <td className="py-2 px-4 border-b">{patient.email}</td>
                    <td className="py-2 px-4 border-b">{patient.appointmentsCount}</td>
                    <td className="py-2 px-4 border-b">
                      {patient.lastAppointment.toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${patient.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : patient.status === 'confirmed' ? 'bg-green-100 text-green-800' : patient.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                        {patient.status}
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

export default PatientsList