import { NextRequest, NextResponse } from "next/server";

/**
 * Route guard for pages that require a signed-in user.
 *
 * The session cookie is set by the API, so this asks the API whether it is
 * valid rather than trusting its presence. The previous version checked for a
 * cookie nothing set and validated it against an endpoint that did not exist,
 * so every protected route fell through to "allowed".
 */
const PROTECTED_PREFIXES = ["/checkout", "/onboarding"];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function redirectToAuth(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  const url = new URL("/auth", appUrl);
  url.searchParams.set("redirect_url", req.nextUrl.href);
  return NextResponse.redirect(url);
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    // Without an API there is nothing to validate against. Failing closed is
    // the only safe reading of a misconfigured deployment.
    console.error("NEXT_PUBLIC_BACKEND_URL is not set; refusing protected route");
    return redirectToAuth(req);
  }

  const cookie = req.headers.get("cookie") ?? "";
  if (!cookie) {
    return redirectToAuth(req);
  }

  try {
    const res = await fetch(`${backendUrl}/api/auth/get-session`, {
      headers: { cookie },
      cache: "no-store",
    });

    if (!res.ok) return redirectToAuth(req);

    // get-session answers 200 with a null body for an absent or expired
    // session, so the status alone is not enough.
    const session = await res.json().catch(() => null);
    if (!session?.user?.id) return redirectToAuth(req);

    return NextResponse.next();
  } catch (error) {
    console.error("Session verification failed:", error);
    return redirectToAuth(req);
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)"],
};
