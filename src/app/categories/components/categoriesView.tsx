"use client"

import InfoCard from "@/components/infoCard";
import LoaderSpin from "@/components/loader";
import { getAllCategories } from "@/lib/fetchCategories";
import { Category, ResponseCategory } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Headphones, Keyboard, Lamp, Monitor, Mouse, Package } from "lucide-react";

export default function CategoriesView(){
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
    return (
        <section className="section-container flex-col mt-20">
            <h1 className="font-roboto text-2xl lg:text-4xl font-bold text-text w-full">
                Categorías
            </h1>
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
    )
}