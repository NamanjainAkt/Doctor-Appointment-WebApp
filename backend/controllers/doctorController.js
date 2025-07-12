import doctorModel from '../models/doctorModel.js';

// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find().select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.error('Error in getAllDoctors:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch doctors' });
    }
};

// Get single doctor
const getDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await doctorModel.findById(id).select('-password');
        
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        
        res.json({ success: true, doctor });
    } catch (error) {
        console.error('Error in getDoctor:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch doctor details' });
    }
};

// Update doctor status
const updateDoctorStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value' });
        }

        const doctor = await doctorModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).select('-password');

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.json({ success: true, message: 'Doctor status updated successfully', doctor });
    } catch (error) {
        console.error('Error in updateDoctorStatus:', error);
        res.status(500).json({ success: false, message: 'Failed to update doctor status' });
    }
};

// Delete doctor
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await doctorModel.findByIdAndDelete(id);

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.json({ success: true, message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error in deleteDoctor:', error);
        res.status(500).json({ success: false, message: 'Failed to delete doctor' });
    }
};

const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {
            availability: !docData.availability
        })
        res.json({ success: true, message: 'Availability changed successfully' });

    } catch (error) {
        console.error('Error in changeAvailability:', error);
        res.status(500).json({ success: false, message: 'Failed to change availability' });
    }
}



export { getAllDoctors, getDoctor, updateDoctorStatus, deleteDoctor, changeAvailability };