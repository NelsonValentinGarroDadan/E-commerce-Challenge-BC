import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'
import { ResponseProductsSchema } from '@/schemas/api'
import { getUserFavorites, saveFavoriteProduct } from '@/lib/api/user'
import { ReponseSchema } from '@/schemas/auth.schema'

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
  const category = searchParams.get('category') || undefined
  const name = searchParams.get('name') || undefined
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  // obtiene los favoritos
  const result = await getUserFavorites({category, name, userId , page, limit })
  console.log(result)
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
export async function POST(req: NextRequest) {
  // Validar token
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  console.log(token);
  if (!token) {
    return NextResponse.json({
      statusCode: 401,
      result: null,
      errors: [{ name: 'Unauthorized', description: 'Token no proporcionado' }]
    }, { status: 401 })
  }

  let decoded: { id: string }
  try {
    decoded = jwtDecode(token)
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      statusCode: 401,
      result: null,
      errors: [{ name: 'InvalidToken', description: 'Token inválido' }]
    }, { status: 401 })
  }

  const userId = decoded.id;
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get('productId');
  // Guardar favorito
  try {
    const result = await saveFavoriteProduct({userId, productId:productId ?? ""})
    if(result){
      return NextResponse.json({
        statusCode: 400,
        result: null,
        errors: [{ name: 'BadRequest', description: result }]
      }, { status: 400 })
    }
    const response = {
      statusCode: 200,
      result: { message: 'Producto agregado a favoritos correctamente' },
      errors: []
    }

    const parsed = ReponseSchema.safeParse(response)
    if (!parsed.success) {
      return NextResponse.json({
        statusCode: 500,
        result: null,
        errors: [{ name: 'ResponseValidation', description: 'Formato de respuesta inválido' }]
      }, { status: 500 })
    }

    return NextResponse.json(parsed.data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      statusCode: 500,
      result: null,
      errors: [{ name: 'ServerError', message:'Error al guardar el favorito' }]
    }, { status: 500 })
  }
}