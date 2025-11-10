const express = require('express');
const router = express.Router();
const { 
    getAllRequests, 
    createRequest, 
    deleteRequest 
} = require('../controllers/requestController');

// Define routes
router.get('/', getAllRequests);
router.post('/', createRequest);
router.delete('/:id', deleteRequest);

module.exports = router;
