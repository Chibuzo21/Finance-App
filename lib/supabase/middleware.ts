import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // request here is a NextRequest object that has info like url,headers,cookies,method etc
  let supabaseResponse = NextResponse.next({
    request,
  });
  // NextRequest.next means pass the request to the next part of the app. This is stored in a variable called supabaseResponse so that we can add or change cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // The createServerClient sets up Supabase with cookies handling so it can track user’s auth session.
      // createServerClient initializes Supabase on the server with cookie management logic.
      cookies: {
        getAll() {
          return request.cookies.getAll();
          // cookies.getAll is a method that reads the cookies through the request to know the user we are talking to
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          // cookies.setAll allows supabsae to updAte session cookies when needed both on the request or response
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // This checks if a user is logged in, if valid user gets details but if invalid user gets null

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/error")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
    // The above means when no user and the page is neither login/auth/error then redirect him to the login page. This redirect is a response that ends the request
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
  //if the user exists, middleware passes request to next handler
  // if the user is authenticated, allow the request to continue to the next handler in the application while ensuring cookies are properly synchronized between the browser and the server to maintain the session.
}
