const express = require('express');
const router = express.Router();
const { 
    getAllRequests, 
    createRequest,
    updateRequestStatus,
    deleteRequest 
} = require('../controllers/requestController');

// Define routes
router.get('/', getAllRequests);
router.post('/', createRequest);
router.put('/:id', updateRequestStatus);
router.delete('/:id', deleteRequest);

module.exports = router;
