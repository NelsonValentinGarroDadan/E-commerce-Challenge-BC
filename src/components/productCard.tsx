import { Product } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({id,image,name,price}:Product) {
    return (
        <Link href={`/products/${id}`}>
            <div className="w-full h-130 bg-text flex flex-col">
                <div className="w-full h-90 relative bg-text flex justify-start">
                    <Image 
                        src={image}
                        alt={`img-${name}`}
                        layout="fill" 
                        objectFit="contain" 
                    />
                </div>

                <div className="flex flex-col items-center justify-center p-5 h-40">
                    <span className="flex items-center justify-start text-background w-full text-left">{name}</span>
                    <span className="flex items-center justify-start text-background w-full text-left">{`${price} €`}</span>
                    <div className="flex items-center justify-center w-full p-5">
                        <Button variant="outline" className="gap-2 w-full">
                            <ShoppingCart /> Añadir al carrito
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}