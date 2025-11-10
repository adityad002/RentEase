const Request = require('../models/requestModel');

// @desc    Get all rental requests
// @route   GET /api/requests
// @access  Private/Admin
const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find({}).populate('productId', 'name price');
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
        const { productId, productName, productImage, name, phone, address } = req.body;
        const request = new Request({
            productId,
            productName,
            productImage,
            name,
            phone,
            address
        });
        const createdRequest = await request.save();
        res.status(201).json(createdRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create rental request', error });
    }
};

// @desc    Delete a rental request (fulfill)
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
    deleteRequest
};
