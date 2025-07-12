import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { doctorProfile, updateDoctorProfile, loading } = useContext(DoctorContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    speciality: '',
    degree: '',
    experience: '',
    fees: '',
    about: '',
    address1: '',
    address2: '',
    image: null
  })
  const [previewImage, setPreviewImage] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (doctorProfile) {
      const address = doctorProfile.address ? JSON.parse(doctorProfile.address) : { address1: '', address2: '' }
      setFormData({
        name: doctorProfile.name || '',
        email: doctorProfile.email || '',
        speciality: doctorProfile.speciality || '',
        degree: doctorProfile.degree || '',
        experience: doctorProfile.experience || '',
        fees: doctorProfile.fees || '',
        about: doctorProfile.about || '',
        address1: address.address1 || '',
        address2: address.address2 || '',
        image: null
      })
      setPreviewImage(doctorProfile.image || '')
    }
  }, [doctorProfile])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      
      // Only append fields that have changed
      Object.keys(formData).forEach(key => {
        if (key === 'address1' || key === 'address2') {
          return // Handle address separately
        }
        
        if (key === 'image' && formData[key]) {
          formDataToSend.append(key, formData[key])
        } else if (key !== 'image' && formData[key] !== doctorProfile[key]) {
          formDataToSend.append(key, formData[key])
        }
      })
      
      // Combine addresses
      const currentAddress = doctorProfile.address ? JSON.parse(doctorProfile.address) : { address1: '', address2: '' }
      if (formData.address1 !== currentAddress.address1 || formData.address2 !== currentAddress.address2) {
        formDataToSend.append('address', JSON.stringify({
          address1: formData.address1,
          address2: formData.address2
        }))
      }
      
      await updateDoctorProfile(formDataToSend)
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Update error:', error)
      toast.error('Failed to update profile')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-[#5f6fff] text-white px-4 py-2 rounded-md hover:bg-[#4b59ff] transition-all duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {!isEditing ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-gray-50">
              <img 
                src={previewImage || 'https://via.placeholder.com/150'} 
                alt="Doctor" 
                className="w-40 h-40 object-cover rounded-full border-4 border-[#5f6fff]" 
              />
              <h2 className="mt-4 text-xl font-semibold">Dr. {doctorProfile?.name}</h2>
              <p className="text-gray-600">{doctorProfile?.speciality}</p>
              <p className="text-gray-600">{doctorProfile?.degree}</p>
            </div>
            
            <div className="md:w-2/3 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-500 text-sm">Email</h3>
                  <p className="font-medium">{doctorProfile?.email}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-500 text-sm">Experience</h3>
                  <p className="font-medium">{doctorProfile?.experience}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-500 text-sm">Consultation Fee</h3>
                  <p className="font-medium">${doctorProfile?.fees}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-500 text-sm">Address</h3>
                  <p className="font-medium">
                    {doctorProfile?.address ? (
                      <>
                        {JSON.parse(doctorProfile.address).address1}<br />
                        {JSON.parse(doctorProfile.address).address2}
                      </>
                    ) : 'No address provided'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-gray-500 text-sm mb-2">About</h3>
                <p className="text-gray-800">{doctorProfile?.about || 'No information provided'}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          <div className="mb-6 flex flex-col items-center">
            <img 
              src={previewImage || 'https://via.placeholder.com/150'} 
              alt="Doctor" 
              className="w-40 h-40 object-cover rounded-full border-4 border-[#5f6fff] mb-4" 
            />
            <label className="bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 transition-all duration-300">
              Change Photo
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f6fff]" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f6fff]" 
                required 
                disabled 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Speciality</label>
              <select 
                name="speciality" 
                value={formData.speciality} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f6fff]" 
                required
              >
                <option value="General physician">General physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Gynecologist">Gynecologist</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Degree</label>
              <input 
                type="text" 
                name="degree" 
                value={formData.degree} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f6fff]" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Experience</label>
              <select 
                name="experience" 
                value={formData.experience} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f6fff]" 
                required
              >
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
                <option value="6 years">6 years</option>
                <option value="7 years">7 years</option>
                <option value="8 years">8 years</option>
                <option value="9 years">9 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Consultation Fee ($)</label>
              <input 
                type="number" 
                name="fees" 
                value={formData.fees} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f6fff]" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Address Line 1</label>
              <input 
                type="text" 
                name="address1" 
                value={formData.address1} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f6fff]" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Address Line 2</label>
              <input 
                type="text" 
                name="address2" 
                value={formData.address2} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f6fff]" 
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-gray-700 mb-2">About</label>
            <textarea 
              name="about" 
              value={formData.about} 
              onChange={handleInputChange} 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f6fff] h-32" 
              required 
            ></textarea>
          </div>
          
          <div className="mt-6 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-[#5f6fff] text-white px-4 py-2 rounded-md hover:bg-[#4b59ff] transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default DoctorProfile