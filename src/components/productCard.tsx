import { Product } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useMutation } from "@tanstack/react-query";
import { ResponseAuthSchema } from "@/types/auth.type";
import { AxiosError } from "axios";
import { saveFavorite } from "@/lib/fetchUser";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoaderSpin from "./loaderSpin";

export default function ProductCard({id,image,name,price}:Product) {
    const router = useRouter();
    const {isLogin,token} = useUserStore((state)=>state);
    const { mutate, isPending } = useMutation<ResponseAuthSchema,AxiosError<{ errors: { title: string; description: string }[]}>>({
            mutationFn: () =>{ 
                if (isLogin && token) return saveFavorite({ token, productId: id });
                router.push('/profile')
                return Promise.reject(new Error("Usuario no autenticado"));
            },
            onSuccess: (data) => {
                toast.success(`${data.result?.message}`,{
                    duration:4000,
                    richColors: true,
                    action:{
                        label: <X className="h-3 w-3 text-text"/>,
                        onClick: () => toast.dismiss()
                    },
    
                })
            },
            onError: (error) => {
                error.response?.data?.errors?.map(
                    (err)=> 
                        toast.error(`${err.description}`,{
                            duration:4000,
                            richColors: true,
                        })
                )
            }
          });
    const {addItem,isOpen, toggleCart} = useCartStore((state)=>state);
    const handleAddItemToCart = () =>{
        addItem({
            id,
            image,
            name,
            price,
            quantity:1,
        });
        if(!isOpen) toggleCart();
    }
    return (
        <div className="w-full bg-text shadow-text shadow-md flex flex-col justify-start">
                
                    <div className="w-full relative bg-text flex justify-start items-center">
                        <Link href={`/products/?productId=${id}`} className="h-60 relative w-full">
                            <Image 
                                src={image}
                                alt={`img-${name}`}
                                fill
                                style={{ objectFit: "cover" }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        
                        </Link>
                        <div className="flex justify-center items-center absolute top-1 right-1 h-7 w-7 z-10">
                            {
                                isPending ?
                                    <LoaderSpin />
                                :
                                <button 
                                    type="button" 
                                    className="w-full h-full bg-background/80 hover:bg-background rounded-full p-1 cursor-pointer group"
                                    onClick={()=>mutate()}
                                >
                                    <Heart className="h-full w-full text-text/80 group-hover:text-text"/>
                                </button>
                            }
                        </div>
                        
                    </div>
                

                <div className="flex flex-col items-center justify-center p-5 h-40">
                    <span className="flex items-center justify-start text-background w-full text-left">{name}</span>
                    <span className="flex items-center justify-start text-background w-full text-left">{`${price} €`}</span>
                    <div className="flex items-center justify-center w-full p-5">
                        <Button onClick={handleAddItemToCart } variant="default" className="gap-2 w-full">
                            <ShoppingCart /> Añadir al carrito
                        </Button>
                    </div>
                </div>
            </div>
    );
}