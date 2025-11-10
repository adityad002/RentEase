import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Services
export const userService = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
};

// Product Services
export const productService = {
  getAllProducts: (category = null) => {
    const params = category ? `?category=${category}` : '';
    return api.get(`/products${params}`);
  },
  getCategories: () => api.get('/products/categories'),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Request Services
export const requestService = {
  getAllRequests: () => api.get('/requests'),
  createRequest: (data) => api.post('/requests', data),
  updateRequestStatus: (id, status) => api.put(`/requests/${id}`, { status }),
  deleteRequest: (id) => api.delete(`/requests/${id}`),
};

export default api;
