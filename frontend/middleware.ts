import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes("staff")) {
    return checkStaffAcess(request);
  }

  if (pathname.includes("admin")) {
    return checkAdminAcess(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"],
};

const checkAdminAcess = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/admin/logout") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("ecomerce-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
};

const checkStaffAcess = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/staff/login" || pathname === "/staff/logout") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/staff")) {
    const token = request.cookies.get("ecomerce-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/staff/login", request.url));
    }
  }
};
