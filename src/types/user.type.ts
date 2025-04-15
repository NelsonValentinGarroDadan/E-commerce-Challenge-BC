import { UserReponseSchema } from "@/schemas/api/user.schema";
import { z } from "zod";

export type UserReponse = z.infer<typeof UserReponseSchema>