import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorPatients = () => {
  const { patients, loading } = useContext(DoctorContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPatients, setFilteredPatients] = useState([])

  useEffect(() => {
    if (patients.length > 0) {
      if (searchTerm.trim() === '') {
        setFilteredPatients(patients)
      } else {
        const term = searchTerm.toLowerCase()
        setFilteredPatients(patients.filter(patient => 
          patient.name.toLowerCase().includes(term) || 
          patient.email.toLowerCase().includes(term)
        ))
      }
    }
  }, [patients, searchTerm])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Patients</h1>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search patients by name or email..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f6fff]" 
        />
      </div>
      
      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{patient.name}</h2>
                <p className="text-gray-600 mb-4">{patient.email}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium">{patient.gender || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500">Age</p>
                    <p className="font-medium">{patient.age || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{patient.phone || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500">Appointments</p>
                    <p className="font-medium">{patient.appointmentCount}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-500 mb-1">Last Visit</p>
                  <p className="font-medium">{patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'No visits yet'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No patients found</p>
        </div>
      )}
    </div>
  )
}

export default DoctorPatients