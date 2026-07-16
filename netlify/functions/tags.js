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

function pantryBasketUrl() {
  const pantryId = (process.env.PANTRY_ID || "").trim();
  if (!pantryId) {
    throw new Error("أضف PANTRY_ID في Netlify Environment variables من getpantry.cloud");
  }
  return `https://getpantry.cloud/apiv1/pantry/${encodeURIComponent(pantryId)}/basket/petty-tags`;
}

async function readTags() {
  const res = await fetch(pantryBasketUrl());
  if (res.status === 400 || res.status === 404) return {};
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `pantry_read_${res.status}`);
  }
  const data = await res.json().catch(() => ({}));
  return data && typeof data === "object" ? data : {};
}

async function writeTags(tags) {
  let res = await fetch(pantryBasketUrl(), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tags),
  });

  if (res.ok) return;

  res = await fetch(pantryBasketUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tags),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `pantry_write_${res.status}`);
  }
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

    if (event.httpMethod === "GET") {
      const tags = await readTags();
      const tag = tags[id];
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

      const tags = await readTags();
      if (tags[id]) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({ error: "already_registered", tag: tags[id] }),
        };
      }

      const tag = {
        ownerName: String(ownerName).trim(),
        phone: String(phone).trim(),
        petName: String(petName).trim(),
        createdAt: Date.now(),
      };

      tags[id] = tag;
      await writeTags(tags);
      return { statusCode: 201, headers, body: JSON.stringify(tag) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: "method_not_allowed" }) };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "server_error", message: err.message || String(err) }),
    };
  }
};
