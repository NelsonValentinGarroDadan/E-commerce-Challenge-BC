"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Presentation() {
    return (
        <section className="relative section-container gap-6 flex-col lg:flex-row lg:gap-3 mt-30">
            <div className="z-20 flex flex-col items-center justify-start w-full gap-6 ">
                <h1 className="font-roboto text-7xl font-bold text-text w-full">Tecnología de calidad para tu día a día</h1>
                <p className="font-roboto text-xl lg:text-2xl text-text/90 w-full">Descubre nuestra selección de productos tecnológicos de alta calidad para mejorar tu experiencia digital.</p>
                <div className="flex justify-center items-center gap-5 w-full">
                    <Link href="/products">
                        <Button >Ver Productos</Button> 
                    </Link>
                    <Link href="/categories">
                        <Button variant="outline">Explorar Categorías</Button>
                    </Link>
                </div>
            </div>
            <div className="relative w-82 h-82 lg:w-full lg:h-120">
                <Image
                    src="/hero.webp"
                    alt="hero-img"
                    loading="lazy"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        </section>
    );
}