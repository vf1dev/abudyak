import { getStore } from "@netlify/blobs";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers });
}

function getId(request, context) {
  const url = new URL(request.url);
  const fromQuery = url.searchParams.get("id");
  if (fromQuery) return fromQuery;

  const fromParams = context?.params?.id;
  if (fromParams) return fromParams;

  const parts = url.pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  if (last && last !== "tags") return last;
  return null;
}

function getTagsStore() {
  const siteID =
    process.env.SITE_ID ||
    process.env.NETLIFY_SITE_ID ||
    process.env.BLOBS_SITE_ID;
  const token =
    process.env.NETLIFY_AUTH_TOKEN ||
    process.env.NETLIFY_TOKEN ||
    process.env.BLOBS_TOKEN;

  if (siteID && token) {
    return getStore({ name: "petty-tags", siteID, token });
  }

  // Works automatically on Git-connected Netlify deploys
  return getStore("petty-tags");
}

export default async (request, context) => {
  if (request.method === "OPTIONS") {
    return new Response("", { status: 204, headers });
  }

  try {
    const id = getId(request, context);
    if (!id) return json(400, { error: "missing_id" });

    const store = getTagsStore();

    if (request.method === "GET") {
      const tag = await store.get(id, { type: "json" });
      if (!tag) return json(404, { error: "not_found" });
      return json(200, tag);
    }

    if (request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const { ownerName, phone, petName } = body;

      if (!ownerName || !phone || !petName) {
        return json(400, { error: "missing_fields" });
      }

      const existing = await store.get(id, { type: "json" });
      if (existing) {
        return json(409, { error: "already_registered", tag: existing });
      }

      const tag = {
        ownerName: String(ownerName).trim(),
        phone: String(phone).trim(),
        petName: String(petName).trim(),
        createdAt: Date.now(),
      };

      await store.setJSON(id, tag);
      return json(201, tag);
    }

    return json(405, { error: "method_not_allowed" });
  } catch (err) {
    console.error(err);
    const message = String(err.message || err);
    const hint = message.includes("not been configured")
      ? "أضف NETLIFY_AUTH_TOKEN و SITE_ID في Environment variables ثم أعد النشر"
      : message;
    return json(500, { error: "server_error", message: hint });
  }
};

export const config = {
  path: ["/api/tags", "/api/tags/:id"],
};
