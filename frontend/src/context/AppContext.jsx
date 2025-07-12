import { createContext, useState, useEffect } from "react";

export const AppContext = createContext()
const AppContextProvider = (props) => {
    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const currencySymbol = '₹'

    // Fetch doctors from the backend
    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/doctors')
            if (response.ok) {
                const data = await response.json()
                if (data.success && data.doctors) {
                    setDoctors(data.doctors)
                }
            } else {
                console.error('Failed to fetch doctors')
            }
        } catch (error) {
            console.error('Error fetching doctors:', error)
        }
    }

    useEffect(() => {
        // Fetch doctors on component mount
        fetchDoctors()
        
        // Load user data from localStorage
        const userInfo = localStorage.getItem('userInfo')
        const userToken = localStorage.getItem('userToken')
        
        if (userInfo && userToken) {
            setUser(JSON.parse(userInfo))
            setToken(userToken)
            
            // Fetch appointments from the backend
            const fetchAppointments = async () => {
                try {
                    const parsedUserInfo = JSON.parse(userInfo)
                    const response = await fetch(`http://localhost:4000/api/appointments/patient/${parsedUserInfo.email}`, {
                        headers: {
                            'Authorization': `Bearer ${userToken}`
                        }
                    })
                    
                    if (response.ok) {
                        const data = await response.json()
                        if (data.success && data.appointments) {
                            setAppointments(data.appointments)
                            // Update localStorage with the latest appointments
                            localStorage.setItem('appointments', JSON.stringify(data.appointments))
                        }
                    } else {
                        console.error('Failed to fetch appointments')
                        // Fallback to localStorage if API fails
                        const savedAppointments = localStorage.getItem('appointments')
                        if (savedAppointments) {
                            setAppointments(JSON.parse(savedAppointments))
                        }
                    }
                } catch (error) {
                    console.error('Error fetching appointments:', error)
                    // Fallback to localStorage if API fails
                    const savedAppointments = localStorage.getItem('appointments')
                    if (savedAppointments) {
                        setAppointments(JSON.parse(savedAppointments))
                    }
                }
            }
            
            fetchAppointments()
        } else {
            // Load saved appointments from localStorage if user is not logged in
            const savedAppointments = localStorage.getItem('appointments')
            if (savedAppointments) {
                setAppointments(JSON.parse(savedAppointments))
            }
        }
    }, [])

    // Save appointments to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments))
    }, [appointments])

    const API_BASE_URL = 'http://localhost:4000/api/appointments';

    const addAppointment = async (appointment) => {
        try {
            const userToken = localStorage.getItem('userToken');
            const response = await fetch(`${API_BASE_URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(appointment)
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Failed to create appointment:', errorData)
                throw new Error(errorData.message || 'Failed to create appointment')
            }

            const data = await response.json()
            
            if (data.success && data.appointment) {
                // Get the doctor details to enrich the appointment data
                const doctor = doctors.find(doc => doc._id === appointment.doctorId)
                const enrichedAppointment = {
                    ...data.appointment,
                    image: doctor?.image,
                    name: doctor?.name,
                    speciality: doctor?.speciality,
                    address: doctor?.address,
                    fees: doctor?.fees
                }
                
                // Update local state with the new appointment
                setAppointments(prev => [...prev, enrichedAppointment])
                
                // Update localStorage
                const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
                localStorage.setItem('appointments', JSON.stringify([...savedAppointments, enrichedAppointment]))
                
                return enrichedAppointment
            }
        } catch (error) {
            console.error('Error adding appointment:', error)
            throw error
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const userToken = localStorage.getItem('userToken')
            if (!userToken) {
                console.error('User token not found')
                return
            }

            // Make API call to update appointment status in the database
            const response = await fetch(`http://localhost:4000/api/appointments/status/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ status: 'cancelled' })
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Failed to update appointment status:', errorData)
                throw new Error(errorData.message || 'Failed to update appointment status')
            }

            // Update local state only after successful API call
            setAppointments(prev => prev.map(appointment => 
                appointment._id === appointmentId 
                    ? {...appointment, status: 'cancelled'} 
                    : appointment
            ))
            
            // Update localStorage
            const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
            const updatedAppointments = savedAppointments.map(appointment => 
                appointment._id === appointmentId 
                    ? {...appointment, status: 'cancelled'} 
                    : appointment
            )
            localStorage.setItem('appointments', JSON.stringify(updatedAppointments))
        } catch (error) {
            console.error('Error cancelling appointment:', error)
            throw error
        }
    }

    // Logout function
    const logout = () => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userToken')
        setUser(null)
        setToken(null)
    }
    
    const value = {
        doctors,
        currencySymbol,
        appointments,
        addAppointment,
        cancelAppointment,
        user,
        token,
        setUser,
        setToken,
        logout
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider