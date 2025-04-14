"use client"
import { useCartStore } from "@/store/useShoppingCart";
import ShoppingItem from "./components/shoppingItem"
import { ShoppingBag, X } from "lucide-react";
import ButtonsAction from "./components/buttonsAction";
import { Button } from "../ui/button";

export default function ShoppingCart(){
    const  { items, closeCart, isOpen } = useCartStore((state)=>state)
    return(
        <section 
            className={`
                fixed top-0 right-0 z-60 min-h-screen h-full w-full md:w-1/2 
                flex flex-col items-center justify-between bg-text p-3 
                border-l border-background
                transform ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
        >
            <div className="w-full relative flex items-center justify-center gap-2 pt-2">
                <ShoppingBag className="h-6 w-6 text-background"/>
                <h3 className="text-2xl font-bold text-background gap-2 w-full">Carrito de compra</h3>
                <X  onClick={closeCart} className="h-5 w-5 text-background cursor-pointer absolute hover:opacity-80 -top-0 right-0 z-60"/>
            </div>
            {
                items.length === 0 ? (
                    <section className="flex flex-col items-center justify-center h-full gap-4">
                        <ShoppingBag className="h-8 w-8 text-background/80"/>
                        <h3 className="text-background text-xl font-bold">Tu carrito está vacío</h3>
                        <Button onClick={closeCart}>Continuar comprando</Button>
                    </section>
                ) : (
                    <>
                        <section className="flex flex-col items-center justify-start overflow-y-auto max-h-[50vh] w-full px-5 gap-3">
                            { items.map((item)=> <ShoppingItem key={item.id} {...item} /> )}
                        </section>
                        <ButtonsAction />
                    </>
                )
            }
            
        </section>
    );
}