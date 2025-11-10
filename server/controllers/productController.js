const Product = require('../models/productModel');

// @desc    Get all products (with optional category filter)
// @route   GET /api/products?category=Sofa
// @access  Public
const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, category, description, price, image, admin_id } = req.body;
        const product = new Product({ 
            name, 
            category, 
            description, 
            price, 
            image,
            admin_id
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product', error });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, description, price, image } = req.body;
        const product = await Product.findById(id);

        if (product) {
            product.name = name || product.name;
            product.category = category || product.category;
            product.description = description || product.description;
            product.price = price || product.price;
            product.image = image || product.image;
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
};

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
    const categories = ['Sofa', 'Bed', 'Table', 'Dining Table', 'TV', 'Refrigerator', 'Washing Machine', 'Water Purifier', 'Mattress', 'Other'];
    res.status(200).json(categories);
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories
};
