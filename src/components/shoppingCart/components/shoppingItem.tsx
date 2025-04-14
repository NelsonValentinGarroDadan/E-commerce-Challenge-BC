"use client"
import { useCartStore } from "@/store/useShoppingCart";
import type { ShoppingItem } from "@/types/shoppingCart.type";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShoppingItem ({id,name,price,image,quantity:q}:ShoppingItem) {
    const  { removeItem, updateQuantity } = useCartStore((state)=>state);
    const [quantity, setQuantity] = useState(q);
    const handleRemove = () =>{
        removeItem(id);
    }
    const handleSusQuantity = () => {
        if(quantity - 1 > 0) setQuantity(quantity-1);
    }
    const handlePlusQuantity = () => {
        if(quantity+1 < 11)setQuantity(quantity+1);
    }
    useEffect(()=>{
        updateQuantity(id,quantity)
    },[id, quantity, updateQuantity])
    return (
        <div className="flex items-center justify-center text-background w-full text-sm gap-2">
            <div className="w-[100px] h-[100px] relative overflow-hidden rounded-md shrink-0">
                <Image 
                    src={image}
                    alt={`img-${name}`}
                    loading="lazy"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col items-start justify-center w-full gap-2">
                <div className="flex items-center justify-between w-full">
                    <span>{`${name}`}</span>
                    <Trash2 onClick={handleRemove} className="h-4 w-4 cursor-pointer hover:text-background/80"/>
                </div>
                <span className="text-background/80">{`${price} €`}</span>
                <div className="flex items-center justify-between w-full">
                    <div className="flex border-1 border-background items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4 py-1">
                        <Minus onClick={quantity === 1 ? undefined : handleSusQuantity } className={`h-4 w-4 ${quantity === 1 ? "text-background/60" : "cursor-pointer  hover:text-background/80"}`} />
                        <span>{quantity}</span>
                        <Plus onClick={quantity === 10 ? undefined :handlePlusQuantity} className={`h-4 w-4 ${quantity === 10 ? "text-background/60" : "cursor-pointer  hover:text-background/80"}`}/>
                    </div>
                    <span className="text-background/80">{`${price*quantity} €`}</span>
                </div>
            </div>
            
        </div>
    );
}