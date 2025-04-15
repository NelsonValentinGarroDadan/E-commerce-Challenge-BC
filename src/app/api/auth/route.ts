import { loginUser, registerUser } from "@/lib/api/auth"; 
import { LoginSchema, RegisterSchema, ReponseSchema } from "@/schemas/auth.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const json = await req.json();

  if (json.type === "register") {
    const parsed = RegisterSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          statusCode: 400,
          result: null,
          errors: parsed.error.errors.map((err) => ({
            name: err.path.join("."),
            description: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const response = await registerUser(parsed.data);
    const validated = ReponseSchema.safeParse(response);
    if (!validated.success) {
      return NextResponse.json(
        {
          statusCode: 500,
          result: null,
          errors: [{ name: "ResponseValidation", description: "Formato de respuesta inválido" }],
        },
        { status: 500 }
      );
    }

    return NextResponse.json(validated.data, { status: validated.data.statusCode });
  }

  if (json.type === "login") {
    const parsed = LoginSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          statusCode: 400,
          result: null,
          errors: parsed.error.errors.map((err) => ({
            name: err.path.join("."),
            description: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const response = await loginUser(parsed.data);
    const validated = ReponseSchema.safeParse(response);

    if (!validated.success) {
      return NextResponse.json(
        {
          statusCode: 500,
          result: null,
          errors: [{ name: "ResponseValidation", description: "Formato de respuesta inválido" }],
        },
        { status: 500 }
      );
    }

    return NextResponse.json(validated.data, { status: validated.data.statusCode });
  }

  return NextResponse.json(
    {
      statusCode: 400,
      result: null,
      errors: [{ name: "BadRequest", description: "Tipo de acción inválido" }],
    },
    { status: 400 }
  );
}
