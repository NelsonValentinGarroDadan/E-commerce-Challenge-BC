import { Product } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({id,image,name,price}:Product) {
    return (
        <div className="w-full bg-text shadow-text shadow-md flex flex-col justify-start">
                <Link href={`/products/?productId=${id}`}>
                    <div className="w-full h-60 relative bg-text flex justify-start items-center">
                        <Image 
                            src={image}
                            alt={`img-${name}`}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                    </div>
                </Link>

                <div className="flex flex-col items-center justify-center p-5 h-40">
                    <span className="flex items-center justify-start text-background w-full text-left">{name}</span>
                    <span className="flex items-center justify-start text-background w-full text-left">{`${price} €`}</span>
                    <div className="flex items-center justify-center w-full p-5">
                        <Button variant="default" className="gap-2 w-full">
                            <ShoppingCart /> Añadir al carrito
                        </Button>
                    </div>
                </div>
            </div>
    );
}