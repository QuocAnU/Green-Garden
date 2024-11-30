import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the protected routes
const isProtectedRoute = createRouteMatcher(["/admin/(.*)", "/checkout"]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the route is protected
  if (isProtectedRoute(req)) {
    // Authenticate the user
    const user = await auth.protect();

    // Fetch the user's roles from the session or database
    const roles = user?.publicMetadata?.roles || [];

    // Check if the user has the .admin role for admin routes
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      !roles.includes(".admin")
    ) {
      return new Response("Forbidden", { status: 403 });
    }

    // Redirect admin users to the admin dashboard
    if (req.nextUrl.pathname.startsWith("/admin") && roles.includes(".admin")) {
      const dashboardUrl = new URL("/admin/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
