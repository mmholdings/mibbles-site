import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Basic-auth protect /admin. Set ADMIN_USER and ADMIN_PASSWORD in env.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const auth = request.headers.get("authorization");
  const expectedUser = process.env.ADMIN_USER ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "change-me-please";

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString();
      const [user, pass] = decoded.split(":");
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Mibbles Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
