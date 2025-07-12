import mongoose from 'mongoose';
import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://Namanjainakt:Naman007@cluster0.arswvpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const doctorsData = [
    {
        externalId: 'doc1',
        name: 'Dr. Anjali Mehra',
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Mehra specializes in skincare, treating acne, pigmentation, and chronic skin conditions with advanced care.',
        fees: 500,
        address: {
            line1: 'Sector 21, Dwarka',
            line2: 'New Delhi, India'
        },
        email: 'anjali.mehra@example.com',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
    },
    {
        externalId: 'doc2',
        name: 'Dr. Rajesh Kumar',
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Kumar is a general physician with expertise in preventive medicine and primary healthcare.',
        fees: 300,
        address: {
            line1: 'Connaught Place',
            line2: 'New Delhi, India'
        },
        email: 'rajesh.kumar@example.com',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
    },
    {
        externalId: 'doc3',
        name: 'Dr. Priya Sharma',
        speciality: 'Gynecologist',
        degree: 'MBBS, MS',
        experience: '10 Years',
        about: 'Dr. Sharma specializes in women\'s health, pregnancy care, and gynecological procedures.',
        fees: 600,
        address: {
            line1: 'Greater Kailash',
            line2: 'New Delhi, India'
        },
        email: 'priya.sharma@example.com',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
    },
    {
        externalId: 'doc4',
        name: 'Dr. Amit Patel',
        speciality: 'Pediatricians',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Patel is a pediatrician dedicated to providing comprehensive care for children from birth to adolescence.',
        fees: 400,
        address: {
            line1: 'Vasant Vihar',
            line2: 'New Delhi, India'
        },
        email: 'amit.patel@example.com',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
    },
    {
        externalId: 'doc5',
        name: 'Dr. Sunita Reddy',
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM',
        experience: '12 Years',
        about: 'Dr. Reddy is a neurologist specializing in the diagnosis and treatment of neurological disorders.',
        fees: 800,
        address: {
            line1: 'Defence Colony',
            line2: 'New Delhi, India'
        },
        email: 'sunita.reddy@example.com',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
    },
    {
        externalId: 'doc6',
        name: 'Dr. Vikram Singh',
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD, DM',
        experience: '9 Years',
        about: 'Dr. Singh specializes in digestive system disorders and gastrointestinal procedures.',
        fees: 700,
        address: {
            line1: 'Hauz Khas',
            line2: 'New Delhi, India'
        },
        email: 'vikram.singh@example.com',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
    },
    {
        externalId: 'doc7',
        name: 'Dr. Meera Iyer',
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '5 Years',
        about: 'Dr. Iyer focuses on cosmetic dermatology and skin rejuvenation treatments.',
        fees: 550,
        address: {
            line1: 'South Extension',
            line2: 'New Delhi, India'
        },
        email: 'meera.iyer@example.com',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
    },
    {
        externalId: 'doc8',
        name: 'Dr. Arjun Malhotra',
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Malhotra provides comprehensive primary care and preventive health services.',
        fees: 350,
        address: {
            line1: 'Lajpat Nagar',
            line2: 'New Delhi, India'
        },
        email: 'arjun.malhotra@example.com',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
    },
    {
        externalId: 'doc9',
        name: 'Dr. Kavita Gupta',
        speciality: 'Gynecologist',
        degree: 'MBBS, MS',
        experience: '8 Years',
        about: 'Dr. Gupta specializes in high-risk pregnancies and reproductive health.',
        fees: 650,
        address: {
            line1: 'Saket',
            line2: 'New Delhi, India'
        },
        email: 'kavita.gupta@example.com',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
    },
    {
        externalId: 'doc10',
        name: 'Dr. Rahul Verma',
        speciality: 'Pediatricians',
        degree: 'MBBS, MD',
        experience: '11 Years',
        about: 'Dr. Verma is a pediatrician with expertise in neonatal care and child development.',
        fees: 450,
        address: {
            line1: 'Punjabi Bagh',
            line2: 'New Delhi, India'
        },
        email: 'rahul.verma@example.com',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
        availability: true,
        status: 'active'
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