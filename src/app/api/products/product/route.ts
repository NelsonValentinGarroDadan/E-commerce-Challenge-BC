import { NextRequest, NextResponse } from 'next/server'
import { ResponseProductSchema } from '@/schemas/api'
import { Product } from '@/types/api';
import { findProductById } from '@/lib/api/products';

export async function GET(req: NextRequest) {
    //extrae los parametros de la url
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    if(!id){
        return NextResponse.json({
            statusCode: 400,
            result: null,
            errors: [{ name: 'BadRequest', description: 'Se necesita el ID' }]
            }, { status: 404 })
    }
    let result: Product | null = null;
    // llamamos a la funcion para traer el producto 
    if (id) result = findProductById(id)
    //validamos que el producto exista sino se envia un 404
    if (!result) {
        return NextResponse.json({
        statusCode: 404,
        result: null,
        errors: [{ name: 'NotFound', description: 'Producto no encontrado' }]
        }, { status: 404 })
    }

    const response = {
        statusCode: 200,
        result ,
        errors: []
    }
    //valida la respuesta con el schema de respuesta
    const parsed = ResponseProductSchema.safeParse(response);
    if (!parsed.success) {
    return NextResponse.json({
        statusCode: 500,
        result: null,
        errors: [{ name: 'ResponseValidation', description: 'Formato de respuesta inválido' }]
    }, { status: 500 })
    };
    //retorna la respuesta en formato json
    return NextResponse.json(parsed.data);
}