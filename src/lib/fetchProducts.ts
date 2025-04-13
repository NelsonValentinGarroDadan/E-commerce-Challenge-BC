import axios from 'axios'
export const getPopularProducts = async () => {
    const response = await axios.get("/api/products?limit=6")
    return response.data;
}

export const getAllProducts = async ({name,categoryId,limit,page}:
    {
        categoryId?:string,
        limit?:string,
        page?:string, 
        name:string

    }) => {
    const response = await axios.get(`/api/products?category=${categoryId}&limit=${limit}&page=${page}&name=${name}`);
    return response.data;
}