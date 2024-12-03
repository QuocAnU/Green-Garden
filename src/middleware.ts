/* eslint-disable */
// @ts-nocheck

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin/(.*)", "/checkout"]);
const isAdminRoute = createRouteMatcher(["/admin/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    try {
      console.log("Checking authentication...", await auth.protect());
      const { getToken, has } = await auth.protect();
      console.log("Token:", await getToken());
      console.log("hash", await has("admin"));
      const { userId } = await auth.protect();
      const { sessionClaims } = await auth.protect();
      const userRoles = sessionClaims?.metadata?.roles || [];
      console.log("Session claims:", sessionClaims);
      console.log("User roles:", userRoles);

      // if (isAdminRoute(req)) {
      //   if (!userRoles.includes("admin")) {
      //     console.warn("Unauthorized access attempt to admin route.");
      //     return NextResponse.redirect(new URL("/", req.url));
      //   }
      // }

      return NextResponse.next();
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // Cho các route không cần bảo vệ, tiếp tục xử lý bình thường
  // return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|static|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
