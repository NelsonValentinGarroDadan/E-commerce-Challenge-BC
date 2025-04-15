import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode';
import { UserReponseSchema } from '@/schemas/api/user.schema';
import { getUserById } from '@/lib/api/user';
import { UserReponse } from '@/types/user.type';


export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
        return NextResponse.json({
            statusCode: 401,
            result: null,
            errors: [{ name: 'Unauthorized', description: 'Token no proporcionado' }]
        }, { status: 401 });
    }
    const decoded: { id: string; } = jwtDecode(token)
    const user = await getUserById(decoded.id);
    if (!user) {
        return NextResponse.json({
        statusCode: 404,
        result: null,
        errors: [{ name: 'NotFound', description: 'Usuario no encontrada' }]
        }, { status: 404 })
    }
    // Configura la respuesta
    const result:UserReponse = {
        errors: [],
        result:user,
        statusCode:200,
    }
    const parsed = UserReponseSchema.safeParse(result)
    if (!parsed.success) {
        return NextResponse.json({
        statusCode: 500,
        result: null,
        errors: [{ name: 'ResponseValidation', description: 'Formato de respuesta inválido' }]
        }, { status: 500 })
    }
    // Retorna la respuesta en formato JSON
    return NextResponse.json( result ) ;
}
