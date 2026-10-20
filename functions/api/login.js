
import {
  hashCode,
  createSession,
  sessionCookie
} from "../_shared/auth.js";

export async function onRequestPost({ request, env }) {
  if (!env.DB || !env.SESSION_SECRET) {
    return Response.json(
      { error: "Authentication is not configured." },
      { status: 500 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  const code = typeof body.code === "string"
    ? body.code.trim()
    : "";

  if (!code || code.length > 128) {
    return Response.json(
      { error: "Please enter a valid access code." },
      { status: 400 }
    );
  }

  try {
    const codeHash = await hashCode(code);

    const guest = await env.DB
      .prepare(
        `SELECT invite_id, guest_name
         FROM guests
         WHERE code_hash = ? AND active = 1
         LIMIT 1`
      )
      .bind(codeHash)
      .first();

    if (!guest) {
      return Response.json(
        { error: "Incorrect access code. Please try again." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" }
        }
      );
    }

    const token = await createSession(
      guest,
      env.SESSION_SECRET
    );

    return Response.json(
      {
        ok: true,
        guestName: guest.guest_name
      },
      {
        headers: {
          "Set-Cookie": sessionCookie(token),
          "Cache-Control": "no-store"
        }
      }
    );
  } catch {
    return Response.json(
      { error: "Unable to verify your code right now." },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" }
      }
    );
  }
}
