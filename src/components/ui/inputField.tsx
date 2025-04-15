import { Auth } from "@/types/auth.type";
import { UseFormRegister, FieldErrors } from "react-hook-form";


const InputField = ({ label, id, type, register, errors }: {
    label: string;
    id: "type" | "email" | "password" | "name" | "confirm";
    type: string;
    register: UseFormRegister<Auth>;
    errors: FieldErrors;
  }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={id} className="text-text text-lg">{label}</label>
      <input
        type={type}
        id={id}
        {...register(id)}
        className="w-full bg-transparent outline-none text-text border-1 border-text/50 rounded-md px-2 focus:border-text"
      />
      <p className="text-red-500 text-xs min-h-5">
        {errors[id] && errors[id]?.message as string}
      </p>
    </div>
  );
};

export default InputField;
