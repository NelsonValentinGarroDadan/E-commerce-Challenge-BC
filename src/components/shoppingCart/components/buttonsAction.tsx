"use client"
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useShoppingCart";

export default function ButtonsAction () {
    const  { closeCart , cleanCart , items,buy} = useCartStore((state)=>state);
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.21;
    const iva = subtotal * taxRate;
    const total = subtotal + iva;
    return(
        <div className="flex flex-col items-center justify-center w-full border-t-1 border-text/70 text-background text-left text-sm gap-2">
            <div className="flex items-center justify-between w-full">
                <span>Subtotal</span>
                <span>{`${subtotal.toFixed(2)} €`}</span>
            </div>
            <div className="flex items-center justify-between w-full">
                <span>{`IVA (${taxRate*10}%)`}</span>
                <span>{`${iva.toFixed(2)} €`}</span>
            </div>
            <div className="flex items-center justify-between w-full">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">{`${total.toFixed(2)} €`}</span>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <Button className="w-full" disabled={total <= 0} onClick={buy}>Finalizar compra</Button>
                <div className="flex items-center justify-center w-full gap-2 p-2">
                    <Button className="w-full" variant="outline" onClick={closeCart} >Seguir comprando</Button>
                    <Button className="w-full" variant="outline" onClick={cleanCart} disabled={total <= 0}>Vaciar carrito</Button>
                </div>
            </div>
        </div>
    );
}