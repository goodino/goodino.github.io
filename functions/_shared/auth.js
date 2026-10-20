
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value) {
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
  const binary = atob(padded);

  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

export async function hashCode(code) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(code)
  );

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function getSigningKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSession(guest, secret) {
  const payload = {
    inviteId: guest.invite_id,
    guestName: guest.guest_name,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
  };

  const payloadPart = toBase64Url(
    encoder.encode(JSON.stringify(payload))
  );

  const key = await getSigningKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payloadPart)
  );

  return `${payloadPart}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifySession(request, secret) {
  if (!secret) return null;

  const cookieHeader = request.headers.get("Cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)wedding_session=([^;]+)/);

  if (!match) return null;

  try {
    const parts = match[1].split(".");
    if (parts.length !== 2) return null;

    const [payloadPart, signaturePart] = parts;
    const signature = fromBase64Url(signaturePart);
    const key = await getSigningKey(secret);

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      encoder.encode(payloadPart)
    );

    if (!valid) return null;

    const payload = JSON.parse(
      decoder.decode(fromBase64Url(payloadPart))
    );

    if (
      !payload.inviteId ||
      !payload.guestName ||
      !Number.isFinite(payload.exp) ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function sessionCookie(token) {
  return [
    `wedding_session=${token}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${7 * 24 * 60 * 60}`
  ].join("; ");
}

export function clearSessionCookie() {
  return [
    "wedding_session=",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    "Max-Age=0"
  ].join("; ");
}
