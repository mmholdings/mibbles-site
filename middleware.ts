import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n/site";

/**
 * Basic-auth protect /admin. Set ADMIN_USER and ADMIN_PASSWORD in env.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/live/admin")) return protectAdmin(request);

  const localeFromPath = pathname.split("/")[1];
  if (isLocale(localeFromPath)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-mibbles-locale", localeFromPath);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const corePaths = new Set(["/", "/features", "/pricing", "/about", "/download", "/downloads"]);
  const preference = request.cookies.get("NEXT_LOCALE")?.value;
  if (corePaths.has(pathname) && (!preference || preference === "auto")) {
    const accepted = request.headers.get("accept-language")?.toLowerCase() ?? "";
    const preferredLocale = accepted.includes("ja") ? "ja"
      : accepted.includes("pt-br") || accepted.includes("pt") ? "pt-BR"
      : accepted.includes("es") ? "es-419"
      : accepted.includes("fr") ? "fr"
      : accepted.includes("de") ? "de"
      : null;
    if (preferredLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${preferredLocale}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-mibbles-locale", "en");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

function protectAdmin(request: NextRequest) {

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
