import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '')
    const backendUrl = 'http://localhost:4000'
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(false)

    const changeAvailability = async (docId) => {
        try {
            setLoading(true)
            const {data} = await axios.post(`${backendUrl}/api/admin/change-availability`,
                {docId},
                {headers:{authorization: `Bearer ${aToken}`}}
            )
            if (data.success) {
                toast.success(data.message)
                await getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error changing availability')
        } finally {
            setLoading(false)
        }
    }

    const getAllDoctors = async () => {
        try {
            setLoading(true)
            const {data} = await axios.post(`${backendUrl}/api/admin/all-doctors`,
                {},
                {headers:{authorization: `Bearer ${aToken}`}}
            )
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching doctors')
        } finally {
            setLoading(false)
        }
    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        loading,
        getAllDoctors,
        changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider