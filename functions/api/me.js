
import { verifySession } from "../_shared/auth.js";

export async function onRequestGet({ request, env }) {
  const session = await verifySession(
    request,
    env.SESSION_SECRET
  );

  if (!session) {
    return Response.json(
      { authenticated: false },
      {
        status: 401,
        headers: { "Cache-Control": "no-store" }
      }
    );
  }

  return Response.json(
    {
      authenticated: true,
      guestName: session.guestName
    },
    {
      headers: { "Cache-Control": "no-store" }
    }
  );
}
