import axion from 'axios';
export const getUser = async (token:string) => {
    const response = await axion.get(`/api/users`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
  };

export const saveFavorite = async ({token,productId}:{token:string;productId:string;}) => {
    const response = await axion.post(`/api/products/favorites?productId=${productId}`,null,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}