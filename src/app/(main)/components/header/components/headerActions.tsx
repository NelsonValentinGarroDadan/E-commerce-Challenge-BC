"use client"

import SwichTheme from "@/components/switchTheme";
import { useCartStore } from "@/store/useCartStore";
import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function HeaderActions({onLinkClick}:{onLinkClick:()=> void}){
    const  { toggleCart } = useCartStore((state)=>state)
    const options = [
        {
            title:"profile",
            icon: <User />,
            href:"/profile",
        },
        {
            title:"favorities",
            icon: <Heart />,
            href:"/favorities",
        },
    ]
    return(
        <ul className="flex items-center justify-center list-none gap-8 p-3 text-background">
            <li className="hover:text-background/90">
                <SwichTheme />
            </li>
            {
                options.map((option)=>(
                    <li 
                        key={option.title} 
                        className="hover:text-background/90"
                        onClick={onLinkClick}
                    >
                        <Link href={option.href}>
                            {option.icon}
                        </Link>
                    </li>
                ))
            }
            <li className="hover:text-background/90 cursor-pointer">
                <ShoppingCart onClick={toggleCart}/>
            </li>
        </ul>
    );
}