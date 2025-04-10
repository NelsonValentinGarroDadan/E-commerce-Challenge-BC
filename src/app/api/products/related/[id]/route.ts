import { NextRequest, NextResponse } from 'next/server'
import { ResponseProductSchema } from '@/schemas/api/product.schema'
import { getRelatedProducts } from '@/lib/api/products'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    if(!id){
      return NextResponse.json({
          statusCode: 400,
          result: null,
          errors: [{ name: 'BadRequest', description: 'Se necesita el ID' }]
          }, { status: 404 })
    }
  //llama a la funcion getRelatedProducts para obtener los productos relacionados
  const related = getRelatedProducts(id)
  //si no encuentra el producto respondemos con un error 404
  if (!related) {
    return NextResponse.json({
      statusCode: 404,
      result: null,
      errors: [{ name: 'NotFound', description: 'Producto no encontrado' }]
    }, { status: 404 })
  }
  //configura la respuesta
  const response = {
    statusCode: 200,
    result: related,
    errors: []
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
