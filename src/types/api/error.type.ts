import { ErrorSchema } from "@/schemas/api/error.schema";
import { z } from "zod";

export type Error = z.infer<typeof ErrorSchema>;