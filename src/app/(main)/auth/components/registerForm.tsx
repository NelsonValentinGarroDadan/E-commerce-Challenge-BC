import InputField from "@/components/ui/inputField";
import { Auth } from "@/types/auth.type";
import { useFormContext } from "react-hook-form";

export default function RegisterForm(){
    const {
        register,
        formState: { errors },
      } = useFormContext<Auth>();
    return(
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <div className="w-full">
                <InputField 
                    errors={errors}
                    id="name"
                    label="Nombre"
                    register={register}
                    type="text"
                />
                <InputField 
                    errors={errors}
                    id="password"
                    label="Constraseña"
                    register={register}
                    type="password"
                />
            </div>
            <div className="w-full">
                <InputField 
                    errors={errors}
                    id="email"
                    label="Correo electronico"
                    register={register}
                    type="text"
                />
                <InputField 
                    errors={errors}
                    id="confirm"
                    label="Confirmar onstraseña"
                    register={register}
                    type="password"
                />
            </div>
        </div>
    )
}