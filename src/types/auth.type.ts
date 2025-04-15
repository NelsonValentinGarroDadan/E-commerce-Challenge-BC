import { z } from "zod";
import { authSchema, LoginSchema, RegisterSchema, ReponseSchema } from "@/schemas/auth.schema";

export type Login = z.infer<typeof LoginSchema>

export type Register = z.infer<typeof RegisterSchema>

export type Auth = z.infer<typeof authSchema>;

export type ResponseAuthSchema = z.infer<typeof ReponseSchema>