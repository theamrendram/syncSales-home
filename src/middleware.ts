import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes that require authentication
const protectedRoutes = ["/checkout(.*)"];

const isProtectedRoute = createRouteMatcher(protectedRoutes);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    console.log("Protected route detected");

    try {
      await auth.protect({
        unauthenticatedUrl: `${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_url=${encodeURIComponent(req.nextUrl.href)}`,
      });
      console.log("Protected route protected");
    } catch (error) {
      console.error("Protected route protection failed:", error);
      throw error; // rethrow so Clerk can handle redirect
    }
  }
});

export const config = {
  matcher: [
    // Exclude static files and Next.js internals
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Include API routes
    "/(api|trpc)(.*)",
  ],
};
