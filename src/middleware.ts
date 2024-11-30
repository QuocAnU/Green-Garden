/* eslint-disable */
// @ts-nocheck

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin/(.*)", "/checkout"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    try {
      const { sessionClaims } = await auth.protect();

      const userRoles = sessionClaims?.metadata?.roles || [];

      if (isAdminRoute(req)) {
        if (!userRoles.includes("admin")) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        if (!req.nextUrl.pathname.startsWith("/admin")) {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // For non-protected routes, continue normally
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
