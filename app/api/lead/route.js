
const text = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// 5 form sends per IP per 10 minutes.
// ponytail: kept in this server's memory (fine on Hostinger's single Node process); resets on restart and isn't shared between Vercel instances.
const hits = new Map();
function limited(ip) {
  const now = Date.now(), recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (hits.size > 5000) hits.clear(); // never let the map grow without bound
  hits.set(ip, [...recent, now]);
  return recent.length >= 5;
}

export async function POST(request) {
 
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return Response.json({ error: "Not allowed" }, { status: 403 });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "Too many requests" }, { status: 429 });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  // Hidden "website" field: people never see it, bots fill it in. Pretend it worked.
  if (text(body.website, 200)) return Response.json({ ok: true });

  const name = text(body.name, 80);
  const age = Number(body.age);
  const phone = text(body.phone_international, 20);
  const program = text(body.program, 80);
  const country = text(body.country_name, 60);
  if (!name || !Number.isInteger(age) || age < 1 || age > 100 || !/^\+\d{8,15}$/.test(phone) || !program) {
    return Response.json({ error: "Please check your details." }, { status: 400 });
  }

  const { TELECRM_ENTERPRISE_ID: id, TELECRM_TOKEN: token } = process.env;
  if (!id || !token) {
    console.error("[lead] TELECRM_ENTERPRISE_ID / TELECRM_TOKEN not set");
    return Response.json({ error: "Not configured" }, { status: 503 });
  }

  // Field keys are TeleCRM "API names". name + phone always exist; TeleCRM ignores any field the workspace doesn't have.
  const fields = {
    name,
    phone: phone.slice(1), // TeleCRM wants country code + number, no "+": 919876543210
    age: String(age),
    country,
    program,
    source: "Website",
    page: text(body.page, 200),
  };
  try {
    const res = await fetch(`https://next-api.telecrm.in/enterprise/${encodeURIComponent(id)}/autoupdatelead`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`TeleCRM ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[lead] could not send to TeleCRM:", error.message);
    return Response.json({ error: "Could not send" }, { status: 502 });
  }
}
