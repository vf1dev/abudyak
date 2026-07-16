const { getStore } = require("@netlify/blobs");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function getId(event) {
  if (event.queryStringParameters?.id) {
    return event.queryStringParameters.id;
  }
  const parts = (event.path || "").split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  if (last && last !== "tags") return last;
  return null;
}

function getTagsStore() {
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

    const store = getTagsStore();

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
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "server_error", message: err.message }),
    };
  }
};
