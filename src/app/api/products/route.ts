import { NextRequest, NextResponse } from 'next/server'
import { getPaginatedProducts } from '@/lib/api/products'
import { ResponseProductSchema } from '@/schemas/api'

export async function GET(req: NextRequest) {
  //extrae los parametros de la url
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category') ?? undefined
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  //llama a la funcion getPaginatedProducts para obtener los productos paginados
  const result = getPaginatedProducts({ category, page, limit })
  //configura la respuesta
  const response = {
    statusCode: 200,
    result: result.products,
    errors: [],
    meta: {
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      limit
    }
  }
  //valida la respuesta con el schema de respuesta
  const parsed = ResponseProductSchema.safeParse(response)
  if (!parsed.success) {
    return NextResponse.json({
      statusCode: 500,
      result: null,
      errors: [{ name: 'ResponseValidation', description: 'Formato de respuesta inválido' }]
    }, { status: 500 })
  }
  //retorna la respuesta en formato json
  return NextResponse.json(parsed.data)
}
