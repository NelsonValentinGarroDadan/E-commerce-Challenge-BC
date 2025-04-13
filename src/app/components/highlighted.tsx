"use client";
import ProductCard from "@/components/productCard";
import { getPopularProducts } from "@/lib/fetchProducts";
import { Product, ResponseProducts } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Highlighted(){
    const {data, isLoading, error} = useQuery<ResponseProducts,Error>({
        queryKey: ['products'], 
        queryFn: getPopularProducts
    })
    return (
        <section className="section-container flex-col">
            <div className="flex items-center flex-col md:flex-row gap-4 justify-between w-full">
                <div className="flex flex-col justify-start items-center gap-3 w-full">
                    <h1 className="font-roboto text-2xl lg:text-4xl font-bold text-text w-full">
                        Productos destacados
                    </h1>
                    <p className="font-roboto text-xl lg:text-2xl text-text/90 w-full">
                    Descubre nuestros productos más populares
                    </p>
                </div>
                <div className="flex items-center justify-end w-full">
                    <Link href="/products" className="flex items-center justify-centertext-text gap-3 hover:border-b-1 hover:border-b-text">
                        Ver todos
                        <MoveRight />
                    </Link>
                </div>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-5 gap-10">
                {
                    isLoading ? (
                        <div>Cargando...</div>
                    ) : error ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        data?.result?.map((product:Product)=>(
                            <ProductCard 
                                key={product.id}
                                {...product}
                            />
                        ))
                    )
                }
                
            </section>
        </section>
    )
}