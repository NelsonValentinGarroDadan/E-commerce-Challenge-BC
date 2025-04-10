import { z } from "zod";

export const PaginationMetaSchema = z.object({
    total: z.number(),
    page: z.number(),
    totalPages: z.number(),
    limit: z.number()
  })
  