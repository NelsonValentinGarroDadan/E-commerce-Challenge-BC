'use client';

import InfoCard from "@/components/infoCard";
import LoaderSpin from "@/components/loaderSpin";
import { getAllCategories } from "@/lib/fetchCategories";
import { Category, ResponseCategory } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Headphones, Keyboard, Lamp, Monitor, Mouse, MoveRight, Package } from "lucide-react";
import Link from "next/link";

export default function FirstCategories(){
    const categoryIcons = {
        keyboard: <Keyboard />,
        mouse: <Mouse />,
        headphones: <Headphones />,
        monitor: <Monitor />,
        lamp: <Lamp />,
        package: <Package />,
      };
    
    const { data, error, isLoading } = useQuery<ResponseCategory, Error>({
    queryKey: ['categories'], 
    queryFn: getAllCategories
    });
    return(
        <section className="section-container flex-col">
            <div className="flex items-center flex-col md:flex-row gap-4 justify-between w-full">
                <div className="flex flex-col justify-start items-center gap-3 w-full">
                    <h1 className="font-roboto text-2xl lg:text-4xl font-bold text-text w-full">
                        Categorías
                    </h1>
                    <p className="font-roboto text-xl lg:text-2xl text-text/90 w-full">
                    Explora nuestras categorías de productos
                    </p>
                </div>
                <div className="flex items-center justify-end w-full">
                    <Link href="/categories" className="flex items-center justify-centertext-text gap-3 hover:border-b-1 hover:border-b-text !ease-in-out !duration-75">
                        Ver todas
                        <MoveRight />
                    </Link>
                </div>
            </div>
            <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full py-6 gap-10">
                {
                    isLoading ? (
                         <LoaderSpin/>
                    ) : error ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        data?.result?.map((category:Category) => (
                            <InfoCard key={category.id + category.name} 
                                icon={categoryIcons[category.icon as keyof typeof categoryIcons]}
                                title={category.name}
                                href={`/products/?categoryId=${category.id}`}
                            />
                        ))
                    )
                }
            </section>
        </section>
    );
}