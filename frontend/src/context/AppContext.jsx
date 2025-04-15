import { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext()
const AppContextProvider = (props) => {
    const [appointments, setAppointments] = useState([])
    const currencySymbol = '₹'
    const mockUser = {
        name: "John Doe",
        email: "john@example.com"
    }
    const mockToken = "mock-token-12345"

    useEffect(() => {
        // Set mock user data in localStorage
        localStorage.setItem('userInfo', JSON.stringify(mockUser))
        localStorage.setItem('userToken', mockToken)
        
        // Load saved appointments from localStorage
        const savedAppointments = localStorage.getItem('appointments')
        if (savedAppointments) {
            setAppointments(JSON.parse(savedAppointments))
        }
    }, [])

    // Save appointments to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments))
    }, [appointments])

    const addAppointment = (appointment) => {
        const newAppointment = {
            ...appointment,
            _id: Date.now().toString(),
            image: doctors.find(doc => doc._id === appointment.doctorId)?.image,
            name: doctors.find(doc => doc._id === appointment.doctorId)?.name,
            speciality: doctors.find(doc => doc._id === appointment.doctorId)?.speciality,
            address: doctors.find(doc => doc._id === appointment.doctorId)?.address,
            fees: doctors.find(doc => doc._id === appointment.doctorId)?.fees,
            status: 'pending'
        }
        setAppointments(prev => [...prev, newAppointment])
    }

    const cancelAppointment = (appointmentId) => {
        setAppointments(prev => prev.filter(appointment => appointment._id !== appointmentId))
        // Remove from localStorage immediately
        const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
        const updatedAppointments = savedAppointments.filter(appointment => appointment._id !== appointmentId)
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments))
    }

    const value = {
        doctors,
        currencySymbol,
        appointments,
        addAppointment,
        cancelAppointment,
        user: mockUser,
        token: mockToken
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider