import { NextRequest, NextResponse } from 'next/server'
import { ResponseProductsSchema } from '@/schemas/api/product.schema'
import { getRelatedProducts } from '@/lib/api/products'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    if(!id){
      return NextResponse.json({
          statusCode: 400,
          result: null,
          errors: [{ name: 'BadRequest', description: 'Se necesita el ID' }]
          }, { status: 404 })
    }
  //llama a la funcion getRelatedProducts para obtener los productos relacionados
  const related = getRelatedProducts({productId:id,page , limit });
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
    result: related.products,
    errors: [],
    meta: {
      total: related.total,
      page: related.page,
      totalPages: related.totalPages,
      limit
    }
  }
  //valida la respuesta con el schema de respuesta
  const parsed = ResponseProductsSchema.safeParse(response)
  console.log(parsed.success);
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
