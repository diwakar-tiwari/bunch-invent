import axios from 'axios';
import api from './api';

const API_URL = 'http://localhost:5000/api/stock';

// Update stock quantity
export const updateStock = async (productId, quantityChange) => {
    try {
        const response = await axios.put(`${API_URL}/update`, {
            product_id: productId,
            quantity_change: quantityChange
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Check if product stock is below reorder level
export const checkReorderLevel = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/reorder-check/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
