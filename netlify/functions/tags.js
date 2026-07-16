const { getStore, connectLambda } = require("@netlify/blobs");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function getId(event) {
  if (event.queryStringParameters?.id) return event.queryStringParameters.id;
  const parts = (event.path || "").split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  if (last && last !== "tags") return last;
  return null;
}

function getTagsStore(event) {
  try {
    if (typeof connectLambda === "function") connectLambda(event);
  } catch {
    /* ignore */
  }

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

  return getStore("petty-tags");
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    const id = getId(event);
    if (!id) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "missing_id" }) };
    }

    const store = getTagsStore(event);

    if (event.httpMethod === "GET") {
      const tag = await store.get(id, { type: "json" });
      if (!tag) {
        return { statusCode: 404, headers, body: JSON.stringify({ error: "not_found" }) };
      }
      return { statusCode: 200, headers, body: JSON.stringify(tag) };
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const { ownerName, phone, petName } = body;

      if (!ownerName || !phone || !petName) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "missing_fields" }) };
      }

      const existing = await store.get(id, { type: "json" });
      if (existing) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({ error: "already_registered", tag: existing }),
        };
      }

      const tag = {
        ownerName: String(ownerName).trim(),
        phone: String(phone).trim(),
        petName: String(petName).trim(),
        createdAt: Date.now(),
      };

      await store.setJSON(id, tag);
      return { statusCode: 201, headers, body: JSON.stringify(tag) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: "method_not_allowed" }) };
  } catch (err) {
    console.error(err);
    const message = String(err.message || err);
    const hint = message.includes("not been configured")
      ? "أضف SITE_ID و NETLIFY_AUTH_TOKEN في Environment variables على Netlify ثم أعد النشر"
      : message;
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "server_error", message: hint }),
    };
  }
};
