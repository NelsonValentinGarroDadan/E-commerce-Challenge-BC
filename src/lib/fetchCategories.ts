import axion from 'axios';
export const getFirstCategories = async () => {
    const response = await axion.get(`/api/categories`)
    return response.data;
  };