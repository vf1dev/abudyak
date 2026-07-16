const dns = require("dns");
const { MongoClient, ServerApiVersion } = require("mongodb");

// Fix SSL alert 80 on Netlify / Node 20+
try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  /* older node */
}

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

let cachedClient = null;

function getUri() {
  let uri = process.env.MONGODB_URI || "";
  uri = uri.trim().replace(/^["']|["']$/g, "");
  if (!uri) {
    throw new Error("MONGODB_URI is not set in Netlify environment variables");
  }
  return uri;
}

async function getClient() {
  if (cachedClient) {
    try {
      await cachedClient.db("admin").command({ ping: 1 });
      return cachedClient;
    } catch {
      try {
        await cachedClient.close();
      } catch {
        /* ignore */
      }
      cachedClient = null;
    }
  }

  const client = new MongoClient(getUri(), {
    // Critical for Netlify SSL alert 80
    autoSelectFamily: false,
    family: 4,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: false,
    },
    serverSelectionTimeoutMS: 12000,
    connectTimeoutMS: 12000,
  });

  await client.connect();
  cachedClient = client;
  return cachedClient;
}

async function getCollection() {
  const client = await getClient();
  return client.db("petty").collection("tags");
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

async function withRetry(fn) {
  try {
    return await fn();
  } catch (err) {
    const msg = String(err && err.message);
    if (
      msg.includes("Topology is closed") ||
      msg.includes("topology was destroyed") ||
      msg.includes("SSL") ||
      msg.includes("tlsv1")
    ) {
      cachedClient = null;
      return await fn();
    }
    throw err;
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
      const tag = await withRetry(async () => {
        const col = await getCollection();
        return toTag(await col.findOne({ _id: id }));
      });

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

      const result = await withRetry(async () => {
        const col = await getCollection();
        const existing = await col.findOne({ _id: id });
        if (existing) {
          return { conflict: true, tag: toTag(existing) };
        }

        const tag = {
          ownerName: String(ownerName).trim(),
          phone: String(phone).trim(),
          petName: String(petName).trim(),
          createdAt: Date.now(),
        };

        await col.insertOne({ _id: id, ...tag });
        return { conflict: false, tag };
      });

      if (result.conflict) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({ error: "already_registered", tag: result.tag }),
        };
      }

      return { statusCode: 201, headers, body: JSON.stringify(result.tag) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: "method_not_allowed" }) };
  } catch (err) {
    console.error(err);
    cachedClient = null;
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "server_error", message: err.message }),
    };
  }
};
