import { ReactElement } from "react";


export default function InfoCard({icon,title,des}:{icon:ReactElement, title:string, des?:string}){
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 rounded border-text border-1">
            <span className="flex items-center justify-center p-2 h-14 w-14 bg-primary/40 rounded-full">{icon}</span>
            <span className="text-text font-lora bolder text-lg md:text-xl">{title}</span>
            {
                des && <span className="text-text/90 font-lora text-sm md:text-lg text-center">{des}</span>
            }
        </div>
    );
}