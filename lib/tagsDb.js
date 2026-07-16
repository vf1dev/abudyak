const { MongoClient } = require("mongodb");

let clientPromise;

function getUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it to .env or Netlify env vars.");
  }
  return uri;
}

function getClient() {
  if (!clientPromise) {
    const client = new MongoClient(getUri(), {
      family: 4,
      tls: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    clientPromise = client.connect();
  }
  return clientPromise;
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

async function findTag(id) {
  const col = await getCollection();
  return toTag(await col.findOne({ _id: id }));
}

async function createTag(id, data) {
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
}

module.exports = { findTag, createTag };
