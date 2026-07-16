const { MongoClient } = require("mongodb");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

let cachedClient = null;

async function getCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in Netlify environment variables");
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  return cachedClient.db("petty").collection("tags");
}

function toTag(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return rest;
}

function getId(event) {
  if (event.queryStringParameters?.id) {
    return event.queryStringParameters.id;
  }

  const parts = (event.path || "").split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  if (last && last !== "tags") return last;
  return null;
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

    const col = await getCollection();

    if (event.httpMethod === "GET") {
      const tag = toTag(await col.findOne({ _id: id }));
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

      const existing = await col.findOne({ _id: id });
      if (existing) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({ error: "already_registered", tag: toTag(existing) }),
        };
      }

      const tag = {
        ownerName: String(ownerName).trim(),
        phone: String(phone).trim(),
        petName: String(petName).trim(),
        createdAt: Date.now(),
      };

      await col.insertOne({ _id: id, ...tag });
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
