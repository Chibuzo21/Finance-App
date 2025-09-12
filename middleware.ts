import type { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { createClient } from "./lib/supabase/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const response = await updateSession(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  if (!user && path.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", request.url));
  }
  if (
    user &&
    (path === "/" || path.startsWith("/login") || path.startsWith("/signup"))
  ) {
    return Response.redirect(new URL("/dashboard", request.url));
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
// middleware is actually at the root of the project to authenticate, it makes sure it checks all available routes except for the ones mentioned in the matcher above
