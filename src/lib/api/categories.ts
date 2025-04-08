import categories from '@/data/categories.json'
import { Category } from '@/types/api' 

//trae todas las categorias
export const getCategories = async ():Promise<Category[]> => {
    return categories
}
//trae una categoria por id
export const getCategoryById = async (id: string): Promise<Category | null> => {
    const category = categories.find(cat => cat.id === id)
    if(!category) return null;
    return category;
}
//trae una categoria por nombre
export const getCategoryByName = async (name: string) => {
    const category = categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
    if(!category) return null;
    return category;
}
