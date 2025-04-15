import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'
import { ResponseProductsSchema } from '@/schemas/api'
import { getUserFavorites } from '@/lib/api/user'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({
      statusCode: 401,
      result: null,
      errors: [{ name: 'Unauthorized', description: 'Token no proporcionado' }]
    }, { status: 401 })
  }

  // Decodifica el token
  let decoded: { id: string }
  try {
    decoded = jwtDecode(token)
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 401,
      result: null,
      errors: [{ name: 'InvalidToken', description: 'Token inválido' }]
    }, { status: 401 })
  }

  const userId = decoded.id

  // extrae los parámetros de paginación
  const { searchParams } = req.nextUrl
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const category = searchParams.get('category') ?? undefined
  const name = searchParams.get('name') || undefined
  // obtiene los favoritos
  const result = await getUserFavorites({category, name, userId , page, limit })
  // estructura la respuesta
  const response = {
    statusCode: 200,
    result: result?.products,
    errors: [],
    meta: {
      total: result?.total,
      page: result?.page,
      totalPages: result?.totalPages,
      limit
    }
  }

  const parsed = ResponseProductsSchema.safeParse(response)
  if (!parsed.success) {
    console.error(parsed.error.format()) // debug si algo sale mal
    return NextResponse.json({
      statusCode: 500,
      result: null,
      errors: [{ name: 'ResponseValidation', description: 'Formato de respuesta inválido' }]
    }, { status: 500 })
  }

  return NextResponse.json(parsed.data)
}
