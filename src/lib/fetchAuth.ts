import { Auth } from '@/types/auth.type';
import axion from 'axios';
export const postAuth = async (data:Auth) => {
    const response = await axion.post(`/api/auth`,data)
    return response.data;
  };