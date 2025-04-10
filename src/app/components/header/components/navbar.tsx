"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function NavBar({onLinkClick}:{onLinkClick:()=> void}){
    const path =  usePathname();
    const links: {title:string,href:string}[] = [
        {
            title: "Inicio",
            href: "/"
        },
        {
            title: "Productos",
            href: "/products"
        },
        {
            title: "Categorias",
            href: "/categories"
        }
    ]
    return(
        <nav className="flex flex-col md:flex-row items-center justify-center gap-5 p-4">
            {
                links.map((link) => 
                    <Link 
                        key={link.title} 
                        href={link.href}
                        className={`
                            ${path === link.href ? 
                                "text-background"
                            : 
                                "text-background/70 hover:text-background"}
                            font-lora
                            font-lg
                        `}
                        onClick={onLinkClick}
                    >
                        {link.title}
                    </Link> 
                )
            }
        </nav>
    )
}