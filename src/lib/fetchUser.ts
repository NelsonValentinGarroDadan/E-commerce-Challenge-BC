import axion from 'axios';
export const getUser = async (token:string) => {
    const response = await axion.get(`/api/users`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(response.data)
    return response.data;
  };