import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from "jose";



export async function middleware(request: NextRequest ) {
  const jwt = request.cookies.get("token")!;
  let url = request.url;



  //if (!jwt) return NextResponse.redirect(new URL("/", request.url));
  if (!jwt && url.includes('/admin')){
    return NextResponse.redirect("http://localhost:3000/");
  }


  if (jwt && url === "http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000/admin");
  }



  // try {
  //   const { payload } = await jwtVerify(
  //     jwt,
  //     new TextEncoder().encode(`${process.env.JWT_SECRET_SEED}`)
  //   );
  //   return NextResponse.next();
  // } catch (error) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }


}

// export const config = {
//   matcher: ["/admin/:path*"],
// };
