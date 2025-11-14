import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/checkout(.*)"];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\*/g, ".*")}$`);
    return regex.test(pathname);
  });
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isProtectedRoute(pathname)) {
    console.log("Protected route detected:", pathname);

    try {
      // Better Auth stores session in cookies
      // Check for session cookie (Better Auth typically uses 'better-auth.session_token' or similar)
      const sessionCookie =
        req.cookies.get("better-auth.session_token") ||
        req.cookies.get("session_token") ||
        req.cookies.get("better-auth.session");

      if (!sessionCookie) {
        console.log("No session cookie found, redirecting to auth");
        const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin}/auth?redirect_url=${encodeURIComponent(req.nextUrl.href)}`;
        return NextResponse.redirect(new URL(redirectUrl));
      }

      // Verify session with backend by making a request to the session endpoint
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (backendUrl) {
        try {
          // Forward all cookies to backend for session verification
          const cookieHeader = req.headers.get("cookie") || "";

          const sessionResponse = await fetch(
            `${backendUrl}/api/auth/session`,
            {
              method: "GET",
              headers: {
                Cookie: cookieHeader,
              },
              credentials: "include",
            },
          );

          if (!sessionResponse.ok) {
            throw new Error("Session verification failed");
          }

          const session = await sessionResponse.json();

          if (!session?.data) {
            console.log("Invalid session, redirecting to auth");
            const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin}/auth?redirect_url=${encodeURIComponent(req.nextUrl.href)}`;
            return NextResponse.redirect(new URL(redirectUrl));
          }

          console.log("Protected route protected");
          return NextResponse.next();
        } catch (error) {
          console.error("Session verification error:", error);
          const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin}/auth?redirect_url=${encodeURIComponent(req.nextUrl.href)}`;
          return NextResponse.redirect(new URL(redirectUrl));
        }
      }

      // If no backend URL configured, just check for cookie presence
      console.log("Protected route protected (cookie check only)");
      return NextResponse.next();
    } catch (error) {
      console.error("Protected route protection failed:", error);
      const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin}/auth?redirect_url=${encodeURIComponent(req.nextUrl.href)}`;
      return NextResponse.redirect(new URL(redirectUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
