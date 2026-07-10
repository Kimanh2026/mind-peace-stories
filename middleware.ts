import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "vi"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const preferred = request.headers.get("accept-language")?.toLowerCase().includes("vi")
    ? "vi"
    : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|icon.svg|og.png|robots.txt|sitemap.xml|.*\\..*).*)"],
};
