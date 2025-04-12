import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Anjali Mehra',
        image: doc1,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Mehra specializes in skincare, treating acne, pigmentation, and chronic skin conditions with advanced care.',
        fees: 500,
        address: {
            line1: 'Sector 21, Dwarka',
            line2: 'New Delhi, India'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Ramesh Kumar',
        image: doc2,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr. Kumar offers expert primary care, focusing on early diagnosis, lifestyle changes, and holistic wellness.',
        fees: 300,
        address: {
            line1: 'Anna Nagar East',
            line2: 'Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Priya Desai',
        image: doc3,
        speciality: 'Pediatricians',
        degree: 'MBBS, DCH',
        experience: '5 Years',
        about: 'Dr. Desai provides gentle, effective care for children of all ages, from infants to teens.',
        fees: 400,
        address: {
            line1: 'Law College Road',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Kavita Reddy',
        image: doc4,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Gynecology)',
        experience: '9 Years',
        about: 'Dr. Reddy is an experienced gynecologist handling pregnancy, infertility, and hormonal issues with compassion.',
        fees: 600,
        address: {
            line1: 'Banjara Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Rohit Nair',
        image: doc5,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastro)',
        experience: '10 Years',
        about: 'Dr. Nair diagnoses and treats digestive system diseases with precision and care.',
        fees: 700,
        address: {
            line1: 'MG Road',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Neha Agarwal',
        image: doc6,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Agarwal is trusted for her patient-centric approach to treating common and chronic illnesses.',
        fees: 300,
        address: {
            line1: 'Kharadi, EON IT Park',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Manish Verma',
        image: doc7,
        speciality: 'Pediatricians',
        degree: 'MBBS, DCH',
        experience: '8 Years',
        about: 'Dr. Verma provides thorough pediatric care with a focus on developmental health and nutrition.',
        fees: 450,
        address: {
            line1: 'Indira Nagar',
            line2: 'Bangalore, Karnataka'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Ayesha Khan',
        image: doc8,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '6 Years',
        about: 'Dr. Khan treats skin, hair, and nail conditions using modern and minimally invasive techniques.',
        fees: 500,
        address: {
            line1: 'Park Street',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Vikram Sinha',
        image: doc9,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastro)',
        experience: '11 Years',
        about: 'Dr. Sinha specializes in liver, pancreas, and gastrointestinal disorders.',
        fees: 800,
        address: {
            line1: 'Rajpur Road',
            line2: 'Dehradun, Uttarakhand'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Shalini Gupta',
        image: doc10,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Gupta handles reproductive health and prenatal care with a focus on women’s wellness.',
        fees: 550,
        address: {
            line1: 'Civil Lines',
            line2: 'Jaipur, Rajasthan'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Sandeep Yadav',
        image: doc11,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Yadav is skilled in diagnosing and managing a wide range of medical conditions efficiently.',
        fees: 350,
        address: {
            line1: 'Lal Kuan',
            line2: 'Ghaziabad, Uttar Pradesh'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Meena Iyer',
        image: doc12,
        speciality: 'Pediatricians',
        degree: 'MBBS, DCH',
        experience: '10 Years',
        about: 'Dr. Iyer ensures personalized pediatric care with emphasis on vaccinations and growth tracking.',
        fees: 500,
        address: {
            line1: 'Ellis Bridge',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Nitin Bhosale',
        image: doc13,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '9 Years',
        about: 'Dr. Bhosale treats a variety of dermatological issues including allergies, rashes, and fungal infections.',
        fees: 450,
        address: {
            line1: 'Shivaji Nagar',
            line2: 'Nagpur, Maharashtra'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Swati Mishra',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Gynecology)',
        experience: '8 Years',
        about: 'Dr. Mishra specializes in adolescent gynecology, family planning, and reproductive health.',
        fees: 600,
        address: {
            line1: 'Hinoo Chowk',
            line2: 'Ranchi, Jharkhand'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Rajeev Joshi',
        image: doc15,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastro)',
        experience: '12 Years',
        about: 'Dr. Joshi provides expert treatment for digestive disorders, ulcers, and liver diseases.',
        fees: 750,
        address: {
            line1: 'VIP Road',
            line2: 'Raipur, Chhattisgarh'
        }
    }
];
