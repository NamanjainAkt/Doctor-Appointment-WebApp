# Doctor Appointment Web App

A full-stack web application for booking doctor appointments, managing profiles, and processing payments.

## Features

- User authentication and profile management
- Doctor listing and search
- Appointment booking and management
- Payment processing
- Admin dashboard for doctor management

## Project Structure

- `frontend/`: React frontend application
- `backend/`: Node.js/Express backend API
- `admin/`: React admin dashboard

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Run database migration and seeding scripts (if needed):
   ```
   node scripts/migrateDoctors.js
   node scripts/seedDoctors.js
   ```

5. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Admin Dashboard Setup

1. Navigate to the admin directory:
   ```
   cd admin
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Troubleshooting

### Invalid Doctor ID Format

If you encounter an "Invalid doctor ID format" error when booking appointments, you may need to run the migration scripts to add externalId to your doctors in the database:

```
cd backend
node scripts/migrateDoctors.js
```

This will ensure that the string IDs used in the frontend (like 'doc1') can be properly matched with doctors in the database.

## License

MIT