import { z } from "zod";
import { BaseResponseSchema } from "./api";

export const LoginSchema = z.object({
    type: z.literal("login"),
    email: z.string().min(1,"Campo requerido"),
    password: z.string().min(1, "Campo requerido"),
});

export const RegisterSchema = z.object({
    type: z.literal("register"),
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Las contraseñas no coinciden",
  });

export const authSchema = z.union([LoginSchema, RegisterSchema]);

export const ReponseSchema = BaseResponseSchema(z.object(
  {
    message:z.string(),
    token: z.string().optional(),
  }))