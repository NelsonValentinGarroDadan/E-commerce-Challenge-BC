"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "@/types/auth.type";
import { authSchema } from "@/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { postAuth } from "@/lib/fetchAuth";
import {  ResponseAuthSchema } from "@/types/auth.type"
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { X } from "lucide-react";
export default function AuhtView(){
    const router = useRouter();
    const { mutate, isPending } = useMutation<ResponseAuthSchema,AxiosError<{ errors: { title: string; description: string }[]}>,Auth>({
        mutationFn: (data:Auth) => postAuth(data),
        onSuccess: (data) => {
            toast.success(`${data.result?.message}`,{
                duration:4000,
                richColors: true,
                action:{
                    label: <X className="h-3 w-3 text-tex"/>,
                    onClick: ()=>{}
                },

            })
            if (data.statusCode === 200) {
                setTimeout(() => {
                    router.push("/"); 
                }, 500);
            }
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
    const [isLogin, setIsLogin] = useState(true);
    const methods = useForm< Auth >({
        mode:"onChange",
        resolver: zodResolver(authSchema),
        defaultValues: {
            type:"login"
        },
    });
    const { 
        handleSubmit,
        formState:{ isValid }, 
        setValue,
        clearErrors,
    } = methods;
    const handleAuthSwitch = (login: boolean) => {
        setIsLogin(login);
        setValue("type", !isLogin ? "login" : "register");   
        clearErrors();
      };
    const onSubmit= (data:Auth) =>{
        mutate(data)
    }
    return(
        <section className="section-container mt-20">
            <section className="flex flex-col items-start justify-center border-1 border-text p-5 gap-3 font-roboto">
                <h1 className="text-text text-3xl">Cuenta</h1>
                <p className="text-text/80 text-sm w-full">Inicia sesión o regístrate para continuar</p>
                <div className="flex items-center justify-center w-full bg-text/50">
                    <button 
                        type="button" 
                        className={`${isLogin? "text-background/80" : "text-background cursor-pointer bg-text/70" } w-full`}
                        onClick={isLogin?undefined:()=>handleAuthSwitch(true)}
                    >
                        Inciar Sesión
                    </button>
                    <button 
                        type="button" 
                        className={`${!isLogin? "text-background/80" : "text-background cursor-pointer bg-text/70" } w-full`}
                        onClick={!isLogin?undefined:()=>handleAuthSwitch(false)}
                    >
                        Registrarse
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center min-h-70 w-full gap-3">
                    <FormProvider {...methods}> 
                        {
                            isLogin ?  <LoginForm />  : <RegisterForm /> 
                        }
                    </FormProvider>
                    <Button type="submit" className="w-full" disabled={!isValid}>{isPending ? "Enviando..." : isLogin ? "Iniciar sesión" :"Registrarse" }</Button>
                </form>
            </section>
        </section>  
    );
}