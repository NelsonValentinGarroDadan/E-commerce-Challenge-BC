"use client";
import InputField from "@/components/ui/inputField";
import { Auth } from "@/types/auth.type";
import { useFormContext } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Auth>();
  return (
    <div className="flex flex-col gap-3 w-full">
        <InputField 
          errors={errors}
          id="email"
          label="Correro electrónico"
          register={register}
          type="email"
        />

        <InputField 
          errors={errors}
          id="password"
          label="Contraseña"
          register={register}
          type="password"
        />  
    </div>
  );
}
