import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, addAppointment } = useContext(AppContext)
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    // getting current Date
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      //getting the date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      //setting end time of the date with index
      let endTime = new Date(currentDate) // Create from currentDate instead of today
      endTime.setHours(21, 0, 0, 0)
      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []
      while(currentDate < endTime){
        // Use a more consistent time format
        let formattedTime = currentDate.toLocaleTimeString('en-US', {
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true // Ensure 12-hour format with AM/PM
        })
        
        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(()=>{

  },[])

  return docInfo && (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
    <div>
      {/* {----------Doctor details--------} */}
      <div className='flex flex-cols sm:flex-row gap-4'>
        <div>
          <img className='bg-[#5f6fff] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* {---------Doc Info - {name,info,degree, experience}----------} */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex-items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-sm rounded-full'>{docInfo.experience}</button>
          </div>
          {/* {---------Doctor About---------} */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4 '>
            Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>

      </div>
      {/* {----------Booking slots---------} */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5f6fff] text-white' : 'border border-gray-200'}`} key={index}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5f6fff] text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
          ))}
        </div>
        <button 
          onClick={() => {
            if (!slotTime) {
              toast.error('Please select a time slot')
              return
            }

            // Check if user is logged in
            const userToken = localStorage.getItem('userToken')
            const userInfo = localStorage.getItem('userInfo')
            
            if (!userToken || !userInfo) {
              toast.error('Please login to book an appointment')
              navigate('/login')
              return
            }

            try {
              const user = JSON.parse(userInfo)
              const selectedDate = docSlots[slotIndex][0].datetime
              
              // Create appointment object
              const appointment = {
                doctorId: docInfo._id,
                appointmentDate: selectedDate,
                appointmentTime: slotTime,
                patientName: user.name,
                patientEmail: user.email
              }

              // Add appointment using context
              addAppointment(appointment)
              toast.success('Appointment booked successfully!')
              navigate('/my-appointment')
            } catch (error) {
              console.error('Error booking appointment:', error)
              toast.error('Failed to book appointment. Please try again.')
            }
          }} 
          className='bg-[#5f6fff] text-white text-sm font-light px-14 py-3 rounded-full my-6 hover:bg-[#4f5fee] transition-all duration-300'
        >
          Book Appointment
        </button>
      </div>
      {/* Listing Related Doctors */}
      <RelatedDoctors docId={docId} speciality = {docInfo.speciality}/>
    </div>
    </>
  )
}

export default Appointment
