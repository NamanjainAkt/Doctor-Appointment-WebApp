import { createContext, useState } from "react"

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '')
    const backendUrl = 'http://localhost:4000'

    const value = {
        aToken,
        setAToken,
        backendUrl
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider