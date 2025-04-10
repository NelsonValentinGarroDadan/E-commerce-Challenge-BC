import InfoCard from "@/components/infoCard";
import { ShieldCheck, Truck, Zap } from "lucide-react";

export default function ChooseUs(){
    return(
        <section className="section-container flex-col">
            <div className="flex flex-col justify-center items-center gap-3 w-full">
                <h1 className="font-roboto text-2xl lg:text-4xl font-bold text-text w-full text-center">
                    ¿Por qué elegirnos?
                </h1>
                <p className="font-roboto text-xl lg:text-2xl text-text/90 w-full text-center">
                    Nos comprometemos a ofrecerte la mejor experiencia de compra
                </p>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 w-full py-6 gap-10">
                <InfoCard icon={<Truck />}  title="Envío rápido" des="Entrega en 24-48 horas para pedidos nacionales"/>
                <InfoCard icon={<ShieldCheck />}  title="Garantía de calidad" des="Todos nuestros productos tienen 2 años de garantía"/>
                <InfoCard icon={<Zap />}  title="Soporte técnico" des="Asistencia técnica disponible 7 días a la semana"/>
            </section>
        </section>
    )
}