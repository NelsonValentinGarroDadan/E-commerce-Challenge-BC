import { NextResponse } from 'next/server'
import { getCategories } from '@/lib/api/categories'
import { ResponseCategorySchema } from '@/schemas/api'

export async function GET() {
    //llama a la funcion getCategories para obtener las categorias
    const categories = await getCategories();
    //configura la respuesta
    const response = {
        statusCode: 200,
        result: categories,
        errors: []
    };
    //valida la respuesta con el schema de respuesta
    const parsed = ResponseCategorySchema.safeParse(response);
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
