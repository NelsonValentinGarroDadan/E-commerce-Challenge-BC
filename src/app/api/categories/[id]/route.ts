import { NextRequest, NextResponse } from 'next/server'
import { getCategoryById } from '@/lib/api/categories'
import { CategorySchema } from '@/schemas/api'

export default async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Llama a la función getCategoryById para obtener la categoría por ID
    const category = await getCategoryById(params.id)
    // Si no encuentra la categoría, respondemos con un error 404
    if (!category) {
        return NextResponse.json({
        statusCode: 404,
        result: null,
        errors: [{ name: 'NotFound', description: 'Categoría no encontrada' }]
        }, { status: 404 })
    }
    // Configura la respuesta
    const parsed = CategorySchema.safeParse(category)
    if (!parsed.success) {
        return NextResponse.json({
        statusCode: 500,
        result: null,
        errors: [{ name: 'ResponseValidation', description: 'Formato de respuesta inválido' }]
        }, { status: 500 })
    }
    // Retorna la respuesta en formato JSON
    return NextResponse.json({
        statusCode: 200,
        result: parsed.data,
        errors: []
    })
}
