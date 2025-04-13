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

export const getProductById = async ({productId}:{productId:string}) =>{
    const response = await axios.get(`/api/products/product?id=${productId}`)
    return response.data;
}

export const getRelatedsProducts = async ({productId,limit,page}:{productId:string,limit?:string,page?:string}) =>{
    const response = await axios.get(`/api/products/related?id=${productId}&limit=${limit}&page=${page}`)
    return response.data;
}