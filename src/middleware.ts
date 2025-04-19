import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  //Si no hay token, redirige al login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("No token provided");
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jose.jwtVerify(token, secret);
  } catch (error) {
    console.error("Token inválido:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

//Rutas protegidas
export const config = {
  matcher: ["/main/:path*"], //Puedes agregar mas rutas protegidas
};
