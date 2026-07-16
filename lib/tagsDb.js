const { MongoClient } = require("mongodb");

let cachedClient = null;

function getUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it to .env or Netlify env vars.");
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
    family: 4,
    tls: true,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    maxIdleTimeMS: 10000,
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

async function withRetry(fn) {
  try {
    return await fn();
  } catch (err) {
    const msg = String(err && err.message);
    if (msg.includes("Topology is closed") || msg.includes("topology was destroyed")) {
      cachedClient = null;
      return await fn();
    }
    throw err;
  }
}

async function findTag(id) {
  return withRetry(async () => {
    const col = await getCollection();
    return toTag(await col.findOne({ _id: id }));
  });
}

async function createTag(id, data) {
  return withRetry(async () => {
    const col = await getCollection();
    const existing = await col.findOne({ _id: id });
    if (existing) {
      return { conflict: true, tag: toTag(existing) };
    }

    const tag = {
      ownerName: String(data.ownerName).trim(),
      phone: String(data.phone).trim(),
      petName: String(data.petName).trim(),
      createdAt: Date.now(),
    };

    await col.insertOne({ _id: id, ...tag });
    return { conflict: false, tag };
  });
}

module.exports = { findTag, createTag };
