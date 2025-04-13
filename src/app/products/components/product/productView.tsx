'use client'

import NotFound from "@/app/not-found";
import LoaderSpin from "@/components/loaderSpin";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { getProductById, getRelatedsProducts } from "@/lib/fetchProducts";
import { Product, ResponseProduct, ResponseProducts } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductView({productId}:{productId:string}){
    const [page, setPage] = useState(1);
    const { data:product, error:errorProduct, isLoading: isLoadingProduct} = useQuery<ResponseProduct, Error>({
        queryKey: ['product'], 
        queryFn: () => getProductById({productId}), 
    });
    const { data:productsRelated, error:errorProductsRelated, isLoading: isLoadingProductsRelated } = useQuery<ResponseProducts, Error>({
        queryKey: ['productsRelated'], 
        queryFn: () => getRelatedsProducts({productId,limit:"6",page:String(page)}), 
    });
    const isLoading = isLoadingProduct && isLoadingProductsRelated;
    const handleNextPage = () =>{
        if(!productsRelated?.meta) return;
        if(Number(productsRelated?.meta?.totalPages) >= page + 1) setPage( page+1)

    }
    const handlePrevPage = () =>{
        if(!productsRelated?.meta) return;
        if(0 < page - 1) setPage( page-1)

    }
    if(isLoading) return <div className="min-h-screen flex items-center justify-center"><LoaderSpin/></div>
    if(!product || errorProduct ) return <NotFound />
    return(
        <>
            <section className="section-container gap-6 flex-col md:flex-row lg:gap-3 mt-20">
                <div className="relative w-full h-120">
                    <Image 
                        src={product.result?.image || "/placeholder-image.jpg"}
                        alt={`product-${product.result?.name}`}
                        loading="lazy"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="w-full flex flex-col items-center justify-start gap-8">
                    <h1 className="font-poppins text-4xl font-bold text-text w-full text-left">{product.result?.name}</h1>
                    <span className="font-poppins text-xl text-text w-full text-left">{`${product.result?.price} €`}</span>
                    <p className="font-poppins text-sm text-text/80 w-full text-left">{product.result?.description}</p>
                    <div className="flex items-center justify-start w-full gap-5">
                        <Button variant="default" className="px-24 gap-2 w-full"><ShoppingCart /> Añadir al carrito</Button>
                        <Button variant="outline"><Heart /></Button>
                    </div>
                    <div className="flex flex-col items-center justify-center p-5 border-1 border-text gap-3">
                        <span className="font-poppins text-xs text-text w-full text-center font-bold">Envío</span>
                        <p className="font-poppins text-xs text-text/80" >
                            Envío gratuito en pedidos superiores a 50€. <br /><br />

                            Entrega en 24-48 horas laborables para pedidos nacionales. <br /><br />

                            Política de devoluciones de 30 días. <br /><br />
                        </p>
                    </div>
                </div>
            </section>
            <section className="section-container gap-6 flex-col lg:gap-3">
                <h2 className="font-roboto text-4xl font-bold text-text w-full">Productos relacionados</h2>
                 {  productsRelated && productsRelated.meta && (
                        <>
                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-5 gap-10">
                                    {
                                    productsRelated?.result?.map((product:Product)=>(
                                        <ProductCard 
                                            key={product.id}
                                            {...product}
                                        />
                                    ))
                                        
                                    }
                            </section>

                            <Pagination actual={page} next={handleNextPage} prev={handlePrevPage} totalPages={productsRelated?.meta?.totalPages} onPageSelect={setPage}/>
                        </>
                    )
                }
                {
                    !isLoading && !errorProductsRelated && productsRelated?.result?.length === 0 && (
                        <div className="text-center text-text text-lg ">
                        No se encontraron productos.
                        </div>
                    )
                }
                
            </section>
        </>
    )
}