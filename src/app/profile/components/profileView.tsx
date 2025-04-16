"use client"

import LoaderSpin from "@/components/loaderSpin";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { getProductsFavorites } from "@/lib/fetchProducts";
import { getUser } from "@/lib/fetchUser";
import { useUserStore } from "@/store/useUserStore"
import { Product, ResponseProducts } from "@/types/api";
import { UserReponse } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound, X } from "lucide-react";
import Link from "next/link";
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
    const { data:user, isLoading:isLoadingUser, error:errorUser} = useQuery<UserReponse>({
        queryKey: ['user'], 
        queryFn: ()=> getUser(token ?? ""),
    })
    const { data:favorites, error:errorFavorites, isLoading:isLoadingFavorites} = useQuery<ResponseProducts, Error>({
        queryKey: ['favorite'], 
        queryFn: () => getProductsFavorites({
            token: token ?? "",
            limit:"6",
            page:"1",
        }), 
    });

    if (isLogin === null) return null;
    if (!isLogin) return null;
    if(!token) return null;
    return(
        <section className="section-container flex-col mt-20 gap-4">
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
                            isLoadingUser ? <LoaderSpin /> :
                            user ? 
                                <div className="flex flex-col items-center justify-center w-full px-4 gap-2">
                                    <CircleUserRound className="text-text w-20 h-20"/>
                                    <span className="text-text text-sm">{user.result?.name}</span>
                                    <span className="text-text text-sm">{user.result?.email}</span>
                                </div>
                            : errorUser && <div>Ocurrio un error</div>
                        }  
                        <Button onClick={logout} className="bg-red-500/80 hover:bg-red-500 text-text w-full">Cerrar sesion</Button>
                    </div>
                </section>
                <section className="flex flex-col items-center justify-center rounded-lg border-1 border-text p-4 w-full gap-3">
                    <h2 className="font-roboto text-xl lg:text-2xl font-bold text-text w-full">
                        Mis favoritos
                    </h2> 
                    <span className="text-text/70 text-sm w-full">Productos que has marcado como favoritos</span>  
                    
                        {
                            isLoadingFavorites ? (
                                    <LoaderSpin/>
                            ) : errorFavorites ? ( <div>Error: {errorFavorites.message}</div> )
                            : favorites?.result && favorites?.result.length > 0 ?
                                <section className="grid grid-cols-1 lg:grid-cols-2 w-full py-5 gap-2">
                                    {
                                        favorites?.result?.map((product:Product)=>(
                                            <ProductCard 
                                                key={product.id}
                                                {...product}
                                                showFavoriteButton={false}
                                            />
                                        ))
                                    }
                                </section>
                                :
                                (
                                    <div className="flex items-start justify-center gap-2 mt-3 h-10">
                                        <span className="text-text/80 text-sm"
                                        > Todavia no tienes productos favoritos.</span>
                                        <Link href="/products" className="text-text/80 text-sm font-bold hover:border-b-1 hover:border-b-text !ease-in-out !duration-75">¿Quieres agregar algunos?</Link>
                                    </div>
                                )
                            
                        }
                    
                </section>
            </section>

            
            
        </section>
    )
}