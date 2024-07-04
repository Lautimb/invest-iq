import type { NextRequest } from "next/server";
import { getSession } from "./app/lib/actions";

export async function middleware(request: NextRequest) {
  const currentUser = await getSession();

  const publicPaths = ["/login", "/register"];
  const privatePaths = ["/dashboard"];

  const isPrivatePath = privatePaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (currentUser && isPublicPath) {
    return Response.redirect(new URL("/dashboard", request.url));
  }
  if (!currentUser && isPrivatePath) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
