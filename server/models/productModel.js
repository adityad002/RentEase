const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['Sofa', 'Bed', 'Table', 'Dining Table', 'TV', 'Refrigerator', 'Washing Machine', 'Water Purifier', 'Mattress', 'Other'] },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Monthly rent price
    image: { type: String, required: true },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin who added this product
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
