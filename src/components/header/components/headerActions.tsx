"use client"

import SwichTheme from "@/components/switchTheme";
import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function HeaderActions({onLinkClick}:{onLinkClick:()=> void}){
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
        {
            title:"shoppingCart",
            icon: <ShoppingCart />,
            href:"/shopping-cart",
        }
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
        </ul>
    );
}