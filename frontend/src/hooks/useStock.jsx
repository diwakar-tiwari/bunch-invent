import { useState } from 'react';
import { updateStock, checkReorderLevel } from '../services/stockService';

export const useStock = () => {
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState(null);

    const handleUpdateStock = async (productId, quantityChange) => {
        try {
            const data = await updateStock(productId, quantityChange);
            setStockData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCheckReorderLevel = async (productId) => {
        try {
            const data = await checkReorderLevel(productId);
            setStockData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return { stockData, error, handleUpdateStock, handleCheckReorderLevel };
};
