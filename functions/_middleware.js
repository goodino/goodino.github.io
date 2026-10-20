
import { verifySession } from "./_shared/auth.js";

const PUBLIC_PATHS = new Set([
  "/",
  "/index.html",
  "/api/login",
  "/api/me",
  "/api/logout"
]);

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  if (PUBLIC_PATHS.has(path)) {
    return context.next();
  }

  const session = await verifySession(request, env);

  if (!session) {
    if (path.startsWith("/api/")) {
      return Response.json(
        { error: "Authentication required." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" }
        }
      );
    }

    return Response.redirect(new URL("/", url.origin), 302);
  }

  return context.next();
}
