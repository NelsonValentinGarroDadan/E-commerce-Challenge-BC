import z from 'zod'
import { ErrorSchema } from './error.schema'

export const BaseResponseSchema = <T extends z.ZodTypeAny, M extends z.ZodTypeAny = z.ZodUndefined>(
  resultSchema: T,
  metaSchema?: M
) =>
  z.object({
    statusCode: z.number(),
    result: resultSchema.nullable(),
    errors: z.array(ErrorSchema),
    meta: metaSchema ?? z.undefined() // por defecto undefined
  })
