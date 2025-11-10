const Request = require('../models/requestModel');

// @desc    Get all rental requests
// @route   GET /api/requests
// @access  Private/Admin
const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find({})
            .populate('productId', 'name price')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch rental requests', error });
    }
};

// @desc    Create a new rental request
// @route   POST /api/requests
// @access  Public
const createRequest = async (req, res) => {
    try {
        const { productId, productName, productPrice, userId, name, email, phone, address, rentalDuration } = req.body;
        
        // Validate required fields
        if (!productId || !productName || !name || !email || !phone || !address) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const request = new Request({
            productId,
            productName,
            productPrice: productPrice || 0,
            userId: userId || null,
            name,
            email,
            phone,
            address,
            rentalDuration: rentalDuration || 1,
            status: 'pending'
        });
        const createdRequest = await request.save();
        res.status(201).json(createdRequest);
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ message: 'Failed to create rental request', error: error.message });
    }
};

// @desc    Update rental request status
// @route   PUT /api/requests/:id
// @access  Private/Admin
const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!['pending', 'approved', 'rejected', 'completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const request = await Request.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update request', error });
    }
};

// @desc    Delete a rental request
// @route   DELETE /api/requests/:id
// @access  Private/Admin
const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete request', error });
    }
};


module.exports = {
    getAllRequests,
    createRequest,
    updateRequestStatus,
    deleteRequest
};
