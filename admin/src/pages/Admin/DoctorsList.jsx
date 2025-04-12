import React from 'react'

const DoctorsList = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Doctors List</h1>
      <div className="grid gap-4">
        <div className="border p-4 rounded-lg shadow">
          <p className="font-medium">No doctors found</p>
          <p className="text-gray-500">Add doctors to see them listed here</p>
        </div>
      </div>
    </div>
  )
}

export default DoctorsList
