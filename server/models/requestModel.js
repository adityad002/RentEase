const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true }, // Monthly rent price
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    rentalDuration: { type: Number, default: 1 }, // Duration in months
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
