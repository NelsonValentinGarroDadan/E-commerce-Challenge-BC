"use client"
import SearchBar from "@/app/products/components/products/searchBar";
import SelectCategory from "@/app/products/components/products/selectCategory";
import LoaderSpin from "@/components/loaderSpin";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/productCard";
import { getProductsFavorites } from "@/lib/fetchProducts";
import { useUserStore } from "@/store/useUserStore"
import { Product, ResponseProducts } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FavoritiesVIew(){
    const router = useRouter();
    const { isLogin,token } = useUserStore((state)=>state);
    useEffect(()=>{
        if(isLogin === false){
            toast.warning("Inicia sesion",{
                duration:4000,
                richColors: true,
                action:{
                    label: <X className="h-3 w-3"/>,
                    onClick: () => toast.dismiss()
                },
            });
            router.push('/auth');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLogin]);
    
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [page, setPage] = useState(1);


    const handleChangeSearchName = (value:string) =>{
        setSearchName(value)
    }
    const handleChangeSearchCategory = (categoryId:string) =>{
        setSearchCategory(categoryId)
    }
    const { data, error, isLoading} = useQuery<ResponseProducts, Error>({
            queryKey: ['favorite',searchName,searchCategory,page], 
            queryFn: () => getProductsFavorites({
                token: token ?? "",
                limit:"6",
                page:"1",
                name:searchName,
                categoryId:searchCategory
            }), 
        });
    useEffect(()=>{
        setPage(1);
    },[searchName, searchCategory])
    const handleNextPage = () =>{
        if(!data?.meta) return;
        if(Number(data?.meta?.totalPages) >= page + 1) setPage( page+1)

    }
    const handlePrevPage = () =>{
        if(!data?.meta) return;
        if(0 < page - 1) setPage( page-1)

    }
    if (isLogin === null) return null;
    if (!isLogin) return null;
    if(!token) return null;
    return(
        <section className="section-container gap-6 flex-col lg:gap-3 mt-20">
            <h1 className="font-roboto text-4xl font-bold text-text w-full">Productos favoritos</h1>
            <div className='flex flex-col sm:flex-row items-center justify-start gap-6 px-2 w-full'>
                <SelectCategory 
                    categorySelected={searchCategory}
                    setCategorySelected={handleChangeSearchCategory}
                />
                <SearchBar 
                    value={searchName}
                    onChange={handleChangeSearchName}
                />
            </div>
            <section className='flex flex-col items-center justify-start min-h-96'>
                {
                        isLoading ? (
                             <LoaderSpin/>
                        ) : error ? (
                            <div>Error: {error.message}</div>)
                        : data && data.meta && (
                            <>
                                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-5 gap-10">
                                        {
                                        data?.result?.map((product:Product)=>(
                                            <ProductCard 
                                                key={product.id}
                                                {...product}
                                            />
                                        ))
                                            
                                        }
                                </section>

                                <Pagination actual={page} next={handleNextPage} prev={handlePrevPage} totalPages={data?.meta?.totalPages} onPageSelect={setPage}/>
                          </>
                        )
                }
                {
                    !isLoading && !error && data?.result?.length === 0 && (
                        <div className="text-center text-text text-lg ">
                        No se encontraron productos.
                        </div>
                    )
                }

            </section>
          </section>
    )
}