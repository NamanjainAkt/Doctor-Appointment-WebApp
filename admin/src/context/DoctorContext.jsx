import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const backendUrl = 'http://localhost:4000';

    const getDoctorInfo = async () => {
        try {
            if (!dToken) return;
            
            const decoded = JSON.parse(atob(dToken.split('.')[1]));
            const doctorId = decoded.id;
            
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/doctors/${doctorId}`, {
                headers: { authorization: `Bearer ${dToken}` }
            });
            
            if (data.success) {
                setDoctorInfo(data.doctor);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching doctor info');
        } finally {
            setLoading(false);
        }
    };

    const getDoctorAppointments = async () => {
        try {
            if (!dToken || !doctorInfo) return;
            
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/appointments/doctor/${doctorInfo._id}`, {
                headers: { authorization: `Bearer ${dToken}` }
            });
            
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching appointments');
        } finally {
            setLoading(false);
        }
    };

    const updateAppointmentStatus = async (appointmentId, status) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`${backendUrl}/api/appointments/status/${appointmentId}`, 
                { status },
                { headers: { authorization: `Bearer ${dToken}` }}
            );
            
            if (data.success) {
                toast.success(data.message);
                await getDoctorAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating appointment');
        } finally {
            setLoading(false);
        }
    };

    const value = {
        dToken,
        setDToken,
        doctorInfo,
        appointments,
        loading,
        getDoctorInfo,
        getDoctorAppointments,
        updateAppointmentStatus,
        backendUrl
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;