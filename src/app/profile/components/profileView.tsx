"use client"

import LoaderSpin from "@/components/loaderSpin";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/fetchUser";
import { useUserStore } from "@/store/useUserStore"
import { UserReponse } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ProfileView(){
    const {isLogin,logout,token} = useUserStore((state) => state);
    const router = useRouter();
    useEffect(()=>{
        if(isLogin === false){
            toast.warning("Inicia sesion",{
                duration:4000,
                richColors: true,
                action:{
                    label: <X className="h-3 w-3"/>,
                    onClick: () => toast.dismiss()
                },
            });
            router.push('/auth');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLogin]);
    const { data, isLoading, error} = useQuery<UserReponse>({
        queryKey: ['user'], 
        queryFn: ()=> getUser(token ?? ""),
    })

    if (isLogin === null) return null;
    if (!isLogin) return null;
    if(!token) return null;
    
    return(
        <section className="section-container flex-col mt-30 gap-4">
            <h1 className="font-roboto text-2xl lg:text-4xl font-bold text-text w-full">
                Mi cuenta
            </h1> 
            <section className="flex flex-col md:flex-row items-start justify-center gap-4 w-full"> 
                <section className="rounded-lg border-1 border-text p-4 w-full md:w-1/4 flex flex-col gap-3">
                    <h2 className="font-roboto text-xl lg:text-2xl font-bold text-text w-full">
                        Perfil
                    </h2> 
                    <span className="text-text/70 text-xs">Información de tu cuenta</span>
                    <div className="w-full flex flex-col items-center justify-center gap-6 mt-5">
                        {
                            isLoading ? <LoaderSpin /> :
                            data ? 
                                <div className="flex flex-col items-center justify-center w-full px-4 gap-2">
                                    <CircleUserRound className="text-text w-20 h-20"/>
                                    <span className="text-text text-sm">{data.result?.name}</span>
                                    <span className="text-text text-sm">{data.result?.email}</span>
                                </div>
                            : error && <div>Ocurrio un error</div>
                        }  
                        <Button onClick={logout} className="bg-red-500/80 hover:bg-red-500 text-text w-full">Cerrar sesion</Button>
                    </div>
                </section>
                <section className="rounded-lg border-1 border-text p-4 w-full">
                    <h2 className="font-roboto text-xl lg:text-2xl font-bold text-text w-full">
                        Mis favoritos
                    </h2> 
                    <span className="text-text/70 text-sm">Productos que has marcado como favoritos</span>  
                </section>
            </section>

            
            
        </section>
    )
}