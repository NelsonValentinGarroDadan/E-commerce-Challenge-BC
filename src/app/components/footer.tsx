import Link from "next/link";

export default function Footer(){
    return(
        <footer className="bottom-0 bg-background bordert-t-text border-t-1">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl w-full p-8 gap-7">
                <span className=""></span>
                <span className="text-text font-roboto">© 2025 TechStore.Todos los derechos reservados.</span>
                <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
                    <Link href="#" className="hover:underline text-text font-roboto">Términos</Link>
                    <Link href="#" className="hover:underline text-text font-roboto">Privacidad</Link>
                    <Link href="#" className="hover:underline text-text font-roboto">Contacto</Link>
                </div>
            </div>
        </footer>
    )
}