import axios from 'axios'
export const getPopularProducts = async () => {
    const response = await axios.get("/api/products?limit=6")
    return response.data;
}