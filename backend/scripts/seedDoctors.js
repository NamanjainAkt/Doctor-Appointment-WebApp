import mongoose from 'mongoose';
import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const doctorsData = [
    {
      name: "Dr. Anjali Mehra",
      email: "anjali@docsched.com",
      password: "$2b$10$ZArVq2wD.sx5xN/7lguOD.OkorANjqOkyNaZSgEF027n6WN3zzTQe",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744481172/xtqjfbukw2etbdh02ifv.png",
      speciality: "Dermatologist",
      degree: "MBBS ,MD",
      experience: "6 Year",
      about: "Dr. Mehra specializes in skincare, treating acne, pigmentation, and chronic skin conditions with advanced care.",
      availability: true,
      fees: 500,
      address: {
        address1: "Sector 21, Dwarka",
        address2: "New Delhi, India"
      },
      date: 1744481173306,
      slots_booked: {}
    },
    {
      name: "Dr. Ramesh Kumar",
      email: "ramesh@docsched.com",
      password: "$2b$10$b6Ipk87IE/S/Vhvsw33wYePWjYLlOrnVDySfJEq2hY1ciqlsYyAOS",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744481287/aycajq4bnppi7kgvnw6a.png",
      speciality: "General physician",
      degree: "MBBS",
      experience: "7 Year",
      about: "Dr. Kumar offers expert primary care, focusing on early diagnosis, lifestyle changes, and holistic wellness.",
      availability: true,
      fees: 300,
      address: {
        address1: "Anna Nagar East",
        address2: "Chennai, Tamil Nadu"
      },
      date: 1744481287490,
      slots_booked: {}
    },
    {
      name: "Dr. Priya Desai",
      email: "priya@docsched.com",
      password: "$2b$10$fkDdTTLYT8wR9pvFlv1/s.abyUYeA2NgU43qiexTOxRdSFutjrBYS",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744481382/omsq3r1kuvymskn52ftd.png",
      speciality: "Pediatricians",
      degree: "MBBS, DCH",
      experience: "5 Year",
      about: "Dr. Desai provides gentle, effective care for children of all ages, from infants to teens.",
      availability: true,
      fees: 400,
      address: {
        address1: "Law College Road",
        address2: "Pune, Maharashtra"
      },
      date: 1744481382792,
      slots_booked: {}
    },
    {
      name: "Dr. Kavita Reddy",
      email: "kavita@docsched.com",
      password: "$2b$10$ZNUOppWfsbWEVSsXCatQwOHgp2zgEfSge8wJ9Z5zBD44LC3kkJ4wy",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744481464/foihqgzgmp05i4relwzr.png",
      speciality: "Gynecologist",
      degree: "MBBS, MD (Gynecology)",
      experience: "9 Year",
      about: "Dr. Reddy is an experienced gynecologist handling pregnancy, infertility, and hormonal issues with compassion.",
      availability: true,
      fees: 600,
      address: {
        address1: "Banjara Hills",
        address2: "Hyderabad, Telangana"
      },
      date: 1744481465344,
      slots_booked: {}
    },
    {
      name: "Dr. Rohit Nair",
      email: "rohit@docsched.com",
      password: "$2b$10$jaF.Rich3FOKJuukyshnj.7VU5OPZ/zE9nw5c5CEQInrGVg8Rgcoe",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744481551/wwefibc9b2noub7stly7.png",
      speciality: "Gastroenterologist",
      degree: "MBBS, DM (Gastro)",
      experience: "10 Year",
      about: "Dr. Nair diagnoses and treats digestive system diseases with precision and care.",
      availability: true,
      fees: 700,
      address: {
        address1: "MG Road",
        address2: "Kochi, Kerala"
      },
      date: 1744481551974,
      slots_booked: {}
    },
    {
      name: "Dr. Neha Agarwal",
      email: "neha@docsched.com",
      password: "$2b$10$H0OVIqPBx77l3XZadJ/dauoKuSiK/4RKdJH1s1Xnp7UFDjoQq3ltK",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744481659/p6ehs1dgmz5m5aqzgjzz.png",
      speciality: "General physician",
      degree: "MBBS",
      experience: "4 Year",
      about: "Dr. Agarwal is trusted for her patient-centric approach to treating common and chronic illnesses.",
      availability: true,
      fees: 300,
      address: {
        address1: "Kharadi, EON IT Park",
        address2: "Pune, Maharashtra"
      },
      date: 1744481659459,
      slots_booked: {}
    },
    {
      name: "Dr. Manish Verma",
      email: "manish@docsched.com",
      password: "$2b$10$UnQA72hNo9Eo6AsUK3gn3eBS.ojJlXgzQNR2aQf08/UJns4CQkraS",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744481754/yxm37n0rrugljvbnb8gs.png",
      speciality: "Pediatricians",
      degree: "MBBS, DCH",
      experience: "8 Year",
      about: "Dr. Verma provides thorough pediatric care with a focus on developmental health and nutrition.",
      availability: true,
      fees: 450,
      address: {
        address1: "Indira Nagar",
        address2: "Bangalore, Karnataka"
      },
      date: 1744481754954,
      slots_booked: {}
    },
    {
      name: "Dr. Ayesha Khan",
      email: "ayesha@docsched.com",
      password: "$2b$10$Y3lMEaWvQbvgbi3YJhdVLOX/7FkEM6YJsA5Tcgk8ohlLG1JQIswCq",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744482004/bu5p1so58p9z8w2bqmu9.png",
      speciality: "Dermatologist",
      degree: "MBBS, MD (Dermatology)",
      experience: "6 Year",
      about: "Dr. Khan treats skin, hair, and nail conditions using modern and minimally invasive techniques.",
      availability: true,
      fees: 500,
      address: {
        address1: "Park Street",
        address2: "Kolkata, West Bengal"
      },
      date: 1744482005323,
      slots_booked: {}
    },
    {
      name: "Dr. Vikram Sinha",
      email: "vikram@docsched.com",
      password: "$2b$10$WP1ZAQt/setOpoTgKMX7w.A6yx7mQagviscsZdKfL9dlulWDAWArq",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744482099/apmigzosbnhsrbnmw8r7.png",
      speciality: "Gastroenterologist",
      degree: "MBBS, DM (Gastro)",
      experience: "10 Year",
      about: "Dr. Sinha specializes in liver, pancreas, and gastrointestinal disorders.",
      availability: true,
      fees: 800,
      address: {
        address1: "Rajpur Road",
        address2: "Dehradun, Uttarakhand"
      },
      date: 1744482100421,
      slots_booked: {}
    },
    {
      name: "Dr. Shalini Gupta",
      email: "shalini@docsched.com",
      password: "$2b$10$ajwFyPOyYjlwAv8ls9ah.eh8h84Sl1QB4oX0Rv9/g4DnO3zFYpoyS",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744482177/jivn44kvypcpzoed8kgd.png",
      speciality: "Gynecologist",
      degree: "'MBBS, MD",
      experience: "7 Year",
      about: "Dr. Gupta handles reproductive health and prenatal care with a focus on women's wellness.",
      availability: true,
      fees: 550,
      address: {
        address1: "Civil Lines",
        address2: "Jaipur, Rajasthan"
      },
      date: 1744482177394,
      slots_booked: {}
    },
    {
      name: "Dr. Sandeep Yadav",
      email: "sandeep@docsched.com",
      password: "$2b$10$hbY4206KGzOf5i0B8sXkBuKw5eSyCKLSMpCvIiBzNmdY7dKeAFxZK",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744482258/xfq152qf0nskkqwr62fa.png",
      speciality: "General physician",
      degree: "MBBS",
      experience: "6 Year",
      about: "Dr. Yadav is skilled in diagnosing and managing a wide range of medical conditions efficiently.",
      availability: true,
      fees: 350,
      address: {
        address1: "Lal Kuan",
        address2: "Ghaziabad, Uttar Pradesh"
      },
      date: 1744482259185,
      slots_booked: {}
    },
    {
      name: "Dr. Meena Iyer",
      email: "meena@docsched.com",
      password: "$2b$10$HTB4LoOYFCp83oTnSMo9DuRfeiGMwT8xiQo7.EWWkUzZMC0LTgtde",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744482350/bgu4jhqql6e677phkzkn.png",
      speciality: "Pediatricians",
      degree: "MBBS, DCH",
      experience: "10 Year",
      about: "Dr. Iyer ensures personalized pediatric care with emphasis on vaccinations and growth tracking.",
      availability: true,
      fees: 500,
      address: {
        address1: "Ellis Bridge",
        address2: "Ahmedabad, Gujarat"
      },
      date: 1744482351056,
      slots_booked: {}
    },
    {
      name: "Dr. Nitin Bhosale",
      email: "nitin@docsched.com",
      password: "$2b$10$DOLqtE8GL8.8mAteC/03sOnPiebdzel294ISTb9b7l7yOxpzBHnbq",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744482430/otumadajekow2lfrjd5k.png",
      speciality: "Dermatologist",
      degree: "MBBS ,MD",
      experience: "9 Year",
      about: "Dr. Bhosale treats a variety of dermatological issues including allergies, rashes, and fungal infections.",
      availability: true,
      fees: 450,
      address: {
        address1: "Shivaji Nagar",
        address2: "Nagpur, Maharashtra"
      },
      date: 1744482430779,
      slots_booked: {}
    },
    {
      name: "Dr. Swati Mishra",
      email: "swati@docsched.com",
      password: "$2b$10$pIN9sPlqNhoZwgY/fNTS3eNB5C5wX7p6Nm6R/unix5HkG7.t1D4oC",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744482519/vqkldcxvaqudkuuzuiig.png",
      speciality: "Gynecologist",
      degree: "MBBS, MD (Gynecology)",
      experience: "8 Year",
      about: "Dr. Mishra specializes in adolescent gynecology, family planning, and reproductive health.",
      availability: true,
      fees: 600,
      address: {
        address1: "Hinoo Chowk",
        address2: "Ranchi, Jharkhand"
      },
      date: 1744482520160,
      slots_booked: {}
    },
    {
      name: "Dr. Rajeev Joshi",
      email: "rajeev@docsched.com",
      password: "$2b$10$ZGS5sZj8XDgB5raUTTylD.By9BJSEIm5QEn2t31JGJaTE1JE4pdim",
      image: "https://res.cloudinary.com/dh3lfnn45/image/upload/v1744482610/dibjjo9ducwnsqjbrntw.png",
      speciality: "Gastroenterologist",
      degree: "MBBS, DM (Gastro)",
      experience: "10 Year",
      about: "Dr. Joshi provides expert treatment for digestive disorders, ulcers, and liver diseases.",
      availability: true,
      fees: 750,
      address: {
        address1: "VIP Road",
        address2: "Raipur, Chhattisgarh"
      },
      date: 1744482610662,
      slots_booked: {}
    },
    {
      name: "Admin User",
      email: "admin@docsched.com",
      password: "$2b$10$k5iX0oKiVZBY6TS7TIF4Aei1Z5OypHifsa72ezby7BQAf/0o6jeWG",
      about: "System Admin Account",
      address: {
        address1: "Admin Office",
        address2: "HQ"
      },
      availability: true,
      date: 1752275195547,
      experience: "0 Years",
      fees: 0,
      role: "admin",
      slots_booked: {},
      speciality: "System Administrator"
    }
  ];

const seedDoctors = async () => {
    try {
        await connectDB();
        
        // Create or update admin
        const admin = {
            email: "admin@docsched.com",
            password: await bcrypt.hash('qwerty123', 10),
            role: "admin",
            name: "Admin User",
            speciality: "System Administrator",
            experience: "0 Years",
            about: "System Admin Account",
            fees: 0,
            address: {
                line1: "Admin Office",
                line2: "HQ"
            },
            createdAt: new Date()
        };
        
        await doctorModel.findOneAndUpdate(
            { email: admin.email },
            { ...admin, availability: true, status: 'active' },
            { upsert: true }
        );
        console.log('Admin account created/updated');
        
        // Seed sample doctors
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        for (const doctor of doctorsData) {
            await doctorModel.findOneAndUpdate(
            { externalId: doctor.externalId },
            { ...doctor, password: hashedPassword, availability: true, status: 'active' },
            { upsert: true }
        );
            console.log(`Processed doctor: ${doctor.name}`);
        }
        
        console.log('Database seeding complete');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDoctors();