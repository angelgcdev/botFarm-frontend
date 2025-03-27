import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  //Si no hay token, redirige al login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

//Rutas protegidas
export const config = {
  matcher: ["/dashboard"], //Puedes agregar mas rutas protegidas
};
