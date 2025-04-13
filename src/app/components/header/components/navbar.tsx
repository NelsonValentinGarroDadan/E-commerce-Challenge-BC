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
                                "relative text-background after:content-[''] after:block after:absolute after:left-[50%] after:w-1 after:h-1 after:rounded-full after:bg-background after:mx-auto after:mt-1"
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