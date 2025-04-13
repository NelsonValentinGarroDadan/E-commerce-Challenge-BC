import { getAllCategories } from "@/lib/fetchCategories";
import { Category, ResponseCategory } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export default function SelectCategory(
    {categorySelected, setCategorySelected}
    :{categorySelected:string, setCategorySelected:(categoryId:string)=>void}
){
    const { data, error, isLoading } = useQuery<ResponseCategory, Error>({
        queryKey: ['categories'], 
        queryFn: getAllCategories
      });
      const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategorySelected(e.target.value);
    }
    return (
        <select 
            value={categorySelected} 
            className="px-3 border-1 border-text/60 focus-within:border-text focus:outline-none
            text-text cursor-pointer
            !duration-100"
            onChange={handleCategoryChange}
        >
            {
                isLoading ? (
                    <option value={0}>Cargando...</option>
                ) : (
                        error ? (
                            <option value={""} className="text-text bg-background">Error al traer las categorias</option>
                        ) :(
                            <>
                                <option value={""} className="text-text bg-background">Todas las categorias</option>
                                {
                                     data?.result?.map((category:Category) => (
                                        <option 
                                            key={category.id}
                                            value={category.id}
                                            className="cursor-pointer text-text bg-background"
                                        >
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </>
                        )
                )
                
            }
        </select>
    );
}