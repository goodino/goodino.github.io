
import { clearSessionCookie } from "../_shared/auth.js";

export async function onRequestPost() {
  return Response.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": clearSessionCookie(),
        "Cache-Control": "no-store"
      }
    }
  );
}
