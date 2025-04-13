import axion from 'axios';
export const getAllCategories = async () => {
    const response = await axion.get(`/api/categories`)
    return response.data;
  };