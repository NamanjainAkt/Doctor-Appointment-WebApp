import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddDoctor = () => {
    const { aToken, backendUrl } = useContext(AdminContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        experience: '1 year',
        fees: '',
        speciality: 'General physician',
        education: '',
        address1: '',
        address2: '',
        image: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formDataToSend = new FormData()
            Object.keys(formData).forEach(key => {
                if (key === 'address1' || key === 'address2') {
                    return // Handle address separately
                }
                formDataToSend.append(key, formData[key])
            })
            // Combine addresses
            formDataToSend.append('address', JSON.stringify({
                address1: formData.address1,
                address2: formData.address2
            }))

            const response = await axios.post(`${backendUrl}/admin/add-doctor`, 
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'atoken': aToken
                    }
                }
            )

            if (response.data.success) {
                toast.success('Doctor added successfully')
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    experience: '1 year',
                    fees: '',
                    speciality: 'General physician',
                    education: '',
                    address1: '',
                    address2: '',
                    image: null
                })
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to add doctor')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <p className="text-2xl font-semibold mb-6">Add Doctor</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                    <label htmlFor="doc-img" className="cursor-pointer block">
                        <img src={assets.upload_area} alt="" className="mx-auto w-48 h-48 object-contain" />
                    </label>
                    <input
                        type="file"
                        id="doc-img"
                        hidden
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    <p className="mt-2 text-gray-600">Upload doctor<br />Picture</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <p className="mb-1">Your name</p>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <p className="mb-1">Doctor Email</p>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <p className="mb-1">Set Password</p>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <p className="mb-1">Experience</p>
                        <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded bg-white"
                        >
                            <option value="1 Year">1 Year</option>
                            <option value="2 Year">2 Year</option>
                            <option value="3 Year">3 Year</option>
                            <option value="4 Year">4 Year</option>
                            <option value="5 Year">5 Year</option>
                            <option value="6 Year">6 Year</option>
                            <option value="7 Year">7 Year</option>
                            <option value="8 Year">8 Year</option>
                            <option value="9 Year">9 Year</option>
                            <option value="10 Year">10 Year</option>
                        </select>
                    </div>

                    <div>
                        <p className="mb-1">Fees</p>
                        <input
                            type="number"
                            name="fees"
                            value={formData.fees}
                            onChange={handleInputChange}
                            placeholder="Doctor fees"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <p className="mb-1">Speciality</p>
                        <select
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded bg-white"
                        >
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div>
                        <p className="mb-1">Degree</p>
                        <input
                            type="text"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            placeholder="Degree"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <p className="mb-1">Address</p>
                        <input
                            type="text"
                            name="address1"
                            value={formData.address1}
                            onChange={handleInputChange}
                            placeholder="Address 1"
                            className="w-full p-2 border rounded mb-2"
                            required
                        />
                        <input
                            type="text"
                            name="address2"
                            value={formData.address2}
                            onChange={handleInputChange}
                            placeholder="Address 2"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <p className="mb-1">About Doctor</p>
                <textarea 
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    placeholder="Write about doctor"
                    className="w-full p-2 border rounded min-h-[100px]"
                    required 
                />
            </div>

            <button
                type="submit"
                className="mt-6 bg-[#5f6fff] text-white px-8 py-2 rounded hover:bg-[#7581ec] hover:scale-110 transition-all duration-300 ease-in-out"
            >
                Add Doctor
            </button>
        </form>
    )
}

export default AddDoctor


