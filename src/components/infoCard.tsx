import clsx from "clsx";
import Link from "next/link";
import { ReactElement } from "react";


export default function InfoCard({icon,title,des,href}:{icon:ReactElement, title:string, des?:string,href?:string}){
    const isLink = !!href;
    const content =  (
        <div 
        className={clsx(
            "flex flex-col items-center justify-center gap-4 p-4 rounded border-text border-1 bg-background",
            {
              "hover:bg-text/10 cursor-pointer": isLink,
            }
          )}
        >
            <span
                className={clsx(
                "flex items-center justify-center p-2 h-14 w-14 bg-primary/40 rounded-full",
                {
                    "hover:bg-primary/60": isLink,
                }
                )}
            >
             {icon}
            </span>
            <span className="text-text font-lora bolder text-lg md:text-xl">{title}</span>
            {
                des && <span className="text-text/90 font-lora text-sm md:text-lg text-center">{des}</span>
            }
        </div>
    )

    return isLink ? <Link  href={href}> {content} </Link> : content;

}